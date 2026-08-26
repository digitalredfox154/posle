import { describe, expect, it } from "vitest";
import { isSmtpConfigured, shouldExposeEmailTestCode } from "./routers/client";

describe("OTP email configuration", () => {
  it("recognizes a complete SMTP configuration", () => {
    expect(isSmtpConfigured({ SMTP_HOST: "smtp.example.com", SMTP_USER: "noreply@example.com", SMTP_PASS: "secret" })).toBe(true);
    expect(isSmtpConfigured({ SMTP_HOST: "smtp.example.com", SMTP_USER: "noreply@example.com" })).toBe(false);
  });

  it("never exposes an OTP test code in production", () => {
    expect(shouldExposeEmailTestCode({ NODE_ENV: "production" })).toBe(false);
    expect(shouldExposeEmailTestCode({ NODE_ENV: "development" })).toBe(true);
    expect(shouldExposeEmailTestCode({ NODE_ENV: "development", SMTP_HOST: "smtp.example.com", SMTP_USER: "noreply@example.com", SMTP_PASS: "secret" })).toBe(false);
  });
});
