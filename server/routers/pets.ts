import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { pets } from "../../drizzle/schema";
import { getClientFromCookie } from "./client";
import { storagePut } from "../storage";

export const petsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(pets).where(eq(pets.clientId, session.clientId));
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db
        .select()
        .from(pets)
        .where(and(eq(pets.id, input.id), eq(pets.clientId, session.clientId)))
        .limit(1);
      if (!result[0]) throw new TRPCError({ code: "NOT_FOUND" });
      return result[0];
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        species: z.enum(["dog", "cat", "other"]).default("dog"),
        breed: z.string().max(100).optional(),
        birthYear: z.number().int().min(2000).max(2030).optional(),
        notes: z.string().max(1000).optional(),
        allergies: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db.insert(pets).values({ ...input, clientId: session.clientId });
      return { id: (result as any).insertId };
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(100).optional(),
        species: z.enum(["dog", "cat", "other"]).optional(),
        breed: z.string().max(100).optional(),
        birthYear: z.number().int().optional(),
        notes: z.string().max(1000).optional(),
        allergies: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      await db
        .update(pets)
        .set(data)
        .where(and(eq(pets.id, id), eq(pets.clientId, session.clientId)));
      return { success: true };
    }),

  // Master: list all pets
  listAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(pets);
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .delete(pets)
        .where(and(eq(pets.id, input.id), eq(pets.clientId, session.clientId)));
      return { success: true };
    }),
});
