import { encodeSegment } from "@/shared/lib/encodeSegments";
import { useParams, useRouter, useSearchParams } from "next/navigation";
/**
 * A custom React hook for working with dynamic path segments in a Next.js route.
 *
 * 🧭 Designed for routes that use a catch-all segment (e.g. `[...filters]`),
 * where each segment in the URL represents a distinct filter or category.
 *
 * This hook helps read and update specific path segments programmatically
 * while preserving query parameters.
 *
 * @param baseUrl - The static base path (e.g. `/vacancies`) that precedes dynamic segments.
 *
 * @returns An object containing:
 * - `pathFilters`: An array of current dynamic path segments (decoded).
 * - `updatePathParam`: A function factory that returns an updater for a specific segment.
 *
 * @example
 * ```tsx
 * // URL: /vacancies/frontend/google?sort=desc
 * const { pathFilters, updatePathParam } = usePathParamFilter('/vacancies');
 *
 * console.log(pathFilters); // ["frontend", "google"]
 *
 * const updateCompany = updatePathParam(1);
 * updateCompany('meta'); // Navigates to /vacancies/frontend/meta?sort=desc
 * ```
 *
 * @remarks
 * - Empty segments are automatically removed from the path when updating.
 * - Query parameters are preserved when navigating.
 * - The hook expects the catch-all segment to be named `filters` in your route definition.
 *
 * Example route definition:
 * ```
 * /vacancies/[...filters]/page.tsx
 * ```
 */
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
    newFilters[paramIndex] = encodeSegment(newValue);
    //clean empty values
    const cleanedParams = newFilters.filter(Boolean).join("/");
    router.push(`${baseUrl}/${cleanedParams}${query}`);
  };

  /**
   * Updates all dynamic path segments in the URL and navigates to the new route.
   * Removes empty segments automatically.
   *
   * If `dryRun` is `true`, returns the new path string without navigation —
   * useful for combining with query updates before pushing manually.
   *
   * @param newValues - Array of new path segment values.
   * @param options - Optional settings.
   * @param options.dryRun - When `true`, returns the new path instead of navigating.
   * @returns The new path if `dryRun` is enabled, otherwise nothing.
   *
   * @example
   * updatePathParams(['frontend', 'meta']);
   * // → navigates to /vacancies/frontend/meta?sort=desc
   *
   * updatePathParams(['frontend', 'meta'], { dryRun: true });
   * // → "/vacancies/frontend/meta"
   */
  const updatePathParams = (
    newValues: string[],
    options?: { dryRun?: boolean }
  ) => {
    const newFilters = newValues.map((item) => encodeSegment(item));
    const cleanedParams = newFilters.filter(Boolean).join("/");
    if (options?.dryRun) {
      return `${baseUrl}/${cleanedParams}`;
    }
    router.push(`${baseUrl}/${cleanedParams}${query}`);
  };
  return { pathFilters: filters, updatePathParam, updatePathParams };
};
