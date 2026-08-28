import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

async function readPage(page: string) {
  return readFile(resolve(projectRoot, "client/src/pages", page), "utf8");
}

describe("public experience and opening-hours copy", () => {
  it("uses two years of experience on the home page", async () => {
    const home = await readPage("Home.tsx");

    expect(home).toContain("2 ГОДА<br />ОПЫТА");
    expect(home).not.toContain("5 ЛЕТ<br />ОПЫТА");
  });

  it("shows weekend-only hours across public pages", async () => {
    const [home, about, contacts] = await Promise.all([
      readPage("Home.tsx"),
      readPage("About.tsx"),
      readPage("Contacts.tsx"),
    ]);

    for (const page of [home, about, contacts]) {
      expect(page).toContain("Сб — Вс");
      expect(page).not.toContain("Чт — Вс");
    }

    expect(home).toContain("Пн — Пт: выходной");
  });
});
