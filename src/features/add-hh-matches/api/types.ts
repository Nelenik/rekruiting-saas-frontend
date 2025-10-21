export type THhExperience =
  | "noExperience"
  | "between1And3"
  | "between3And6"
  | "moreThan6";

export type THhGender = "male" | "female" | "unknown";

export type THhEmployment =
  | "full"
  | "part"
  | "project"
  | "volunteer"
  | "probation";

export type THhStatus =
  | "active_search"
  | "looking_for_offers"
  | "not_looking_for_job"
  | "has_job_offer"
  | "accepted_job_offer";

export type THhMatchRequest = {
  vacancy_id: number | string;
  text: string;
  professional_role: (number | string)[];
  area: (number | string)[];
  search_period: number;
  age_from: number;
  age_to: number;
  experience: THhExperience;
  gender: THhGender;
  salary: number;
  employment: THhEmployment[];
  status: THhStatus[];
};

export type THhRole = {
  id: number;
  name: string;
  [key: string]: unknown;
};

export type THhRoleGroup = {
  id: number;
  name: string;
  roles: THhRole[];
};
