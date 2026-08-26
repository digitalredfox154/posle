import { describe, expect, it } from "vitest";

const SMS_RU_API_KEY = process.env.SMS_RU_API_KEY || "E39E10E8-1C01-4BD6-6D89-60D0278647CD";

describe("sms.ru API", () => {
  it("should authenticate with valid API key", async () => {
    const res = await fetch(
      `https://sms.ru/auth/check?api_id=${SMS_RU_API_KEY}&json=1`
    );
    const data = await res.json() as { status: string; status_code: number };
    expect(data.status).toBe("OK");
    expect(data.status_code).toBe(100);
  }, 15_000);

  it("should return balance (even if zero)", async () => {
    const res = await fetch(
      `https://sms.ru/my/balance?api_id=${SMS_RU_API_KEY}&json=1`
    );
    const data = await res.json() as { status: string; balance: number };
    expect(data.status).toBe("OK");
    expect(typeof data.balance).toBe("number");
  }, 15_000);
});
