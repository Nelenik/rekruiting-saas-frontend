import { z } from "zod";

export const candidateFullSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  MatchID: z.string(),
  MatchStatus: z.enum(["Контакт", "Скрининг", "Собеседование", "Финал"]),
  MatchPoint: z.number().min(0),
  MatchType: z.enum(["Hot", "Cold"]),
  CvID: z.array(z.string()),
  VacID: z.array(z.string()),
  CvName: z.array(z.string()),
  CandyPhoto: z.array(z.unknown()),
  CandyName: z.array(z.string()),
  CandyCity: z.array(z.string()),
  CandyCountry: z.array(z.string()),
  CvSalary: z.array(z.number()),
});

export const candidateBasicSchema = candidateFullSchema.pick({
  id: true,
  createdTime: true,
  CandyName: true,
  CandyCity: true,
  CvSalary: true,
  MatchPoint: true,
});
