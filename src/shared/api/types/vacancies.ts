import { TCompany } from "./companies";
import { TMatchStatus } from "./match";
import { TStatus } from "./statuses";
import { z } from "zod/v4";

export enum EVacancyPosition {
  DEVELOPER = "developer",
  TEAM_LEAD = "team-lead",
  TESTER = "qa",
  PM = "pm",
  ANALYST = "analyst",
  DEVOPS = "devops",
  DESIGNER = "designer",
  DATA_SCIENTIST = "data-scientist",
  TECHNICAL_SUPPORT = "technical-support",
}

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

export type TVacancyPosition = {
  position: string;
  count: string | number;
};

//added schema for future form validation
export const VacancyRequestSchema = z
  .object({
    name: z.string(),
    company_id: z.string(),
    status_id: z.string(),
    position: z.enum(EVacancyPosition),
    responsibilities: z.string(),
    conditions: z.string(),
    description: z.string(),
    employment: z.enum(EVacancyEmployment),
    salary_from: 0,
    salary_to: 0,
    skills: z.string(),
    work_format: z.enum(EVacancyWorkFormat),
    experience: z.enum(EVacancyExperience),
    location: z.string(),
    matchStatuses: z.string().array(),
    external_id: z.string(),
  })
  .partial();

export type TVacancyMutation = z.infer<typeof VacancyRequestSchema>;

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
  summary: string;
  salary_from: number;
  salary_to: number;
  salary_candy: number;
  salary_market: number;
  status: TStatus;
  match_count: number;
  match_hot_count: number;
  matchStatuses: TMatchStatus[];
  level: EVacancyLevel;
  created_at: string;
  external_id: string;
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
  | "status"
>;

//Jobsite public vacancy data type
export type TPublicVacancy = Pick<
  TVacancy,
  | "id"
  | "name"
  | "salary_from"
  | "salary_to"
  | "location"
  | "experience"
  | "position"
  | "work_format"
  | "employment"
  | "skills"
  | "responsibilities"
  | "conditions"
  | "description"
  | "level"
> & {
  company: {
    name: TCompany["name"];
    full_name: TCompany["full_name"];
    description: TCompany["description"];
  };
  link: string;
  addition: string;
  publication_at: string;
};
