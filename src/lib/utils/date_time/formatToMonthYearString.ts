import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату в строку в формате "месяц год" (например, "январь 2023").
 *
 * @param {string | number | Date} date - Дата в формате строки, числа или объекта Date. Может быть ISO-строкой, числом (метка времени) или объектом Date.
 * @returns {string} Строка с месяцем и годом в формате "месяц год" (например, "январь 2023") или пустая строка в случае ошибки.
 *
 * @example
 * // Пример с ISO-строкой
 * formatToMonthYearString('2023-01-15T00:00:00Z');
 * // 'январь 2023'
 */
export const formatToMonthYearString = (
  date: string | number | Date | null
) => {
  if (!date) {
    return "";
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "";
  }
  return format(parsedDate, "LLLL yyyy", { locale: ru });
};
