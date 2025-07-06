import { EVacancyPosition } from "@/shared/api/types";

export const identifyPubVacancyFilters = (filters: string[]) => {
  const availablePositions = Object.values(EVacancyPosition).join("|");
  const positionRegex = new RegExp(`(${availablePositions})`, "i");

  return filters.reduce((acc, filter) => {
    if (positionRegex.test(filter)) {
      acc.position = filter;
    } else {
      acc.company = filter;
    }
    return acc;
  }, {} as Record<string, string>);
};
