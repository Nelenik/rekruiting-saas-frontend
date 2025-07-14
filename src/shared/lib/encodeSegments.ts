export function encodeSegment(input: string): string {
  const cleared = input.replaceAll("/", "--").trim().replace(/\s+/g, "_");
  return encodeURIComponent(cleared);
}

export function decodeSegment(input: string): string {
  const decoded = decodeURIComponent(input);
  return decoded.replaceAll("--", "/").replaceAll("_", " ");
}
