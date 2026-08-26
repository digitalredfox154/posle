import { describe, expect, it, vi } from "vitest";
import { deliverAndStoreEmailOtp } from "./routers/client";

describe("email OTP delivery persistence", () => {
  it("does not persist a code when email delivery fails", async () => {
    const persist = vi.fn().mockResolvedValue(undefined);

    await expect(deliverAndStoreEmailOtp(
      async () => { throw new Error("SMTP unavailable"); },
      persist,
    )).rejects.toThrow("SMTP unavailable");

    expect(persist).not.toHaveBeenCalled();
  });

  it("persists a code only after successful email delivery", async () => {
    const callOrder: string[] = [];

    await deliverAndStoreEmailOtp(
      async () => { callOrder.push("deliver"); },
      async () => { callOrder.push("persist"); },
    );

    expect(callOrder).toEqual(["deliver", "persist"]);
  });
});
