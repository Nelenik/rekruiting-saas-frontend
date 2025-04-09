/**
 * Removes specified fields from an object and returns a new object without them.
 *
 * @template T - The type of the original object.
 * @template K - The keys of the object to be omitted.
 * @param {T} object - The original object from which fields should be omitted.
 * @param {K[]} fieldNames - An array of field names to be removed.
 * @returns {Omit<T, K>} - A new object without the specified fields.
 *
 * @example
 * const user = { id: 1, name: "Alice", password: "secret" };
 * const safeUser = omitFields(user, ["password"]);
 * console.log(safeUser); // { id: 1, name: "Alice" }
 */
export const omitFields = <T extends object, K extends keyof T>(
  object: T,
  fieldNames: K[]
): Omit<T, K> => {
  const cleanedObject = { ...object };

  // Remove each field in fieldNames from the new object
  fieldNames.forEach((field) => {
    delete cleanedObject[field];
  });

  return cleanedObject as Omit<T, K>;
};
