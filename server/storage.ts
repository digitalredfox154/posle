import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

function normalizeKey(relKey: string): string {
  const key = relKey.replace(/^\/+/, "");
  if (!key || key.split("/").some(part => part === ".." || part.length === 0)) {
    throw new Error("Invalid storage key");
  }
  return key;
}

function appendHashSuffix(relKey: string): string {
  const hash = randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

export function getStorageDirectory(): string {
  return path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), "storage"));
}

function getAbsolutePath(key: string): string {
  const root = getStorageDirectory();
  const target = path.resolve(root, key);
  if (!target.startsWith(`${root}${path.sep}`)) {
    throw new Error("Storage path escapes configured directory");
  }
  return target;
}

/** Store files locally on the VPS; Nginx serves the same-origin /uploads path. */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  _contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const key = appendHashSuffix(normalizeKey(relKey));
  const target = getAbsolutePath(key);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, data);
  return { key, url: `/uploads/${key}` };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: `/uploads/${key}` };
}

/** Existing call sites expect a URL; files are already protected by normal app access rules. */
export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = normalizeKey(relKey);
  await fs.access(getAbsolutePath(key));
  return `/uploads/${key}`;
}
