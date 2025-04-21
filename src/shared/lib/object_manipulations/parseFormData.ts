/**
 * Parses a `FormData` object into a structured JavaScript object.
 *
 * This function processes standard form fields and array-like fields
 * (identified by the `[]` suffix). It converts values into strings,
 * while maintaining arrays of values when necessary.
 *
 * @template T - The expected return type, allowing for type inference.
 * @param {FormData} formData - The `FormData` object to be parsed.
 * @returns {T} - The parsed object with string values and arrays when applicable.
 *
 * @example
 * const formData = new FormData();
 * formData.append("name", "Alice");
 * formData.append("age", "30");
 * formData.append("tags[]", "developer");
 * formData.append("tags[]", "blogger");
 * formData.append("file", new File(["content"], "file.txt"));
 *
 * const parsed = parseFormData<{ name: string; age: string; tags: string[]; file: File }>(formData);
 * console.log(parsed);
 *
 * // Output:
 * // {
 * //   name: "Alice",
 * //   age: "30",
 * //   tags: ["developer", "blogger"],
 * //   file: File { name: "file.txt", ... }
 * // }
 */
export const parseFormData = <T>(formData: FormData): T => {
  const resultObject = {} as Record<string, unknown>;

  for (const [key, value] of formData.entries()) {
    // May be necessary to remove Next.js internal fields from FormData
    if (key.startsWith("$ACTION")) continue;

    if (key.endsWith("[]")) {
      const cleanedKey = key.slice(0, -2);
      resultObject[cleanedKey] = [
        ...((resultObject[cleanedKey] as unknown[]) || []),
        value,
      ];
    } else {
      resultObject[key] = value;
    }
  }

  return resultObject as T;
};
