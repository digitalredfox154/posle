import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import { getClientFromCookie } from "./client";

export const uploadRouter = router({
  // Get presigned upload URL for client photo
  getUploadUrl: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        mimeType: z.string(),
        purpose: z.enum(["pet_photo", "before_photo", "after_photo"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getClientFromCookie(ctx.req);
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      // Validate MIME type
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];
      if (!allowed.includes(input.mimeType)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Поддерживаются только изображения (JPEG, PNG, WebP)" });
      }

      const ext = input.mimeType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
      const key = `${input.purpose}/${session.clientId}/${Date.now()}.${ext}`;

      return { key, uploadPath: `/api/upload/${key}` };
    }),

  // Master upload (for visit cards)
  masterGetUploadUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        mimeType: z.string(),
        purpose: z.enum(["before_photo", "after_photo"]),
        visitId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });

      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(input.mimeType)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Поддерживаются только изображения" });
      }

      const ext = input.mimeType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
      const key = `master/${input.purpose}/${input.visitId || "new"}/${Date.now()}.${ext}`;

      return { key, uploadPath: `/api/upload/${key}` };
    }),
});
