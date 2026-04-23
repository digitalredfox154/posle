import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, desc } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { clients, smsCodes, clientSessions } from "../../drizzle/schema";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookie } from "cookie";
import { ENV } from "../_core/env";

const JWT_SECRET = new TextEncoder().encode(ENV.cookieSecret || "posle-secret-key-change-in-production");
const CLIENT_COOKIE = "posle_client_session";

// Helper: get client from request cookie
async function getClientFromCookie(req: any) {
  const raw = req.headers?.cookie || "";
  const cookies = parseCookie(raw);
  const token = cookies[CLIENT_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { clientId: number; phone: string };
  } catch {
    return null;
  }
}

export const clientRouter = router({
  // Get current client session
  me: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) return null;
    const db = await getDb();
    if (!db) return null;
    const result = await db.select().from(clients).where(eq(clients.id, session.clientId)).limit(1);
    return result[0] || null;
  }),

  // Send SMS code
  sendCode: publicProcedure
    .input(z.object({ phone: z.string().min(10).max(20) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const phone = input.phone.replace(/\D/g, "");

      // Rate limit: check last code sent in past 60 seconds
      const recent = await db
        .select()
        .from(smsCodes)
        .where(eq(smsCodes.phone, phone))
        .orderBy(desc(smsCodes.createdAt))
        .limit(1);

      if (recent[0]) {
        const elapsed = Date.now() - recent[0].createdAt.getTime();
        if (elapsed < 60_000) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Подождите 60 секунд перед повторной отправкой",
          });
        }
        // Check if blocked
        if (recent[0].blocked) {
          const blockElapsed = Date.now() - recent[0].createdAt.getTime();
          if (blockElapsed < 15 * 60_000) {
            throw new TRPCError({
              code: "TOO_MANY_REQUESTS",
              message: "Слишком много попыток. Подождите 15 минут",
            });
          }
        }
      }

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60_000);

      await db.insert(smsCodes).values({ phone, code, expiresAt });

      // Send via sms.ru
      const smsApiKey = process.env.SMS_RU_API_KEY;
      if (smsApiKey) {
        try {
          const smsRes = await fetch(
            `https://sms.ru/sms/send?api_id=${smsApiKey}&to=${phone}&msg=${encodeURIComponent(`Ваш код для входа в ПОСЛЕ: ${code}. Действителен 5 минут.`)}&from=POSLE&json=1`
          );
          const smsData = await smsRes.json() as { status: string; status_code: number; sms?: Record<string, { status: string; status_code: number }> };
          if (smsData.status !== "OK") {
            console.error(`[SMS.ru] Error: ${JSON.stringify(smsData)}`);
            // Still return success — code is saved, user can retry
          } else {
            console.log(`[SMS.ru] Sent to ${phone}`);
          }
        } catch (err) {
          console.error("[SMS.ru] Request failed:", err);
        }
      } else {
        // Dev fallback
        console.log(`[SMS] Code for ${phone}: ${code}`);
      }

      // Return code in dev/test mode (when SMS_RU_TEST=true or no balance)
      const isTestMode = process.env.SMS_RU_TEST === "true";
      return { success: true, message: "Код отправлен", testCode: isTestMode ? code : undefined };
    }),

  // Verify SMS code and create session
  verifyCode: publicProcedure
    .input(z.object({ phone: z.string(), code: z.string().length(6) }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const phone = input.phone.replace(/\D/g, "");

      // Get latest code for phone
      const codes = await db
        .select()
        .from(smsCodes)
        .where(eq(smsCodes.phone, phone))
        .orderBy(desc(smsCodes.createdAt))
        .limit(1);

      const smsCode = codes[0];
      if (!smsCode) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Код не найден. Запросите новый" });
      }

      if (smsCode.blocked) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Слишком много попыток. Подождите 15 минут" });
      }

      if (new Date() > smsCode.expiresAt) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Код истёк. Запросите новый" });
      }

      if (smsCode.code !== input.code) {
        const newAttempts = smsCode.attempts + 1;
        const shouldBlock = newAttempts >= 5;
        await db
          .update(smsCodes)
          .set({ attempts: newAttempts, blocked: shouldBlock })
          .where(eq(smsCodes.id, smsCode.id));

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: shouldBlock
            ? "Слишком много попыток. Подождите 15 минут"
            : `Неверный код. Осталось попыток: ${5 - newAttempts}`,
        });
      }

      // Upsert client
      const existing = await db.select().from(clients).where(eq(clients.phone, phone)).limit(1);
      let clientId: number;

      if (existing[0]) {
        clientId = existing[0].id;
        await db.update(clients).set({ lastSignedIn: new Date() }).where(eq(clients.id, clientId));
      } else {
        await db.insert(clients).values({ phone, lastSignedIn: new Date() });
        // Re-fetch to get the auto-incremented id reliably
        const newClient = await db.select().from(clients).where(eq(clients.phone, phone)).limit(1);
        if (!newClient[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Ошибка создания аккаунта" });
        clientId = newClient[0].id;
      }

      // Issue JWT
      const token = await new SignJWT({ clientId, phone })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

      // Set cookie — always secure+none for cross-origin (Manus gateway is always HTTPS)
      ctx.res.cookie(CLIENT_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return { success: true };
    }),

  // Logout
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie(CLIENT_COOKIE, { path: "/" });
    return { success: true };
  }),

  // Update profile
  updateProfile: publicProcedure
    .input(z.object({ name: z.string().min(1).max(100) }))
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(clients).set({ name: input.name }).where(eq(clients.id, session.clientId));
      return { success: true };
    }),
});

export { getClientFromCookie, CLIENT_COOKIE };
