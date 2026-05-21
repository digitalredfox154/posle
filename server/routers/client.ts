import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, desc } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { clients, emailOtps, smsCodes, clientSessions } from "../../drizzle/schema";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookie } from "cookie";
import { ENV } from "../_core/env";
import nodemailer from "nodemailer";

const JWT_SECRET = new TextEncoder().encode(ENV.cookieSecret || "posle-secret-key-change-in-production");
const CLIENT_COOKIE = "posle_client_session";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();

// Helper: get client from request cookie
export async function getClientFromCookie(req: any) {
  const raw = req.headers?.cookie || "";
  const cookies = parseCookie(raw);
  const token = cookies[CLIENT_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { clientId: number; email: string };
  } catch {
    return null;
  }
}

// Helper: send OTP email
async function sendOtpEmail(email: string, code: string) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || "noreply@posle.ru";
  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: `"ПОСЛЕ" <${smtpFrom}>`,
      to: email,
      subject: "Код для входа в ПОСЛЕ",
      html: `<div style="font-family:'Georgia',serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#0E0E0E;color:#F5F0E8;"><p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#A8C5B5;margin-bottom:24px;">Личный кабинет</p><h1 style="font-size:32px;font-weight:300;margin-bottom:8px;color:#F5F0E8;">ПОСЛЕ</h1><p style="font-size:14px;color:#F5F0E8;opacity:0.6;margin-bottom:32px;">Ваш код для входа:</p><div style="background:#1a1a1a;border:1px solid #A8C5B5;padding:24px;text-align:center;margin-bottom:24px;"><span style="font-size:40px;letter-spacing:0.4em;color:#A8C5B5;font-weight:300;">${code}</span></div><p style="font-size:12px;color:#F5F0E8;opacity:0.4;">Код действителен 10 минут.</p></div>`,
    });
    console.log(`[Email] OTP sent to ${email}`);
  } else {
    console.log(`[Email DEV] OTP for ${email}: ${code}`);
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
    if (!result[0]) return null;
    const client = result[0];
    const isAdmin = ADMIN_EMAIL && client.email?.toLowerCase().trim() === ADMIN_EMAIL;
    return { ...client, isAdmin: !!isAdmin };
  }),

  // Send OTP code to email
  sendEmailCode: publicProcedure
    .input(z.object({ email: z.string().email("Введите корректный email") }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const email = input.email.toLowerCase().trim();

      // Rate limiting
      const recentCodes = await db
        .select()
        .from(emailOtps)
        .where(eq(emailOtps.email, email))
        .orderBy(desc(emailOtps.createdAt))
        .limit(1);

      if (recentCodes[0]) {
        const lastCode = recentCodes[0];
        if (lastCode.blocked) {
          throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Слишком много попыток. Подождите 15 минут" });
        }
        const timeSinceLast = Date.now() - new Date(lastCode.createdAt).getTime();
        if (timeSinceLast < 60_000) {
          throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Подождите минуту перед повторной отправкой" });
        }
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60_000);
      await db.insert(emailOtps).values({ email, code, expiresAt });
      await sendOtpEmail(email, code);

      const isDevMode = !process.env.SMTP_HOST;
      return { success: true, message: "Код отправлен на почту", testCode: isDevMode ? code : undefined };
    }),

  // Verify email OTP and create session
  verifyEmailCode: publicProcedure
    .input(z.object({ email: z.string().email(), code: z.string().length(6) }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const email = input.email.toLowerCase().trim();

      const codes = await db
        .select()
        .from(emailOtps)
        .where(eq(emailOtps.email, email))
        .orderBy(desc(emailOtps.createdAt))
        .limit(1);

      const otp = codes[0];
      if (!otp) throw new TRPCError({ code: "NOT_FOUND", message: "Код не найден. Запросите новый" });
      if (otp.blocked) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Слишком много попыток. Подождите 15 минут" });
      if (new Date() > otp.expiresAt) throw new TRPCError({ code: "BAD_REQUEST", message: "Код истёк. Запросите новый" });

      if (otp.code !== input.code) {
        const newAttempts = otp.attempts + 1;
        const shouldBlock = newAttempts >= 5;
        await db.update(emailOtps).set({ attempts: newAttempts, blocked: shouldBlock }).where(eq(emailOtps.id, otp.id));
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: shouldBlock ? "Слишком много попыток. Подождите 15 минут" : `Неверный код. Осталось попыток: ${5 - newAttempts}`,
        });
      }

      // Upsert client by email
      const existing = await db.select().from(clients).where(eq(clients.email, email)).limit(1);
      let clientId: number;
      if (existing[0]) {
        clientId = existing[0].id;
        await db.update(clients).set({ lastSignedIn: new Date() }).where(eq(clients.id, clientId));
      } else {
        await db.insert(clients).values({ email, lastSignedIn: new Date() });
        const newClient = await db.select().from(clients).where(eq(clients.email, email)).limit(1);
        if (!newClient[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Ошибка создания аккаунта" });
        clientId = newClient[0].id;
      }

      const token = await new SignJWT({ clientId, email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(JWT_SECRET);

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

  // Admin: list all clients with their pets
  adminListClients: publicProcedure.query(async ({ ctx }) => {
    const session = await getClientFromCookie(ctx.req);
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
    if (!ADMIN_EMAIL || session.email !== ADMIN_EMAIL) throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(clients).orderBy(desc(clients.createdAt));
  }),
});

export { CLIENT_COOKIE };
