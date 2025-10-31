import { ReadonlyURLSearchParams } from "next/navigation";
/**
 * Updates the query string based on the provided search parameters.
 *
 * @param currentSearchParams - The current URL search parameters to modify.
 * @param paramName - The name of the query parameter to update or remove. Optional.
 * @param value - The value to set for the given `paramName`. If not provided, the parameter will be removed. Optional.
 *
 * @returns The updated query string, including the page parameter and any other modified parameters.
 *
 * @example
 * const currentSearchParams = new URLSearchParams('page=1&category=books');
 * const updatedQueryString = updateQueryString(currentSearchParams, 'category', 'electronics');
 * console.log(updatedQueryString); // 'page=1&category=electronics'
 */

export function updateQueryString(
  currentSearchParams: ReadonlyURLSearchParams,
  newValues: { [key: string]: string | number } | null
) {
  const qs = new URLSearchParams(currentSearchParams);

  if (newValues === null) {
    return "";
  }

  for (const [paramName, value] of Object.entries(newValues)) {
    if (paramName) {
      if (value) {
        qs.set(paramName, decodeURIComponent(String(value)));
      } else {
        qs.delete(paramName);
      }
    }
  }

  const pageValue = qs.get("page");
  qs.delete("page");

  const newQs = new URLSearchParams();
  if (pageValue) {
    newQs.set("page", pageValue);
  }

  for (const [key, val] of qs.entries()) {
    newQs.set(key, val);
  }

  return newQs.toString();
}

/**
 * Converts a `ReadonlyURLSearchParams` object into a plain JavaScript object.
 *
 * Each query parameter becomes a key in the resulting object.
 * - If a parameter appears multiple times, its value will be stored as an array.
 * - Otherwise, it will be stored as a string (or number, if applicable).
 *
 * @param searchParams - The `ReadonlyURLSearchParams` instance containing URL query parameters.
 * @returns An object representing the query parameters, where:
 * - Keys are parameter names.
 * - Values are either a string, number, or an array of strings/numbers if the parameter is repeated.
 *
 * @example
 * ```ts
 * const params = new URLSearchParams("a=1&b=2&a=3");
 * const result = getObjectFromSearchParams(params);
 * // result = { a: ["1", "3"], b: "2" }
 * ```
 */
export const getObjectFromSearchParams = (
  searchParams: ReadonlyURLSearchParams
) => {
  const result: Record<string, string | number | (string | number)[]> = {};

  for (const [key, value] of searchParams.entries()) {
    if (key in result) {
      const currentValue = result[key];
      result[key] = Array.isArray(currentValue)
        ? [...currentValue, value]
        : [currentValue, value];
    } else {
      result[key] = value;
    }
  }
  return result;
};

/**
 * Builds a URL query string from a filters object.
 *
 * Converts an object of key-value pairs into a URL-encoded query string.
 * - If a value is an array, multiple key-value pairs are added (e.g. `a=1&a=2`).
 * - If a value is a string or number, a single key-value pair is added.
 *
 * @param filters - An object representing query parameters.
 * Keys are parameter names, and values can be:
 * - a string or number (single value), or
 * - an array of strings/numbers (multiple values for the same parameter).
 *
 * @returns A URL-encoded query string (without a leading `?`).
 *
 * @example
 * ```ts
 * const filters = { a: ["1", "3"], b: "2" };
 * const result = buildQueryString(filters);
 * // result = "a=1&a=3&b=2"
 * ```
 */

export const buildQueryString = (
  filters: Record<string, string | number | (string | number)[]>
) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  });
  return params.toString();
};
