/**
 * `getYYFromMM` converts a given number of months into years and remaining months.
 *
 * @param {number} months - The total number of months to be converted.
 *
 * @returns {Object} An object with two properties:
 * - `years`: The number of full years (calculated as `months / 12`).
 * - `months`: The remaining months after calculating the full years (calculated as `months % 12`).
 *
 * @example
 * const result = getYYFromMM(15);
 * console.log(result); // { years: 1, months: 3 }
 */
export const getYYFromMM = (
  months: number
): { years: number; months: number } => {
  return {
    years: Math.floor(months / 12),
    months: months % 12,
  };
};
