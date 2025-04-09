import { TMatchStatus } from "./match";
import { TStatus } from "./statuses";

export type TVacancy = {
  id: number;
  company_id: number;
  status_id: number;
  name: string;
  position: string;
  responsibilities: string;
  conditions: string;
  employment: string;
  skills: string;
  work_format: string;
  experience: string;
  description: string;
  location: string;
  salary_from: number;
  salary_to: number;
  salary_candy: number;
  salary_market: number;
  status: TStatus;
  match_count: number;
  match_hot_count: number;
  matchStatuses: TMatchStatus[];
  created_at: string;
};

export type TVacancyShort = Pick<
  TVacancy,
  | "id"
  | "name"
  | "status_id"
  | "created_at"
  | "location"
  | "salary_from"
  | "salary_to"
>;

// export enum EVacancyPosition {
//   DEVELOPER = "developer",
//   TEAM_LEAD = "team-lead",
//   TESTER = "qa",
//   PM = "pm",
//   ANALYST = "analyst",
//   DEVOPS = "devops",
//   DESIGNER = "designer",
//   DATA_SCIENTIST = "data-scientist",
//   TECHNICAL_SUPPORT = "technical-support",
// }

export enum EVacancyEmployment {
  FULL = "full",
  PARTIAL = "partial",
  PROJECT = "project",
}

export enum EVacancyWorkFormat {
  OFFICE = "office",
  REMOTE = "remote",
  HYBRID = "hybrid",
}

export enum EVacancyExperience {
  LESS_THAN_1 = "less-than-1",
  FROM_1_TO_3 = "from-1-to-3",
  FROM_3_TO_5 = "from-3-to-5",
  MORE_THAN_5 = "more-than-5",
}

export enum EVacancyLevel {
  INTERN = "intern",
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior",
}
