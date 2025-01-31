/**
 * Picks specified keys from an object and optionally filters out `null`, `undefined`, and empty string values.
 *
 * @template T - The object type.
 * @template K - The keys to pick from the object.
 * @param {T} obj - The source object.
 * @param {K[]} keys - The array of keys to pick from the object.
 * @param {boolean} [filterFalsy=true] - If `true`, removes `null`, `undefined`, and empty string values.
 * @returns {Partial<T>} A new object with only the specified keys, optionally filtered.
 *
 * @example
 * const data = {
 *   id: 1,
 *   name: "John",
 *   age: 30,
 *   email: "",
 *   phone: undefined,
 *   city: "New York",
 *   country: null,
 * };
 *
 * // Filtering falsy values
 * const filtered = pickAndFilter(data, ["name", "email", "city", "country"]);
 * console.log(filtered); // { name: "John", city: "New York" }
 *
 * // Without filtering (keeping all selected values)
 * const pickedAll = pickAndFilter(data, ["name", "email", "city", "country"], false);
 * console.log(pickedAll); // { name: "John", email: "", city: "New York", country: null }
 */
export const pickAndFilter = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  filterFalsy: boolean = true
): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    const value = obj[key];

    if (filterFalsy) {
      // Проверяем на falsy значения только если включен флаг filterFalsy
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = value;
      }
    } else {
      // Если флаг выключен, копируем все значения
      acc[key] = value;
    }

    return acc;
  }, {} as Pick<T, K>);
};
