import { EVacancyPosition } from "@/shared/api/types";

/**
 * Determines whether a given URL segment corresponds to a valid vacancy position.
 *
 * 🧩 This function checks if the provided string matches any known position
 * defined in the `EVacancyPosition` enum.
 *
 * Internally, it builds a case-insensitive regular expression from all available
 * position values and tests the input segment against it.
 *
 * @param segmentValue - A decoded URL segment to test (e.g. `"frontend"` or `"designer"`).
 * @returns `true` if the segment matches a known position, otherwise `false`.
 *
 * @example
 * ```ts
 * isSegmentPosition("frontend") // true
 * isSegmentPosition("google")   // false
 * ```
 *
 * @remarks
 * - The comparison is case-insensitive.
 * - Useful for differentiating between position and company segments in catch-all routes.
 */
export const isSegmentPosition = (segmentValue: string): boolean => {
  const availablePositions = Object.values(EVacancyPosition).join("|");
  const positionRegex = new RegExp(`(${availablePositions})`, "i");
  return positionRegex.test(segmentValue);
};
