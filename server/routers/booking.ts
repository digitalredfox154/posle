import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { getClientFromCookie } from "./client";

const YCLIENTS_API = "https://api.yclients.com/api/v1";
const YCLIENTS_TOKEN = process.env.YCLIENTS_TOKEN || "";
const YCLIENTS_COMPANY_ID = process.env.YCLIENTS_COMPANY_ID || "";

async function yclientsRequest(path: string, options?: RequestInit) {
  if (!YCLIENTS_TOKEN || !YCLIENTS_COMPANY_ID) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "YCLIENTS не настроен. Добавьте YCLIENTS_TOKEN и YCLIENTS_COMPANY_ID",
    });
  }
  const res = await fetch(`${YCLIENTS_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${YCLIENTS_TOKEN}, User ${YCLIENTS_TOKEN}`,
      Accept: "application/vnd.yclients.v2+json",
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `YCLIENTS error ${res.status}: ${body}`,
    });
  }
  return res.json();
}

export const bookingRouter = router({
  // Get available services
  services: publicProcedure.query(async () => {
    const data = await yclientsRequest(`/company/${YCLIENTS_COMPANY_ID}/services`);
    return (data.data || []) as Array<{ id: number; title: string; price_min: number; duration: number }>;
  }),

  // Get available staff
  staff: publicProcedure.query(async () => {
    const data = await yclientsRequest(`/company/${YCLIENTS_COMPANY_ID}/staff`);
    return (data.data || []) as Array<{ id: number; name: string; avatar: string }>;
  }),

  // Get available dates for a service
  availableDates: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        staffId: z.number().optional(),
        dateFrom: z.string(),
        dateTo: z.string(),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        service_ids: String(input.serviceId),
        date_from: input.dateFrom,
        date_to: input.dateTo,
        ...(input.staffId ? { staff_id: String(input.staffId) } : {}),
      });
      const data = await yclientsRequest(
        `/bookform/${YCLIENTS_COMPANY_ID}/dates?${params}`
      );
      return (data.data || []) as string[];
    }),

  // Get available time slots for a date
  availableSlots: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        staffId: z.number().optional(),
        date: z.string(),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        service_ids: String(input.serviceId),
        date: input.date,
        ...(input.staffId ? { staff_id: String(input.staffId) } : {}),
      });
      const data = await yclientsRequest(
        `/bookform/${YCLIENTS_COMPANY_ID}/times?${params}`
      );
      return (data.data || []) as Array<{ time: string; seance_length: number }>;
    }),

  // Create booking
  createBooking: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        staffId: z.number(),
        date: z.string(),
        time: z.string(),
        clientName: z.string(),
        clientPhone: z.string(),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);

      const body = {
        phone: input.clientPhone,
        fullname: input.clientName,
        email: "",
        appointments: [
          {
            id: 1,
            services: [input.serviceId],
            staff_id: input.staffId,
            datetime: `${input.date}T${input.time}:00+07:00`,
          },
        ],
        comment: input.comment || "",
      };

      const data = await yclientsRequest(`/book_record/${YCLIENTS_COMPANY_ID}`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      return {
        success: true,
        bookingId: data.data?.[0]?.id,
        message: "Запись создана. Ожидайте подтверждения по SMS",
      };
    }),
});
