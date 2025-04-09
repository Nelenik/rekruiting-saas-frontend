/**
 * Splits an array into a specified number of columns. Can be used to divide some lists to columns when css use is imposible
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array to be split.
 * @param {number} [columnsCount=2] - The number of columns to split the array into.
 * @param {number} [minLenForSplitting=7] - The minimum length required to perform splitting.
 * @returns {T[][]} - A two-dimensional array where each sub-array represents a column.
 *
 * @example
 * ```ts
 * splitArrayToColumns([1, 2, 3, 4, 5, 6, 7, 8], 2);
 * // Output: [[1, 2, 3, 4], [5, 6, 7, 8]]
 * ```
 */

export const splitArrayToColumns = <T>(
  array: T[],
  columnsCount: number = 2,
  minLenForSplitting: number = 6
): T[][] => {
  if (array.length < minLenForSplitting) {
    return [array];
  }
  const midpoint = Math.ceil(array.length / columnsCount);
  return Array.from({ length: columnsCount }, (_, i) => {
    const start = i * midpoint;
    const end = start + midpoint;
    return array.slice(start, end);
  });
};
