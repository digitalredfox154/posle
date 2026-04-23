import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, desc, gte, lt } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { visits, pets } from "../../drizzle/schema";
import { getClientFromCookie } from "./client";

export const visitsRouter = router({
  // Client: get all visits for a pet
  listForPet: publicProcedure
    .input(z.object({ petId: z.number() }))
    .query(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return db
        .select()
        .from(visits)
        .where(
          and(
            eq(visits.petId, input.petId),
            eq(visits.clientId, session.clientId),
            eq(visits.published, true)
          )
        )
        .orderBy(desc(visits.visitDate));
    }),

  // Client: get single visit
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db
        .select()
        .from(visits)
        .where(and(eq(visits.id, input.id), eq(visits.clientId, session.clientId)))
        .limit(1);
      if (!result[0]) throw new TRPCError({ code: "NOT_FOUND" });
      return result[0];
    }),

  // Master: get single visit by id
  masterGet: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db.select().from(visits).where(eq(visits.id, input.id)).limit(1);
      if (!result[0]) throw new TRPCError({ code: "NOT_FOUND" });
      return result[0];
    }),

  // Master: create visit card
  masterCreate: protectedProcedure
    .input(
      z.object({
        petId: z.number(),
        clientId: z.number(),
        visitDate: z.string(),
        serviceType: z.string().optional(),
        beforePhotoUrl: z.string().optional(),
        beforePhotoKey: z.string().optional(),
        afterPhotoUrl: z.string().optional(),
        afterPhotoKey: z.string().optional(),
        masterNotes: z.string().optional(),
        cosmeticsUsed: z.string().optional(),
        behaviorNotes: z.string().optional(),
        homeCareTips: z.string().optional(),
        nextVisitSuggestion: z.string().optional(),
        published: z.boolean().default(false),
        yclientsBookingId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db.insert(visits).values({
        ...input,
        visitDate: new Date(input.visitDate),
      });
      return { id: (result as any).insertId };
    }),

  // Master: update visit card (within 24h)
  masterUpdate: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        masterNotes: z.string().optional(),
        cosmeticsUsed: z.string().optional(),
        behaviorNotes: z.string().optional(),
        homeCareTips: z.string().optional(),
        nextVisitSuggestion: z.string().optional(),
        beforePhotoUrl: z.string().optional(),
        beforePhotoKey: z.string().optional(),
        afterPhotoUrl: z.string().optional(),
        afterPhotoKey: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const existing = await db.select().from(visits).where(eq(visits.id, input.id)).limit(1);
      if (!existing[0]) throw new TRPCError({ code: "NOT_FOUND" });

      // 24h edit window
      const hoursSinceCreation = (Date.now() - existing[0].createdAt.getTime()) / (1000 * 60 * 60);
      if (hoursSinceCreation > 24) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Редактирование доступно только в течение 24 часов после создания" });
      }

      const { id, ...data } = input;
      await db.update(visits).set(data).where(eq(visits.id, id));
      return { success: true };
    }),

  // Master: list all visits (daily view)
  masterList: protectedProcedure
    .input(z.object({ date: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      if (input.date) {
        const dayStart = new Date(input.date + "T00:00:00");
        const dayEnd = new Date(input.date + "T23:59:59");
        return db
          .select()
          .from(visits)
          .where(and(gte(visits.visitDate, dayStart), lt(visits.visitDate, dayEnd)))
          .orderBy(visits.visitDate);
      }
      return db.select().from(visits).orderBy(desc(visits.visitDate)).limit(50);
    }),

  // Client: get next upcoming appointment
  nextAppointment: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) return null;
    const db = await getDb();
    if (!db) return null;
    const now = new Date();
    const result = await db
      .select()
      .from(visits)
      .where(and(eq(visits.clientId, session.clientId), gte(visits.visitDate, now)))
      .orderBy(visits.visitDate)
      .limit(1);
    return result[0] || null;
  }),
});
