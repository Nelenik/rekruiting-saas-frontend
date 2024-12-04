import { z } from "zod";

export const vacancyFullSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  VacSalaryFrom: z.number(),
  CompID: z.array(z.string()),
  VacLoc: z.string(),
  VacEdu: z.string(),
  VacSalaryCandy: z.number(),
  VacName: z.string(),
  VacSalaryMarket: z.number(),
  VacSalaryTo: z.number(),
  VacStatus: z.string(),
  VacExp: z.string(),
  Match: z.array(z.string()),
  VacSpec: z.string(),
  VacSkills: z.array(z.string()),
  VacID: z.number(),
  VacCrD: z.string(),
  VacLMD: z.string(),
  VacFile: z.array(z.unknown()),
  "CompanyName (form CompID)": z.array(z.string()),
  MatchCount: z.number(),
  MatchHotCount: z.number(),
});

export const vacancyBasicSchema = vacancyFullSchema.pick({
  id: true,
  createdTime: true,
  VacName: true,
  VacID: true,
  VacCrD: true,
  VacStatus: true,
});
