import {
  EVacancyStatus,
  TCandidateShort,
  TVacancy,
  TVacancyShort,
} from "@/shared/types";
import { TCompany } from "@/shared/types/companies";
import { TResume } from "@/shared/types/resume";
import { IUser } from "@/shared/types/user";

export const mockUser: IUser = {
  id: 1,
  name: "Иванов Иван",
  email: "test@mail.com",
};

export const mockCompanies: TCompany[] = [
  {
    id: 1,
    name: "RekrutAI",
    full_name: "RekrutAI",
    description: null,
    inn: "1234567895",
    rate: "Первый тариф",
    rate_at: "2025-01-24T20:45:00+01:00",
  },
  {
    id: 2,
    name: "Google",
    full_name: "Google",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    inn: "1234567895",
    rate: "Второй тариф",
    rate_at: "2025-01-24T20:45:00+01:00",
  },
  {
    id: 3,
    name: "Yandex",
    full_name: "Yandex",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    inn: "1234567895",
    rate: "Третий тариф",
    rate_at: "2025-01-24T20:45:00+01:00",
  },
  {
    id: 4,
    name: "Microsoft",
    full_name: "Microsoft Corporation",
    description:
      "Microsoft is a multinational technology company that develops software, hardware, and services.",
    inn: "9876543210",
    rate: "Третий тариф",
    rate_at: "2025-01-25T15:30:00+01:00",
  },
  {
    id: 5,
    name: "Apple",
    full_name: "Apple Inc.",
    description:
      "Apple designs, manufactures, and markets consumer electronics, software, and online services.",
    inn: "1122334455",
    rate: "Третий тариф",
    rate_at: "2025-01-26T10:15:00+01:00",
  },
  {
    id: 6,
    name: "Tesla",
    full_name: "Tesla, Inc.",
    description:
      "Tesla is an electric vehicle and clean energy company known for its innovative products.",
    inn: "9988776655",
    rate: "Третий тариф",
    rate_at: "2025-01-27T14:00:00+01:00",
  },
];

export const mockResume: TResume[] = [
  {
    id: 1,
    name: "Иван Петров",
    experience_months: 36,
    salary: 150000,
    candy_name: "Иван",
    candy_phone: "+7 900 123-45-67",
    candy_tg: "@ivan_dev",
    candy_email: "ivan.petrov@example.com",
    candy_location: "Москва",
    link: "https://linkedin.com/in/ivanpetrov",
    bio: "Разработчик с опытом работы в React и Node.js",
    experience_raw:
      "3 года разработки на JavaScript, React, TypeScript. Работал в стартапах и аутсорсе.",
  },
  {
    id: 2,
    name: "Анна Смирнова",
    experience_months: 48,
    salary: 180000,
    candy_name: "Анна",
    candy_phone: "+7 921 456-78-90",
    candy_tg: "@anna_smirnova",
    candy_email: "anna.smirnova@example.com",
    candy_location: "Санкт-Петербург",
    link: "https://github.com/annasmirnova",
    bio: "Fullstack-разработчик с уклоном в бекенд",
    experience_raw:
      "4 года работы с Node.js, NestJS, PostgreSQL. Опыт в DevOps и Docker.",
  },
  {
    id: 3,
    name: "Дмитрий Кузнецов",
    experience_months: 24,
    salary: 120000,
    candy_name: "Дмитрий",
    candy_phone: "+7 965 987-65-43",
    candy_tg: "@dmitry_k",
    candy_email: "dmitry.k@example.com",
    candy_location: "Новосибирск",
    link: "https://portfolio.dmitry.dev",
    bio: "Frontend-разработчик с опытом в Vue и Svelte",
    experience_raw:
      "2 года работы с Vue.js, Svelte, Tailwind CSS. Создание UI-компонентов и анимаций.",
  },
];

/*--------------- */
// export const mockVacancies: TVacancyShort[] = [
//   {
//     id: 1,
//     name: "Frontend Dev",
//     status: EVacancyStatus.WORK,
//     created_at: "2025-01-22T09:00:00+01:00",
//   },
//   {
//     id: 2,
//     name: "Backend Dev",
//     status: EVacancyStatus.PAUSE,
//     created_at: "2025-01-23T13:30:00+01:00",
//   },
//   {
//     id: 3,
//     name: "Quality Assurance",
//     status: EVacancyStatus.SETTING,
//     created_at: "2025-01-24T20:45:00+01:00",
//   },
// ];

// export const mockVacancy: TVacancy = {
//   id: 1,
//   name: "Frontend Dev",
//   salary_from: 100000,
//   salary_to: 110000,
//   salary_candy: 120000,
//   salary_market: 100000,
//   status: EVacancyStatus.WORK,
//   match_count: 18,
//   match_hot_count: 90,
//   created_at: "2025-01-22T09:00:00+01:00",
// };

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
