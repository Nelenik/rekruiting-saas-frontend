import { TStatus } from "../api/types";

//tepmorar hardcoded while vac status api apear
export const vacanciesDefaultStatuses: TStatus[] = [
  {
    id: 191,
    name: "Черновик",
    color: "#A9A9A9",
    rank: 1,
  },
  {
    id: 192,
    name: "В работе",
    color: "#FFA500",
    rank: 2,
  },
  {
    id: 193,
    name: "Ожидание",
    color: "#ADD8E6",
    rank: 3,
  },
  {
    id: 194,
    name: "На паузе",
    color: "#4682B4",
    rank: 4,
  },
];
