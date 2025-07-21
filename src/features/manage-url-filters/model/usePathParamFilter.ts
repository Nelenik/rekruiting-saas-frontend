import { useParams, useRouter, useSearchParams } from "next/navigation";
/**
 * A custom React hook for managing a single dynamic path segment (filter) in a Next.js route.
 *
 * ⚠️ This hook is designed to work specifically with catch-all route segments (e.g., `[...filters]`)
 * where each filter is located at a known and fixed position in the URL path.
 *
 * Useful for cases where part of the filter state is encoded directly in the pathname,
 * such as `/vacancies/:position/:company`, and you want to update a specific segment programmatically.
 *
 * @param baseUrl - The static base URL (e.g., `/vacancies`) that precedes the dynamic segments.
 * @param paramIndex - The index of the segment to control in the catch-all path array (e.g., 0 for position, 1 for company).
 *
 * @returns An object containing:
 * - `value`: The current decoded value of the path segment at the specified index.
 * - `updatePathParam`: A function to update that path segment and push a new route, preserving existing query parameters.
 *
 * @example
 * ```tsx
 * const { value: position, updatePathParam: updatePosition } = usePathParamFilter('/vacancies', 0);
 *
 * return (
 *   <PositionSelect
 *     value={position}
 *     onValueChange={updatePosition}
 *   />
 * );
 * ```
 */
// export const usePathParamFilter = (baseUrl: string, paramIndex: number) => {
//   const router = useRouter();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const { filters = [] } = params;
//   const value = filters[paramIndex] || "";

//   console.log(filters);

//   const query = searchParams ? `?${searchParams.toString()}` : "";

//   const updatePathParam = (newValue: string) => {
//     const newFilters = [...filters];
//     newFilters[paramIndex] = encodeURIComponent(newValue);
//     //clean empty values
//     const cleanedParams = newFilters.filter(Boolean).join("/");
//     router.push(`${baseUrl}/${cleanedParams}${query}`);
//   };
//   return { value, updatePathParam };
// };
export const usePathParamFilter = (baseUrl: string) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { filters = [] } = params;

  const query = searchParams ? `?${searchParams.toString()}` : "";

  /**
   * Creates a function that updates a specific path parameter in the URL
   * and navigates to the new route.
   *
   * @param paramIndex - The index of the parameter to update in the filters array.
   * @returns A function that accepts a new value, updates the corresponding path parameter,
   *          removes empty values, and pushes the updated URL to the router.
   *
   * @example
   * // Suppose filters = ["category", "item"]
   * const updateSecondParam = updatePathParam(1);
   * updateSecondParam("new-item");
   * // Navigates to `${baseUrl}/category/new-item${query}`
   */
  const updatePathParam = (paramIndex: number) => (newValue: string) => {
    const newFilters = [...filters];
    newFilters[paramIndex] = encodeURIComponent(newValue);
    //clean empty values
    const cleanedParams = newFilters.filter(Boolean).join("/");
    router.push(`${baseUrl}/${cleanedParams}${query}`);
  };
  return { pathFilters: filters, updatePathParam };
};
