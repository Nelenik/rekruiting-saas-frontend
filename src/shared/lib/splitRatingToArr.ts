/**
 * Splits a rating number into an array of objects representing stars.
 * Each object contains a `fullness` (the star value) and a unique `id`:
 * The fullness can be one of the following:
 * - Full stars are represented as `1`,
 * - The fractional part is represented as a decimal value,
 * - The remaining stars are filled with `0`.
 *
 * @param {number} rating - The rating to be split into an array (can be a decimal number).
 * @param {number} [minCountOfStars=5] - The minimum number of stars to return, defaults to 5.
 * @returns {{fullness:number, id:string}[]} An array of objects, where each object has:
 *          - `fullness`: A number indicating the star's value (1 for full stars, fractional for partial stars, and 0 for empty stars).
 *          - `id`: A unique string identifier for the star.
 *
 * @example
 * // Example 1: Rating 3.5 with 5 stars
 * const result = splitRatingToArr(3.5);
 * console.log(result);
 * // Output:
 * // [
 * //   { fullness: 1, id: 'unique-id-1' },
 * //   { fullness: 1, id: 'unique-id-2' },
 * //   { fullness: 1, id: 'unique-id-3' },
 * //   { fullness: 0.5, id: 'unique-id-4' },
 * //   { fullness: 0, id: 'unique-id-5' }
 * // ]
 */
export const splitRatingToArr = (
  rating: number,
  minCountOfStars: number = 5
): { fullness: number; id: string }[] => {
  const intPart = Math.floor(rating);
  const decimalPart = parseFloat((rating % 1).toFixed(1));
  const splittedRating = Array.from(
    { length: Math.max(Math.ceil(rating), minCountOfStars) },
    (_, i) => {
      return i + 1 <= intPart ? 1 : decimalPart;
    }
  )
    .fill(0, Math.ceil(rating))
    .map((value) => ({
      fullness: value,
      id: Math.random().toString(36).substring(2, 15),
    }));
  return splittedRating;
};
