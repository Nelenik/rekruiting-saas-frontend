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

// export const mockCompanies: TCompany[] = [
//   {
//     id: 1,
//     name: "RekrutAI",
//     full_name: "RekrutAI",
//     description: null,
//     inn: "1234567895",
//     rate: "Первый тариф",
//     rate_at: "2025-01-24T20:45:00+01:00",
//   },
//   {
//     id: 2,
//     name: "Google",
//     full_name: "Google",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
//     inn: "1234567895",
//     rate: "Второй тариф",
//     rate_at: "2025-01-24T20:45:00+01:00",
//   },
//   {
//     id: 3,
//     name: "Yandex",
//     full_name: "Yandex",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
//     inn: "1234567895",
//     rate: "Третий тариф",
//     rate_at: "2025-01-24T20:45:00+01:00",
//   },
//   {
//     id: 4,
//     name: "Microsoft",
//     full_name: "Microsoft Corporation",
//     description:
//       "Microsoft is a multinational technology company that develops software, hardware, and services.",
//     inn: "9876543210",
//     rate: "Третий тариф",
//     rate_at: "2025-01-25T15:30:00+01:00",
//   },
//   {
//     id: 5,
//     name: "Apple",
//     full_name: "Apple Inc.",
//     description:
//       "Apple designs, manufactures, and markets consumer electronics, software, and online services.",
//     inn: "1122334455",
//     rate: "Третий тариф",
//     rate_at: "2025-01-26T10:15:00+01:00",
//   },
//   {
//     id: 6,
//     name: "Tesla",
//     full_name: "Tesla, Inc.",
//     description:
//       "Tesla is an electric vehicle and clean energy company known for its innovative products.",
//     inn: "9988776655",
//     rate: "Третий тариф",
//     rate_at: "2025-01-27T14:00:00+01:00",
//   },
// ];

// export const mockResume: TResume[] = [
//   {
//     id: 1,
//     name: "Frontend-разработчик",
//     work_status: "open",
//     experience_months: 36,
//     salary: 150000,
//     candy_name: "Иван",
//     candy_phone: "+7 900 123-45-67",
//     candy_tg: "@ivan_dev",
//     candy_email: "ivan.petrov@example.com",
//     candy_location: "Москва",
//     link: "https://linkedin.com/in/ivanpetrov",
//     bio: "Разработчик с опытом работы в React и Node.js",
//     experience_raw:
//       "3 года разработки на JavaScript, React, TypeScript. Работал в стартапах и аутсорсе.",
//   },
//   {
//     id: 2,
//     name: "Fullstack-разработчик",
//     work_status: "open",
//     experience_months: 48,
//     salary: 180000,
//     candy_name: "Анна",
//     candy_phone: "+7 921 456-78-90",
//     candy_tg: "@anna_smirnova",
//     candy_email: "anna.smirnova@example.com",
//     candy_location: "Санкт-Петербург",
//     link: "https://github.com/annasmirnova",
//     bio: "Fullstack-разработчик с уклоном в бекенд",
//     experience_raw:
//       "4 года работы с Node.js, NestJS, PostgreSQL. Опыт в DevOps и Docker.",
//   },
//   {
//     id: 3,
//     name: "Frontend-разработчик",
//     work_status: "open",
//     experience_months: 24,
//     salary: 120000,
//     candy_name: "Дмитрий",
//     candy_phone: "+7 965 987-65-43",
//     candy_tg: "@dmitry_k",
//     candy_email: "dmitry.k@example.com",
//     candy_location: "Новосибирск",
//     link: "https://portfolio.dmitry.dev",
//     bio: "Frontend-разработчик с опытом в Vue и Svelte",
//     experience_raw:
//       "2 года работы с Vue.js, Svelte, Tailwind CSS. Создание UI-компонентов и анимаций.",
//   },
//   {
//     id: 4,
//     name: "Backend-разработчик",
//     work_status: "open",
//     experience_months: 60,
//     salary: 200000,
//     candy_name: "Егор",
//     candy_phone: "+7 916 543-21-09",
//     candy_tg: "@egor_backend",
//     candy_email: "egor.backend@example.com",
//     candy_location: "Москва",
//     link: "https://github.com/egorbackend",
//     bio: "Опытный backend-разработчик, специализирующийся на Go и PostgreSQL",
//     experience_raw:
//       "5 лет работы с Go, PostgreSQL, Kafka, Redis. Опыт построения высоконагруженных систем.",
//   },
//   {
//     id: 5,
//     name: "Mobile-разработчик",
//     work_status: "open",
//     experience_months: 36,
//     salary: 160000,
//     candy_name: "Ольга",
//     candy_phone: "+7 915 678-90-12",
//     candy_tg: "@olga_mobile",
//     candy_email: "olga.mobile@example.com",
//     candy_location: "Казань",
//     link: "https://olga.dev",
//     bio: "Мобильный разработчик с опытом в React Native и Flutter",
//     experience_raw:
//       "3 года работы с React Native, Flutter, Firebase. Разработка кроссплатформенных мобильных приложений.",
//   },
//   {
//     id: 6,
//     name: "Data Scientist",
//     work_status: "open",
//     experience_months: 48,
//     salary: 220000,
//     candy_name: "Максим",
//     candy_phone: "+7 929 876-54-32",
//     candy_tg: "@max_ds",
//     candy_email: "maxim.ds@example.com",
//     candy_location: "Екатеринбург",
//     link: "https://linkedin.com/in/maxds",
//     bio: "Специалист по анализу данных и машинному обучению",
//     experience_raw:
//       "4 года работы в ML и Data Science. Опыт в Python, TensorFlow, PyTorch, обработке данных и нейросетях.",
//   },
// ];

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
