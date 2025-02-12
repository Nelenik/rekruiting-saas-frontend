/**
 * Removes `null` and `undefined` values from an object while preserving its structure.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object to be filtered.
 * @returns {NonNullableFields<T>} A new object with `null` and `undefined` values removed.
 *
 * @example
 * const data = { name: "Alice", age: null, city: "New York" };
 * const filtered = filterFalsyFields(data);
 * console.log(filtered); // { name: "Alice", city: "New York" }
 */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export function filterFalsyFields<T extends object>(
  obj: T
): NonNullableFields<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  ) as NonNullableFields<T>;
}
