import { afterEach, describe, expect, it } from "vitest";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { getStorageDirectory, storageGet, storageGetSignedUrl, storagePut } from "./storage";

let previousStorageDir: string | undefined;
let testRoot: string | undefined;

afterEach(async () => {
  if (testRoot) await fs.rm(testRoot, { recursive: true, force: true });
  if (previousStorageDir === undefined) delete process.env.STORAGE_DIR;
  else process.env.STORAGE_DIR = previousStorageDir;
  testRoot = undefined;
  previousStorageDir = undefined;
});

describe("self-hosted local storage", () => {
  it("writes uploads beneath the configured directory and returns same-origin paths", async () => {
    previousStorageDir = process.env.STORAGE_DIR;
    testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "posle-storage-"));
    process.env.STORAGE_DIR = testRoot;

    const stored = await storagePut("visits/example.jpg", Buffer.from("photo"), "image/jpeg");

    expect(stored.key).toMatch(/^visits\/example_[a-f0-9]{8}\.jpg$/);
    expect(stored.url).toBe(`/uploads/${stored.key}`);
    await expect(fs.readFile(path.join(getStorageDirectory(), stored.key), "utf8")).resolves.toBe("photo");
    await expect(storageGet(stored.key)).resolves.toEqual({ key: stored.key, url: stored.url });
    await expect(storageGetSignedUrl(stored.key)).resolves.toBe(stored.url);
  });

  it("rejects traversal paths", async () => {
    await expect(storagePut("../outside.jpg", "nope")).rejects.toThrow("Invalid storage key");
  });
});
