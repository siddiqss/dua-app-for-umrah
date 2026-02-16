export type ReferenceStrength = "verified" | "reported";

const VERIFIED_PATTERNS = [
  /\bquran\b/i,
  /\bsahih\b/i,
];

export function getReferenceStrength(reference?: string): ReferenceStrength {
  if (!reference) return "reported";
  return VERIFIED_PATTERNS.some((pattern) => pattern.test(reference))
    ? "verified"
    : "reported";
}

export function isVerifiedReference(reference?: string): boolean {
  return getReferenceStrength(reference) === "verified";
}
