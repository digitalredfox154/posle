import { describe, expect, it } from "vitest";

const YCLIENTS_API = "https://api.yclients.com/api/v1";
const PARTNER_TOKEN = process.env.YCLIENTS_API_KEY || "EDmbFJsWm77R7j4LYcdw";
const USER_TOKEN = process.env.YCLIENTS_USER_TOKEN || "765e569be5a6fa12370b3b6d2b25a797";
const COMPANY_ID = process.env.YCLIENTS_COMPANY_ID || "1525620";

describe("YCLIENTS API integration", () => {
  it("should fetch company info with valid tokens", async () => {
    const res = await fetch(`${YCLIENTS_API}/company/${COMPANY_ID}`, {
      headers: {
        Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
        Accept: "application/vnd.yclients.v2+json",
      },
    });
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.id).toBe(Number(COMPANY_ID));
  });

  it("should fetch services list", async () => {
    const res = await fetch(`${YCLIENTS_API}/book_services/${COMPANY_ID}`, {
      headers: {
        Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
        Accept: "application/vnd.yclients.v2+json",
      },
    });
    const data = await res.json();
    expect(data.success).toBe(true);
    const services = data.data?.services || [];
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });

  it("should fetch staff list", async () => {
    const res = await fetch(`${YCLIENTS_API}/book_staff/${COMPANY_ID}`, {
      headers: {
        Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
        Accept: "application/vnd.yclients.v2+json",
      },
    });
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
