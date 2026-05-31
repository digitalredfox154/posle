import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, desc } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { subscriptions, subscriptionPlans, payments } from "../../drizzle/schema";
import { getClientFromCookie } from "./client";

export const subscriptionsRouter = router({
  // Get all plans
  plans: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true));
  }),

  // Get client's active subscription
  mySubscription: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) return null;
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.clientId, session.clientId))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    return result[0] || null;
  }),

  // Get payment history
  paymentHistory: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db
      .select()
      .from(payments)
      .where(eq(payments.clientId, session.clientId))
      .orderBy(desc(payments.createdAt))
      .limit(20);
  }),

  // Subscribe to a plan
  subscribe: publicProcedure
    .input(z.object({ planId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const plan = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.id, input.planId))
        .limit(1);
      if (!plan[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Тариф не найден" });

      const nextBillingAt = new Date();
      nextBillingAt.setMonth(nextBillingAt.getMonth() + (plan[0].intervalMonths || 1));

      const result = await db.insert(subscriptions).values({
        clientId: session.clientId,
        planId: input.planId,
        status: "active",
        nextBillingAt,
      });

      return { id: (result as any).insertId, success: true };
    }),

  // Cancel subscription
  cancel: publicProcedure
    .input(z.object({ subscriptionId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(subscriptions)
        .set({ status: "cancelled", cancelledAt: new Date() })
        .where(
          and(
            eq(subscriptions.id, input.subscriptionId),
            eq(subscriptions.clientId, session.clientId)
          )
        );
      return { success: true };
    }),

  // Admin: seed default plans
  seedPlans: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const defaultPlans = [
      {
        name: "Резидент",
        description: "Приоритетная запись, персональный подход, скидка 10% на все услуги",
        priceKopecks: 199000,
        intervalMonths: 1,
        features: JSON.stringify([
          "Приоритетная запись",
          "Скидка 10% на услуги",
          "Напоминания о визите",
          "Дневник питомца",
        ]),
      },
      {
        name: "Постоянный резидент",
        description: "Максимальный приоритет, скидка 20%, квартальная оплата",
        priceKopecks: 490000,
        intervalMonths: 3,
        features: JSON.stringify([
          "Максимальный приоритет записи",
          "Скидка 20% на услуги",
          "Напоминания о визите",
          "Дневник питомца",
          "Персональные рекомендации",
        ]),
      },
    ];

    for (const plan of defaultPlans) {
      await db.insert(subscriptionPlans).values(plan);
    }

    return { success: true };
  }),
});
