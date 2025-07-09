import { EVacancyPosition } from "@/shared/api/types";

export const isSegmentPosition = (segmentValue: string): boolean => {
  const availablePositions = Object.values(EVacancyPosition).join("|");
  const positionRegex = new RegExp(`(${availablePositions})`, "i");
  return positionRegex.test(segmentValue);
};
