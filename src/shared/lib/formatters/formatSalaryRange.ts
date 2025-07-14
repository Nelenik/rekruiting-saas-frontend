import { formatPrice } from "./formatersIntl";
import { formatStrByTemplate } from "./formatStrByTemplate";

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
  salaryTo: number | null,
  isShort: boolean = true
): string => {
  if (!salaryFrom && !salaryTo) {
    return "Доход не указан";
  }

  const templates = {
    exact: "{to}",
    onlyTo: "до {to}",
    onlyFrom: "от {from}",
    rangeShort: "{from} - {to}",
    rangeFull: "от {from} до {to}",
  };

  let templateKey: keyof typeof templates = "exact";

  if (salaryFrom && salaryTo) {
    if (salaryFrom === salaryTo) {
      templateKey = "exact";
    } else {
      templateKey = isShort ? "rangeShort" : "rangeFull";
    }
  } else if (!salaryFrom && salaryTo) {
    templateKey = "onlyTo";
  } else if (salaryFrom && !salaryTo) {
    templateKey = "onlyFrom";
  }

  const template = templates[templateKey];
  const salaryFromPrice = formatPrice(salaryFrom, "ru-Ru", "RUB");
  const salaryToPrice = formatPrice(salaryTo, "ru-Ru", "RUB");

  return formatStrByTemplate(template, {
    from: salaryFromPrice,
    to: salaryToPrice,
  });
};
