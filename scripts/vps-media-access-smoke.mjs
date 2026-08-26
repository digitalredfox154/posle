import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { SignJWT } from "jose";
import mysql from "mysql2/promise";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

const databaseUrl = required("DATABASE_URL");
const jwtSecret = new TextEncoder().encode(required("JWT_SECRET"));
const adminEmail = required("ADMIN_EMAIL").toLowerCase().trim();
const storageDirectory = required("STORAGE_DIR");
const baseUrl = process.env.POSLE_SMOKE_BASE_URL || "http://127.0.0.1:3000";
const suffix = randomUUID();
const ownerEmail = `access-smoke-${suffix}@invalid.test`;
const strangerEmail = `access-stranger-${suffix}@invalid.test`;
const key = `visits/access-smoke-${suffix}.txt`;
const filePath = path.join(storageDirectory, key);

async function cookieFor(clientId, email) {
  const token = await new SignJWT({ clientId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(jwtSecret);
  return `posle_client_session=${token}`;
}

async function status(url, cookie, redirect = "follow") {
  const response = await fetch(url, {
    headers: cookie ? { cookie } : undefined,
    redirect,
  });
  return { status: response.status, location: response.headers.get("location") };
}

const db = await mysql.createConnection(databaseUrl);
let ownerId;
let strangerId;
let petId;

try {
  await db.execute("INSERT INTO clients (email, lastSignedIn) VALUES (?, NOW())", [ownerEmail]);
  await db.execute("INSERT INTO clients (email, lastSignedIn) VALUES (?, NOW())", [strangerEmail]);
  [[{ id: ownerId }]] = await db.query("SELECT id FROM clients WHERE email = ?", [ownerEmail]);
  [[{ id: strangerId }]] = await db.query("SELECT id FROM clients WHERE email = ?", [strangerEmail]);
  await db.execute("INSERT INTO pets (clientId, name) VALUES (?, ?)", [ownerId, "Access smoke"]);
  [[{ id: petId }]] = await db.query("SELECT id FROM pets WHERE clientId = ? AND name = ?", [ownerId, "Access smoke"]);
  await db.execute(
    "INSERT INTO visits (petId, clientId, visitDate, published, beforePhotoKey) VALUES (?, ?, NOW(), 1, ?)",
    [petId, ownerId, key],
  );
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, "access-control smoke");

  const ownerCookie = await cookieFor(ownerId, ownerEmail);
  const strangerCookie = await cookieFor(strangerId, strangerEmail);
  const adminCookie = await cookieFor(ownerId, adminEmail);

  const anonymous = await status(`${baseUrl}/uploads/${key}`);
  const stranger = await status(`${baseUrl}/uploads/${key}`, strangerCookie);
  const owner = await status(`${baseUrl}/uploads/${key}`, ownerCookie);
  const admin = await status(`${baseUrl}/uploads/${key}`, adminCookie);
  const legacy = await status(`${baseUrl}/manus-storage/${key}`, undefined, "manual");

  if (anonymous.status !== 403 || stranger.status !== 403 || owner.status !== 200 || admin.status !== 200) {
    throw new Error("Private media access policy check failed");
  }
  if (legacy.status !== 307 || legacy.location !== `/uploads/${key}`) {
    throw new Error("Legacy private-media redirect check failed");
  }

  console.log("VPS_MEDIA_ACCESS_SMOKE_OK anonymous=403 stranger=403 owner=200 admin=200 legacy=307");
} finally {
  await rm(filePath, { force: true });
  await db.execute("DELETE FROM visits WHERE beforePhotoKey = ?", [key]);
  if (petId) await db.execute("DELETE FROM pets WHERE id = ?", [petId]);
  await db.execute("DELETE FROM clients WHERE email IN (?, ?)", [ownerEmail, strangerEmail]);
  await db.end();
}
