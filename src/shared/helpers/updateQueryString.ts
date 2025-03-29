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
