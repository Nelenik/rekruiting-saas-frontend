import { EMatchStatus } from "../types";

export const matchStatusesDict = {
  [EMatchStatus.SCORING]: "Скоринг",
  [EMatchStatus.SCREENING]: "Скрининг",
  [EMatchStatus.INTERVIEW]: "Интервью",
  [EMatchStatus.REFUSAL]: "Отказ",
  [EMatchStatus.OFFER]: "Оффер",
};
