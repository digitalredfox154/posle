import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const faviconPath = path.join(projectRoot, "client", "public", "favicon.ico");
const indexPath = path.join(projectRoot, "client", "index.html");

describe("site favicon", () => {
  it("includes the provided favicon asset", () => {
    expect(existsSync(faviconPath)).toBe(true);
    expect(statSync(faviconPath).size).toBeGreaterThan(0);
  });

  it("declares the favicon in the document head", () => {
    const html = readFileSync(indexPath, "utf8");
    expect(html).toContain('<link rel="icon" type="image/x-icon" href="/favicon.ico" />');
    expect(html).toContain('<link rel="apple-touch-icon" href="/favicon.jpg" />');
  });
});
