import { isSegmentPosition } from "../lib/isSegmentPosition";

export const identifyPubVacancyFilters = (filters: string[]) => {
  return filters.reduce((acc, filter) => {
    if (isSegmentPosition(filter)) {
      acc.position = filter;
    } else {
      acc.company = filter;
    }
    return acc;
  }, {} as Record<string, string>);
};
