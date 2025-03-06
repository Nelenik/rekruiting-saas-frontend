import { cn } from "@/lib/utils";
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

const TextFormatter = ({ text, className }: { text: string, className?: string }) => {
  const cleanedText = sanitize(text).replace(/\r\n/g, '\n')

  const regexp = /^([A-ZА-ЯЁ][^:\n]+):/g
  const blocks = cleanedText.split(/\n{2,}/).map((block, id) => {
    const replaced = block
      .replace(/\n/g, '<br/>')
      .replace(regexp, (match) => {
        return `<span class="text-foreground/85 font-medium">${match}</span>`
      })

    return (
      <p
        key={id}
        className={cn('text-muted-foreground mb-2', className)}
        dangerouslySetInnerHTML={{ __html: replaced }}
      ></p>
    )
  })

  return (
    <>
      {blocks}
    </>
  )
}

export default TextFormatter