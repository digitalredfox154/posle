import type { NextFunction, Request, Response, Express } from "express";
import express from "express";
import { isPrivateMediaKey } from "./media-access";
import { getStorageFilePath } from "./storage";

export type PrivateMediaAccessChecker = (req: Request, key: string) => Promise<boolean>;

export function registerMediaRoutes(
  app: Express,
  options: { storageDirectory: string; canReadPrivateMedia: PrivateMediaAccessChecker },
) {
  app.get("/uploads/*", async (req: Request, res: Response, next: NextFunction) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key || !isPrivateMediaKey(key)) {
      next();
      return;
    }

    try {
      if (!await options.canReadPrivateMedia(req, key)) {
        res.status(403).json({ error: "Доступ к файлу запрещён" });
        return;
      }
      res.setHeader("Cache-Control", "private, no-store");
      res.sendFile(getStorageFilePath(key, options.storageDirectory), error => {
        if (!error) return;
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          res.status(404).json({ error: "Файл не найден" });
          return;
        }
        next(error);
      });
    } catch (error) {
      next(error);
    }
  });

  app.use("/uploads", express.static(options.storageDirectory, { maxAge: "7d", immutable: true }));
  app.use("/manus-storage", (req, res) => {
    res.redirect(307, `/uploads${req.originalUrl.slice("/manus-storage".length)}`);
  });
}
