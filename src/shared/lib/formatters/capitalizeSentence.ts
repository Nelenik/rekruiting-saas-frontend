export function capitalizeSentences(text: string): string {
  return text.replace(/(^|[.!?]\s+)(\p{Ll})/gu, (_, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
}
