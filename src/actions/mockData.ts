import {
  EVacancyStatus,
  TCandidateShort,
  TVacancy,
  TVacancyShort,
} from "@/shared/types";

export const mockVacancies: TVacancyShort[] = [
  {
    id: 1,
    name: "Frontend Dev",
    status: EVacancyStatus.WORK,
    created_at: "2025-01-22T09:00:00+01:00",
  },
  {
    id: 2,
    name: "Backend Dev",
    status: EVacancyStatus.PAUSE,
    created_at: "2025-01-23T13:30:00+01:00",
  },
  {
    id: 3,
    name: "Quality Assurance",
    status: EVacancyStatus.SETTING,
    created_at: "2025-01-24T20:45:00+01:00",
  },
];

export const mockVacancy: TVacancy = {
  id: 1,
  name: "Frontend Dev",
  salary_from: 100000,
  salary_to: 110000,
  salary_candy: 120000,
  salary_market: 100000,
  status: EVacancyStatus.WORK,
  match_count: 18,
  match_hot_count: 90,
  created_at: "2025-01-22T09:00:00+01:00",
};

export const mockCandidateShort: TCandidateShort[] = [
  {
    id: 1,
    name: "Ivanov Ivan",
    city: "Moskow",
    salary: 100000,
    match_point: 5.5,
    created_at: "2025-01-22T09:00:00+01:00",
  },
];
