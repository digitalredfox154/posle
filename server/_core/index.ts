import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { and, eq, or } from "drizzle-orm";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getStorageDirectory, storagePut } from "../storage";
import { getClientFromCookie } from "../routers/client";
import { getDb } from "../db";
import { pets, visits } from "../../drizzle/schema";
import { getMediaUrlVariants } from "../media-access";
import { registerMediaRoutes } from "../media-routes";
import { nanoid } from "nanoid";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function canReadPrivateMedia(req: express.Request, key: string): Promise<boolean> {
  const session = await getClientFromCookie(req);
  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  if (!session) return false;
  if (adminEmail && session.email.toLowerCase().trim() === adminEmail) return true;

  const db = await getDb();
  if (!db) return false;
  const urls = getMediaUrlVariants(key);

  const pet = await db
    .select({ id: pets.id })
    .from(pets)
    .where(and(
      eq(pets.clientId, session.clientId),
      or(
        eq(pets.photoKey, key),
        eq(pets.photoUrl, urls.current),
        eq(pets.photoUrl, urls.legacy),
      ),
    ))
    .limit(1);
  if (pet[0]) return true;

  const visit = await db
    .select({ id: visits.id })
    .from(visits)
    .where(and(
      eq(visits.clientId, session.clientId),
      eq(visits.published, true),
      or(
        eq(visits.beforePhotoKey, key),
        eq(visits.afterPhotoKey, key),
        eq(visits.beforePhotoUrl, urls.current),
        eq(visits.afterPhotoUrl, urls.current),
        eq(visits.beforePhotoUrl, urls.legacy),
        eq(visits.afterPhotoUrl, urls.legacy),
      ),
    ))
    .limit(1);
  return Boolean(visit[0]);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerMediaRoutes(app, {
    storageDirectory: getStorageDirectory(),
    canReadPrivateMedia,
  });

  // File upload endpoint for master panel photos
  app.post("/api/upload", express.raw({ type: "*/*", limit: "6mb" }), async (req: express.Request, res: express.Response) => {
    try {
      const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
      const session = await getClientFromCookie(req);
      if (!adminEmail || !session || session.email.toLowerCase().trim() !== adminEmail) {
        res.status(403).json({ error: "Admin access required" });
        return;
      }
      const contentType = (req.headers["content-type"] || "") as string;
      const boundaryMatch = contentType.match(/boundary=(.+)/);
      if (!boundaryMatch) { res.status(400).json({ error: "No boundary" }); return; }
      const boundary = boundaryMatch[1];
      const body = req.body as Buffer;
      const parts = body.toString("binary").split("--" + boundary);
      let fileBuffer: Buffer | null = null;
      let mimeType = "image/jpeg";
      for (const part of parts) {
        if (part.includes("Content-Disposition: form-data") && part.includes("filename")) {
          const mimeMatch = part.match(/Content-Type: ([^\r\n]+)/);
          if (mimeMatch) mimeType = mimeMatch[1].trim();
          const dataStart = part.indexOf("\r\n\r\n") + 4;
          const dataEnd = part.lastIndexOf("\r\n");
          if (dataStart > 0 && dataEnd > dataStart) {
            fileBuffer = Buffer.from(part.slice(dataStart, dataEnd), "binary");
          }
        }
      }
      if (!fileBuffer) { res.status(400).json({ error: "No file" }); return; }
      const ext = mimeType.includes("png") ? "png" : "jpg";
      const key = `visits/${nanoid()}.${ext}`;
      const { url } = await storagePut(key, fileBuffer, mimeType);
      res.json({ key, url });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
