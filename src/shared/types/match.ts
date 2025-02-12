export enum EMatchStatus {
  SCORING = "scoring",
  SCREENING = "screening",
  INTERVIEW = "interview",
  REFUSAL = "refusal",
  OFFER = "offer",
}
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
