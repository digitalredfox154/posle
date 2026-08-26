const PRIVATE_MEDIA_PREFIXES = ["admin/", "visits/"] as const;

export function isPrivateMediaKey(key: string): boolean {
  const normalized = key.replace(/^\/+/, "");
  return PRIVATE_MEDIA_PREFIXES.some(prefix => normalized.startsWith(prefix));
}

export function getMediaUrlVariants(key: string) {
  const normalized = key.replace(/^\/+/, "");
  return {
    current: `/uploads/${normalized}`,
    legacy: `/manus-storage/${normalized}`,
  } as const;
}
