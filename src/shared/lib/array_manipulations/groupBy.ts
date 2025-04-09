/**
 * Groups an array of objects by a specified key.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to group.
 * @param {(item: T) => string} defineKey - A function that returns the key to group by.
 * @returns {Record<string, T[]>} - An object where the keys are group labels and values are arrays of grouped elements.
 *
 *
 */

export const groupBy = <T = unknown>(
  array: T[],
  defineKey: (item: T) => string
) => {
  return array.reduce((acc: { [key: string]: T[] }, item) => {
    const groupLabel = defineKey(item);
    (acc[groupLabel] ||= []).push(item);
    return acc;
  }, {});
};
