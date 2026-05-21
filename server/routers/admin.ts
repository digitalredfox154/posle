import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, desc, and } from "drizzle-orm";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { clients, pets, visits } from "../../drizzle/schema";
import { getClientFromCookie } from "./client";
import { storagePut } from "../storage";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();

// Helper: verify admin session
async function requireAdmin(req: any) {
  const session = await getClientFromCookie(req);
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
  if (!ADMIN_EMAIL || session.email !== ADMIN_EMAIL) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Доступ только для администратора" });
  }
  return session;
}

export const adminRouter = router({
  // List all clients
  listClients: publicProcedure.query(async ({ ctx }) => {
    await requireAdmin(ctx.req);
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const allClients = await db.select().from(clients).orderBy(desc(clients.createdAt));
    // Get pets count per client
    const allPets = await db.select().from(pets);
    const allVisits = await db.select().from(visits).orderBy(desc(visits.visitDate));
    return allClients.map((c) => ({
      ...c,
      petsCount: allPets.filter((p) => p.clientId === c.id).length,
      visitsCount: allVisits.filter((v) => v.clientId === c.id).length,
      lastVisit: allVisits.find((v) => v.clientId === c.id)?.visitDate || null,
    }));
  }),

  // Get single client with pets and visits
  getClient: publicProcedure
    .input(z.object({ clientId: z.number() }))
    .query(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const [client] = await db.select().from(clients).where(eq(clients.id, input.clientId)).limit(1);
      if (!client) throw new TRPCError({ code: "NOT_FOUND" });
      const clientPets = await db.select().from(pets).where(eq(pets.clientId, input.clientId));
      const clientVisits = await db
        .select()
        .from(visits)
        .where(eq(visits.clientId, input.clientId))
        .orderBy(desc(visits.visitDate));
      return { client, pets: clientPets, visits: clientVisits };
    }),

  // Update client name
  updateClient: publicProcedure
    .input(z.object({ clientId: z.number(), name: z.string().min(1).max(100) }))
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(clients).set({ name: input.name }).where(eq(clients.id, input.clientId));
      return { success: true };
    }),

  // Create or update pet for client
  upsertPet: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        clientId: z.number(),
        name: z.string().min(1).max(100),
        species: z.enum(["dog", "cat", "other"]).default("dog"),
        breed: z.string().max(100).optional(),
        birthYear: z.number().int().min(2000).max(2030).optional(),
        notes: z.string().max(1000).optional(),
        allergies: z.string().max(500).optional(),
        photoUrl: z.string().optional(),
        photoKey: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      if (id) {
        await db.update(pets).set(data).where(and(eq(pets.id, id), eq(pets.clientId, input.clientId)));
        return { id };
      } else {
        const result = await db.insert(pets).values(data);
        return { id: (result as any).insertId };
      }
    }),

  // Create visit card for client
  createVisit: publicProcedure
    .input(
      z.object({
        clientId: z.number(),
        petId: z.number(),
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
        published: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const result = await db.insert(visits).values({
        ...input,
        visitDate: new Date(input.visitDate),
      });
      return { id: (result as any).insertId };
    }),

  // Update visit card
  updateVisit: publicProcedure
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
        serviceType: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { id, ...data } = input;
      await db.update(visits).set(data).where(eq(visits.id, id));
      return { success: true };
    }),

  // Update pet photo only (avoids re-validating name)
  updatePetPhoto: publicProcedure
    .input(
      z.object({
        petId: z.number(),
        clientId: z.number(),
        photoUrl: z.string(),
        photoKey: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(pets)
        .set({ photoUrl: input.photoUrl, photoKey: input.photoKey })
        .where(and(eq(pets.id, input.petId), eq(pets.clientId, input.clientId)));
      return { success: true };
    }),

  // Upload photo (base64) and store in S3
  uploadPhoto: publicProcedure
    .input(
      z.object({
        base64: z.string(),
        mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
        purpose: z.enum(["pet_photo", "before_photo", "after_photo"]),
        clientId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireAdmin(ctx.req);
      const ext = input.mimeType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
      const key = `admin/${input.purpose}/${input.clientId}/${Date.now()}.${ext}`;
      const buffer = Buffer.from(input.base64.replace(/^data:[^;]+;base64,/, ""), "base64");
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { key, url };
    }),
});
