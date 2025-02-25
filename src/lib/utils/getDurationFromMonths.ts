import { formatDuration } from "date-fns";
import { ru } from "date-fns/locale";
import { getYYFromMM } from "./getYYFromMM";

/**
 * `getDurationFromMonths` converts a given number of months into a formatted duration string
 * in Russian, including years and months, or returns a default message if no months are provided.
 *
 * @param {number} months - The total number of months to be converted into a duration string.
 *
 * @returns {string} A formatted duration string in Russian, for example:
 * - "1 год 3 месяца опыта" for 15 months.
 * - "опыт не указан" if no months are provided (i.e., the input is 0 or undefined).
 *
 * @example
 * const result = getDurationFromMonths(15);
 * console.log(result); // "1 год 3 месяца опыта"
 *
 * @example
 * const result = getDurationFromMonths(0);
 * console.log(result); // "опыт не указан"
 */
export const getDurationFromMonths = (months: number): string => {
  return months
    ? `${formatDuration(getYYFromMM(months), {
        format: ["years", "months"],
        locale: ru,
      })} опыта`
    : "опыт не указан";
};
