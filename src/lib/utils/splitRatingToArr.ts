/**
 * Splits a rating number into an array where:
 * - Full stars are represented as `1`,
 * - The fractional part is represented as a decimal value,
 * - The remaining stars are filled with `0`.
 *
 * @param {number} rating - The rating to be split into an array (can be a decimal number).
 * @param {number} [minCountOfStars=5] - The minimum number of stars to return, defaults to 5.
 * @returns {number[]} An array representing the rating split into full stars, a fractional part, and empty stars.
 *
 * @example
 * splitRatingToArr(3.5);
 * // Returns: [1, 1, 1, 0.5, 0]
 *
 */
export const splitRatingToArr = (
  rating: number,
  minCountOfStars: number = 5
): number[] => {
  const intPart = Math.floor(rating);
  const decimalPart = rating - intPart;
  const splittedRating: number[] = Array.from(
    { length: Math.max(Math.ceil(rating), minCountOfStars) },
    (_, i) => {
      return i + 1 <= intPart ? 1 : decimalPart;
    }
  ).fill(0, Math.ceil(rating));
  return splittedRating;
};
