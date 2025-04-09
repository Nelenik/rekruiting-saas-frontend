/**
 * Type guard to check if a given string is a valid date string.
 *
 * @param {string} dateString - The string to check.
 * @returns {boolean} Returns `true` if the string represents a valid date, otherwise `false`.
 * @example
 * stringIsDate('2024-12-03'); // true
 * stringIsDate('invalid-date'); // false
 */
export const stringIsDate = (dateString: string): dateString is string => {
  const timestamp = new Date(dateString).getTime();
  return !isNaN(timestamp);
};
