import { describe, expect, it } from "vitest";
import { getMediaUrlVariants, isPrivateMediaKey } from "./media-access";

describe("media access classification", () => {
  it("keeps only cabinet upload prefixes private", () => {
    expect(isPrivateMediaKey("visits/visit-photo.jpg")).toBe(true);
    expect(isPrivateMediaKey("admin/pet/12/photo.jpg")).toBe(true);
    expect(isPrivateMediaKey("home/hero.jpg")).toBe(false);
    expect(isPrivateMediaKey("generated/site-illustration.png")).toBe(false);
  });

  it("matches both supported persisted URL forms for a storage key", () => {
    expect(getMediaUrlVariants("visits/visit-photo.jpg")).toEqual({
      current: "/uploads/visits/visit-photo.jpg",
      legacy: "/manus-storage/visits/visit-photo.jpg",
    });
  });
});
