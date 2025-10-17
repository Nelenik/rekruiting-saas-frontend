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
};

export type THhCheckboxGroupItem = {
  id: number;
  name: string;
  hasChildren?: boolean;
  parent_id?: number | null;
  url?: string;
};
