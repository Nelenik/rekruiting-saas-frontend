import { decodeSegment } from "@/shared/lib/encodeSegments";
import { isSegmentPosition } from "./isSegmentPosition";

type VacanciesPath = { position: string; company: string };

/**
 * Normalizes a dynamic catch-all path from a vacancies route into structured filter data.
 *
 * 🧭 Designed for routes like `/vacancies/[...filters]`, where each segment can represent
 * either a job position or a company name.
 *
 * This utility decodes each path segment, determines whether it corresponds to
 * a known position (using `isSegmentPosition`), and returns a normalized object
 * containing the extracted `position` and `company` values.
 *
 * @param filters - An array of raw path segments from the route (e.g. `["frontend", "google"]`).
 * @returns An object with normalized fields:
 * - `position` — The detected position name, or an empty string if not found.
 * - `company` — The detected company name, or an empty string if not found.
 *
 * @example
 * ```ts
 * // Input: /vacancies/frontend/google
 * normalizeVacanciesFilterPath(["frontend", "google"])
 * // Output: { position: "frontend", company: "google" }
 *
 * // Input: /vacancies/google
 * normalizeVacanciesFilterPath(["google"])
 * // Output: { position: "", company: "google" }
 * ```
 *
 * @remarks
 * - The function assumes that only one segment can match a known position.
 * - Decoding of URL segments is performed via `decodeSegment`.
 */
export const normalizeVacanciesFilterPath = (
  filters: string[]
): VacanciesPath => {
  const result: VacanciesPath = {
    company: "",
    position: "",
  };
  const decoded = filters.map((f) => decodeSegment(f));
  for (const segment of decoded) {
    if (isSegmentPosition(segment)) {
      result.position = segment;
    } else {
      result.company = segment;
    }
  }
  return result;
};
