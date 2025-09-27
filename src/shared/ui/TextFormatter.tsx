import { cn } from "@/shared/lib/utils";
import sanitize from "sanitize-html";

/**
 * A component that formats text by sanitizing input, preserving paragraph structure, 
 * replacing newlines with `<br/>`, and highlighting headings.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content to format.
 * @param {string} [props.className] - Optional additional CSS classes for styling paragraphs.
 * @returns {JSX.Element} A formatted text block with enhanced readability.
 */


export const TextFormatter = ({ text, className }: { text: string, className?: string }) => {
  const cleanedText = sanitize(text).replace(/\r\n/g, '\n');

  // const regexp = /([A-ZА-ЯЁ][^:\n]+):\s/g;
  const heading1 = /^\*{2}(.+?)\*{2}/g;
  const heading2 = /^#{2,}\s*(.+?)$/g
  const inlineBoldRegexp = /\*\*(.+?)\*\*/g
  const linkReg = /https?:\/\/[^\s]+/g;
  const listIndicatorReg = /^(\*|[-•●])|.+;$/u

  const blocks = cleanedText.split(/\n{2,}/).map((block, id) => {
    const lines = block
      .split('\n')
      .map((line) => {
        // Subtitle 1 (bold text **smth**)
        if (heading1.test(line)) {
          return line.replace(heading1, (_, title: string) => {
            return (
              `<p class="mb-2 text-base  font-semibold text-foreground">${title}</p>`);
          });
        }
        // Subtitle 2 (#+ text)
        if (heading2.test(line)) {
          return line.replace(heading2, (_, title: string) => {
            return (
              `<p class="mb-2 text-base  font-semibold text-foreground">${title}</p>`);
          })
        }

        if (inlineBoldRegexp.test(line)) {
          line = line.replace(inlineBoldRegexp, (_, title) => {
            return `<span class=" text-foreground/85 font-medium">${title}</span>`
          })
        }
        // list —
        if (listIndicatorReg.test(line)) {
          line = line
            .replace(/^(\*|[-•●])\s*/, '').trim()
            .replace(/;$/, '').trim();
          line = '<span class="text-primary">—</span> ' + line;
        }

        // links
        if (linkReg.test(line)) {
          line = line.replace(linkReg, (match) => {
            return `<a href="${match}" target="_blank" class="text-primary underline underline-offset-2 decoration-transparent hover:decoration-current transition-colors duration-300">${match}</a>`;
          });
        }

        return `<p class="mb-3">${line}</p>`;
      })
      .join('');
    return (
      <div
        key={id}
        className={cn('text-muted-foreground mb-2 ', className)}
        dangerouslySetInnerHTML={{ __html: lines }}
      />
    )
  });

  return (
    <>
      {blocks}
    </>
  )
}
