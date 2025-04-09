import { formatPrice } from "./formatersIntl";

/**
 * Generates a formatted salary range string.
 * If the minimum salary and maximum salary are the same, returns a single salary value.
 * Otherwise, returns the salary range in the format "salaryFrom-salaryTo".
 *
 * @param {number} salaryFrom - The minimum salary value.
 * @param {number} salaryTo - The maximum salary value.
 * @returns {string} A formatted string representing the salary range or a single salary value.
 * @example
 * getSalaryOffer(50000, 50000); // "₽50,000"
 * getSalaryOffer(50000, 70000); // "₽50,000-₽70,000"
 */
export const formatSalaryRange = (
  salaryFrom: number | null,
  salaryTo: number | null
): string => {
  const salaryFromPrice = formatPrice(salaryFrom, "ru-Ru", "RUB");
  const salaryToPrice = formatPrice(salaryTo, "ru-Ru", "RUB");
  return salaryFrom === salaryTo
    ? salaryToPrice
    : `${salaryFromPrice} - ${salaryToPrice}`;
};
