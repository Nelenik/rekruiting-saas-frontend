import z from "zod";
import { EVacancyStatus } from "../types";

export const SVacancy = z.object({
  id: z.number(),
  company_id: z.number().optional(),
  name: z.string().nullable(),
  position: z.string().nullable(),
  responsibilities: z.string().nullable(),
  conditions: z.string().nullable(),
  employment: z.string().nullable(),
  skills: z.string().nullable(),
  work_format: z.string().nullable(),
  experience: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  salary_from: z.number().nullable(),
  salary_to: z.number().nullable(),
  salary_candy: z.number().nullable(),
  salary_market: z.number().nullable(),
  //set default value for status to setting if from server come null
  status: z
    .nativeEnum(EVacancyStatus)
    .nullable()
    .transform((val) => val ?? EVacancyStatus.UNASSIGNED),
  match_count: z.number().nullable(),
  match_hot_count: z.number().nullable(),
  created_at: z.string(),
});

export const SVacancyShort = SVacancy.pick({
  id: true,
  name: true,
  status: true,
  created_at: true,
  location: true,
  salary_from: true,
  salary_to: true,
});

export const SVacancyList = z.array(SVacancyShort);
