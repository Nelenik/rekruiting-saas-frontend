import { getTimePartsFromSec } from "./getTimePartsFromSec";
import { stringIsDate } from "./isDate";

/**
 * Calculates the number of days since a given date string.
 * If the date string is invalid, the function returns `0` and logs a warning.
 *
 * @param {string} dateString - The string representing the date from which to calculate the elapsed time.
 * @returns {number} The number of days since the provided date. Returns `0` if the date string is invalid.
 * @example
 * getDaysSinceCreated('2024-12-03'); // 2 (assuming today's date is 2024-12-05)
 * getDaysSinceCreated('invalid-date'); // 0 (and logs "Invalid Date" warning)
 */
export const getDaysSinceCreated = (dateString: string): number => {
  if (!stringIsDate(dateString)) {
    console.warn("Invalid Date");
    return 0;
  }
  const differenceInSec = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );
  const { days } = getTimePartsFromSec(differenceInSec);
  return days;
};
