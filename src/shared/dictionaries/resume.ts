import { ECvStatus } from "../types/resume";

export const workStatusDict = {
  [ECvStatus.LOOKING]: "в поиске",
  [ECvStatus.CONSIDERING]: "рассматривает предложения",
  [ECvStatus.NOT_LOOKING]: "не в поиске",
  [ECvStatus.OFFER]: "есть оффер",
};
