import { EVacancyLevel } from "./vacancies";

export enum ECvStatus {
  LOOKING = "looking",
  CONSIDERING = "considering-offers",
  NOT_LOOKING = "not-looking",
  OFFER = "offer",
}

export enum ECvSchedule {
  FULL = "full",
  PARTIAL = "partial",
  PROJECT = "project",
}

export enum ECvCandyGender {
  MALE = "male",
  FEMALE = "female",
}

export type TWorkExperience = {
  id: number;
  cv_id: number;
  title: string | null;
  company: string | null;
  city: string | null;
  post: string | null;
  description: string | null;
  created_at: string; // ISO 8601 строка
  updated_at: string; // ISO 8601 строка
  start_at: string | null; // ISO 8601 строка или null
  end_at: string | null; // ISO 8601 строка или null
  deleted_at: string | null; // ISO 8601 строка или null
  cv: null | TResume;
};

export type TResume = {
  id: number;
  external_id: string;
  name: string; //position
  salary: number;
  summary: string;
  experience_months: number;
  experience_raw: string; //experience descr
  experience: TWorkExperience[];
  candy_name: string;
  candy_photo: string;
  candy_email: string;
  candy_tg: string;
  candy_phone: string;
  candy_location: string;
  // candy_lang: unknown;
  candy_birthday: string; //iso
  candy_gender: ECvCandyGender;
  schedule: ECvSchedule; //занятость
  bio: string;
  link: string;
  from: string;
  // embedding: unknown;
  status: ECvStatus;
  level: EVacancyLevel;
  is_remote: boolean;
  can_relocate: boolean;
  created_at: string; //iso
  published_at: string; //iso
};
