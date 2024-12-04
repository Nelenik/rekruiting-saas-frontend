import {
  candidateBasicSchema,
  candidateFullSchema,
} from "@/schemas/matchSchemas";
import { z } from "zod";

export type MatchStatus = "Контакт" | "Скрининг" | "Собеседование" | "Финал";

export type CandidateFull = z.infer<typeof candidateFullSchema>;
export type CandidateBasic = z.infer<typeof candidateBasicSchema>;
