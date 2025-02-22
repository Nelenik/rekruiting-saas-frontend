import {
  EMatchStatus,
  EVacancyPosition,
  EVacancyStatus,
  TCandidateShort,
  TVacancy,
  TVacancyShort,
} from "@/shared/types";
import { TCompany } from "@/shared/types/companies";
import { ECvStatus, TResume } from "@/shared/types/resume";
import { IUser } from "@/shared/types/user";

export const mockUser: IUser = {
  id: 1,
  name: "Иванов Иван",
  email: "test@mail.com",
};

export const mockCandidateShort: Record<string, TCandidateShort[]> = {
  screening: [
    {
      id: 1,
      name: "Ivanov Ivan",
      city: "Moskow",
      salary: 100000,
      match_point: 5.5,
      created_at: "2025-01-22T09:00:00+01:00",
    },
    {
      id: 2,
      name: "Sidorov Al",
      city: "Moskow",
      salary: 200000,
      match_point: 3.5,
      created_at: "2025-01-22T09:00:00+01:00",
    },
  ],
  scoring: [
    {
      id: 3,
      name: "Ivanov Ivan",
      city: "Moskow",
      salary: 100000,
      match_point: 7.5,
      created_at: "2025-01-22T09:00:00+01:00",
    },
    {
      id: 4,
      name: "Sidorov Al",
      city: "Moskow",
      salary: 200000,
      match_point: 1.5,
      created_at: "2025-01-22T09:00:00+01:00",
    },
  ],
};

export type TMatchInfo = {
  id: number;
  type: "sourcing" | "application";
  match_status: EMatchStatus;
  match_point: number;
  match_summary: string;
  cv: {
    id: number;
    name: string;
    role: string;
    status: ECvStatus;
    link: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    skills: string; //'react,node js,css'
    bio: string;
    total_experience: string;
    last_experience: string;
  };
  comments: {
    id: number;
    author: string;
    created_at: string; //iso;
    value: string;
  }[];
};

export const mockMatchInfo: TMatchInfo = {
  id: 1,
  type: "sourcing",
  match_status: EMatchStatus.SCORING,
  match_point: 8.5,
  match_summary:
    "Candidate has strong frontend experience with React and Node.js. Candidate has strong frontend experience with React and Node.js. Candidate has strong frontend experience with React and Node.js. Candidate has strong frontend experience with React and Node.js.",

  cv: {
    id: 101,
    name: "John Doe",
    role: "frontend developer",
    status: ECvStatus.LOOKING,
    link: "https://example.com/cv/johndoe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    summary:
      "Experienced Frontend Developer with expertise in React, Node.js, and CSS. Experienced Frontend Developer with expertise in React, Node.js, and CSS. Experienced Frontend Developer with expertise in React, Node.js, and CSS.",
    skills: "react,node js,css",
    bio: "Passionate about building scalable web applications and enhancing user experience. Passionate about building scalable web applications and enhancing user experience. Passionate about building scalable web applications and enhancing user experience.",
    total_experience: "январь 2019 - февраль 2025",
    last_experience: "март 2022 - февраль 2025",
  },

  comments: [
    {
      id: 201,
      author: "Recruiter Jane",
      created_at: "2025-02-01T10:15:30.000Z",
      value:
        "Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview.",
    },
    {
      id: 202,
      author: "Hiring Manager Mike",
      created_at: new Date().toISOString(),
      value:
        "Good experience, but needs more backend exposure. Good experience, but needs more backend exposure. Good experience, but needs more backend exposure.",
    },
    {
      id: 203,
      author: "Recruiter Jane",
      created_at: "2025-02-01T10:15:30.000Z",
      value:
        "Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview.",
    },
    {
      id: 204,
      author: "Hiring Manager Mike",
      created_at: new Date().toISOString(),
      value:
        "Good experience, but needs more backend exposure. Good experience, but needs more backend exposure. Good experience, but needs more backend exposure.",
    },
    {
      id: 205,
      author: "Recruiter Jane",
      created_at: "2025-02-01T10:15:30.000Z",
      value:
        "Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview.",
    },
    {
      id: 206,
      author: "Hiring Manager Mike",
      created_at: new Date().toISOString(),
      value:
        "Good experience, but needs more backend exposure. Good experience, but needs more backend exposure. Good experience, but needs more backend exposure.",
    },
    {
      id: 207,
      author: "Recruiter Jane",
      created_at: "2025-02-01T10:15:30.000Z",
      value:
        "Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview. Candidate looks promising. Schedule an interview.",
    },
    {
      id: 208,
      author: "Hiring Manager Mike",
      created_at: new Date().toISOString(),
      value:
        "Good experience, but needs more backend exposure. Good experience, but needs more backend exposure. Good experience, but needs more backend exposure.",
    },
  ],
};

//STATUSES

export const vacanciesStatuses = [
  {
    id: "3d58de36-73d7-418f-82c9-9b674cfe172d",
    value: EVacancyStatus.SETTING,
    order: 1,
  },
  {
    id: "7ce14132-cd8d-40f6-bb5b-77caf3e70abd",
    value: EVacancyStatus.WORK,
    order: 2,
  },
  {
    id: "f2c900ec-63fd-4e31-945e-a12cfecb8125",
    value: EVacancyStatus.WAIT,
    order: 3,
  },
  {
    id: "148f9446-4339-44b5-b5cb-301c32bc5582",
    value: EVacancyStatus.PAUSE,
    order: 4,
  },
];
