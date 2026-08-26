import express from "express";
import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { Server } from "node:http";
import { registerMediaRoutes } from "./media-routes";

let server: Server | undefined;
let storageDirectory: string | undefined;

async function startMediaApp() {
  storageDirectory = await mkdtemp(path.join(tmpdir(), "posle-media-routes-"));
  await mkdir(path.join(storageDirectory, "visits"), { recursive: true });
  await mkdir(path.join(storageDirectory, "admin", "pet"), { recursive: true });
  await writeFile(path.join(storageDirectory, "public.jpg"), "public");
  await writeFile(path.join(storageDirectory, "visits", "owner.jpg"), "owner");
  await writeFile(path.join(storageDirectory, "admin", "pet", "admin.jpg"), "admin");

  const app = express();
  registerMediaRoutes(app, {
    storageDirectory,
    canReadPrivateMedia: async (req, key) => {
      const role = req.header("x-test-role");
      return role === "admin" || (role === "owner" && key === "visits/owner.jpg");
    },
  });

  await new Promise<void>(resolve => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server address is unavailable");
  return `http://127.0.0.1:${address.port}`;
}

afterEach(async () => {
  await new Promise<void>(resolve => server?.close(() => resolve()) ?? resolve());
  server = undefined;
  if (storageDirectory) await rm(storageDirectory, { recursive: true, force: true });
  storageDirectory = undefined;
});

describe("media routes", () => {
  it("allows owners and admins while rejecting unauthenticated private reads", async () => {
    const baseUrl = await startMediaApp();

    expect((await fetch(`${baseUrl}/uploads/visits/owner.jpg`)).status).toBe(403);
    expect((await fetch(`${baseUrl}/uploads/visits/owner.jpg`, { headers: { "x-test-role": "owner" } })).status).toBe(200);
    expect((await fetch(`${baseUrl}/uploads/admin/pet/admin.jpg`, { headers: { "x-test-role": "admin" } })).status).toBe(200);
    expect((await fetch(`${baseUrl}/uploads/public.jpg`)).status).toBe(200);
  });

  it("redirects legacy private URLs to the protected upload route", async () => {
    const baseUrl = await startMediaApp();
    const response = await fetch(`${baseUrl}/manus-storage/visits/owner.jpg`, { redirect: "manual" });

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("/uploads/visits/owner.jpg");
  });
});
