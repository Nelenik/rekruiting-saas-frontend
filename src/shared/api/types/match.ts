import { TResume } from "./resume";
import { TStatus } from "./statuses";
import { TVacancy } from "./vacancies";

// export enum EMatchStatus {
//   SCORING = "scoring",
//   SCREENING = "screening",
//   INTERVIEW = "interview",
//   REFUSAL = "refusal",
//   OFFER = "offer",
// }
export enum EMatchType {
  RESPONSE = "response",
  SOURCING = "sourcing",
}

export type TCandidateShort = {
  id: number;
  name: string;
  city: string;
  salary: number;
  match_point: number;
  created_at: string;
};

export type TMatchStatus = {
  vacancy_id: number;
  status_id: number;
  rank: number;
  status: TStatus;
};

export type TCandidateFull = {
  id: number;
  vacancy_id: number;
  cv_id: number;
  status_id: number;
  status_rank: number;
  type: EMatchType;
  point: number;
  summary: string;
  created_at: string;
  vacancy: TVacancy;
  cv: TResume;
  status: TStatus;
};
