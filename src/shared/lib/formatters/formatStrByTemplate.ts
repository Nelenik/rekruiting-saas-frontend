/**
 * Formats a string by replacing placeholders in the template with corresponding values from the data object.
 *
 * Placeholders in the template should be wrapped in curly braces `{}` and contain word characters (letters, digits, and underscores).
 * For example: "Hello, {name}! Your score is {score}."
 *
 * @param template - The template string containing placeholders to be replaced.
 * @param data - An object mapping placeholder keys to their replacement values. Values can be strings or numbers.
 *
 * @returns The formatted string with all placeholders replaced by their corresponding values from the data object.
 *          If a placeholder does not have a matching key in `data`, it will be replaced with an empty string.
 *
 * @example
 * ```ts
 * formatStrByTemplate("Hello, {name}! You have {count} new messages.", { name: "Alice", count: 5 });
 * // Returns: "Hello, Alice! You have 5 new messages."
 * ```
 */
export function formatStrByTemplate(
  template: string,
  data: Record<string, string | number>
) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(data[key] ?? ""));
}
