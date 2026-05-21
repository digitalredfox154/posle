import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { getClientFromCookie } from "./client";

const YCLIENTS_API = "https://api.yclients.com/api/v1";

function getYclientsHeaders() {
  const partnerToken = process.env.YCLIENTS_API_KEY || "";
  const userToken = process.env.YCLIENTS_USER_TOKEN || "";
  const companyId = process.env.YCLIENTS_COMPANY_ID || "";

  if (!partnerToken || !companyId) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "YCLIENTS не настроен",
    });
  }

  return {
    headers: {
      Authorization: `Bearer ${partnerToken}, User ${userToken}`,
      Accept: "application/vnd.yclients.v2+json",
      "Content-Type": "application/json",
    },
    companyId,
  };
}

async function yclientsRequest(path: string, options?: RequestInit) {
  const { headers } = getYclientsHeaders();
  const res = await fetch(`${YCLIENTS_API}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: body?.meta?.message || body?.message || `YCLIENTS error ${res.status}`,
    });
  }
  return body;
}

export const bookingRouter = router({
  // Список услуг из YCLIENTS
  services: publicProcedure.query(async () => {
    const { companyId } = getYclientsHeaders();
    const data = await yclientsRequest(`/book_services/${companyId}`);
    const services = data.data?.services || [];
    return services as Array<{
      id: number;
      title: string;
      price_min: number;
      price_max: number;
      duration: number;
      category_id: number;
    }>;
  }),

  // Категории услуг
  serviceCategories: publicProcedure.query(async () => {
    const { companyId } = getYclientsHeaders();
    const data = await yclientsRequest(`/book_services/${companyId}`);
    const categories = data.data?.category || [];
    return categories as Array<{ id: number; title: string }>;
  }),

  // Список сотрудников
  staff: publicProcedure.query(async () => {
    const { companyId } = getYclientsHeaders();
    const data = await yclientsRequest(`/book_staff/${companyId}`);
    return (data.data || []) as Array<{
      id: number;
      name: string;
      avatar: string;
      specialization: string;
    }>;
  }),

  // Доступные даты для услуги
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
      const { companyId } = getYclientsHeaders();
      const params = new URLSearchParams({
        service_ids: String(input.serviceId),
        date_from: input.dateFrom,
        date_to: input.dateTo,
        ...(input.staffId ? { staff_id: String(input.staffId) } : {}),
      });
      const data = await yclientsRequest(
        `/book_dates/${companyId}?${params}`
      );
      return (data.data?.booking_dates || []) as string[];
    }),

  // Доступные слоты времени
  availableSlots: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        staffId: z.number().optional(),
        date: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { companyId } = getYclientsHeaders();
      const params = new URLSearchParams({
        service_ids: String(input.serviceId),
        date: input.date,
        ...(input.staffId ? { staff_id: String(input.staffId) } : {}),
      });
      const data = await yclientsRequest(
        `/book_times/${companyId}/${input.staffId || 0}/${input.date}?${params}`
      );
      return (data.data || []) as Array<{ time: string; seance_length: number; datetime: number }>;
    }),

  // Создание записи
  createBooking: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        staffId: z.number(),
        date: z.string(),
        time: z.string(),
        clientName: z.string().min(2),
        clientPhone: z.string().min(10),
        comment: z.string().optional(),
        petName: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { companyId } = getYclientsHeaders();

      let clientPhone = input.clientPhone;

      const comment = [
        input.comment || "",
        input.petName ? `Питомец: ${input.petName}` : "",
      ]
        .filter(Boolean)
        .join(". ");

      const body = {
        phone: clientPhone.replace(/\D/g, "").replace(/^8/, "7"),
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
        comment,
      };

      const data = await yclientsRequest(`/book_record/${companyId}`, {
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
