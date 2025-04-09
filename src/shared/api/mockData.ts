import { TWorkExperience } from "@/shared/api/types/resume";
import { IUser } from "@/shared/api/types/user";

export const mockUser: IUser = {
  id: 1,
  name: "Иванов Иван",
  email: "test@mail.com",
};

export const workExperiences: TWorkExperience[] = [
  {
    id: 1,
    cv_id: 101,
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    city: "Berlin",
    post: "React Developer",
    description:
      "Разработка веб-приложений с использованием React и Next.js. Разработка веб-приложений с использованием React и Next.js.",
    created_at: "2021-06-15T12:00:00.000Z",
    updated_at: "2023-04-10T14:30:00.000Z",
    start_at: "2020-09-01T00:00:00.000Z",
    end_at: "2022-12-31T00:00:00.000Z",
    deleted_at: null,
    cv: null,
  },
  {
    id: 2,
    cv_id: 102,
    title: "Frontend Engineer",
    company: "InnovateX",
    city: "Amsterdam",
    post: "Vue.js Developer",
    description:
      "Создание UI-компонентов и оптимизация производительности приложений.",
    created_at: "2022-01-20T10:15:00.000Z",
    updated_at: "2024-02-05T09:45:00.000Z",
    start_at: "2021-05-10T00:00:00.000Z",
    end_at: null, // текущее место работы
    deleted_at: null,
    cv: null,
  },
  {
    id: 3,
    cv_id: 103,
    title: "Junior Frontend Developer",
    company: "WebCraft",
    city: "Warsaw",
    post: "JavaScript Developer",
    description: "Поддержка и разработка клиентских интерфейсов.",
    created_at: "2019-11-30T08:20:00.000Z",
    updated_at: "2021-08-17T15:10:00.000Z",
    start_at: "2019-03-15T00:00:00.000Z",
    end_at: "2020-08-31T00:00:00.000Z",
    deleted_at: null,
    cv: null,
  },
  {
    id: 4,
    cv_id: 101,
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    city: "Berlin",
    post: "React Developer",
    description:
      "Разработка веб-приложений с использованием React и Next.js. Разработка веб-приложений с использованием React и Next.js.",
    created_at: "2021-06-15T12:00:00.000Z",
    updated_at: "2023-04-10T14:30:00.000Z",
    start_at: "2020-09-01T00:00:00.000Z",
    end_at: "2022-12-31T00:00:00.000Z",
    deleted_at: null,
    cv: null,
  },
  {
    id: 5,
    cv_id: 102,
    title: "Frontend Engineer",
    company: "InnovateX",
    city: "Amsterdam",
    post: "Vue.js Developer",
    description:
      "Создание UI-компонентов и оптимизация производительности приложений.",
    created_at: "2022-01-20T10:15:00.000Z",
    updated_at: "2024-02-05T09:45:00.000Z",
    start_at: "2021-05-10T00:00:00.000Z",
    end_at: null, // текущее место работы
    deleted_at: null,
    cv: null,
  },
  {
    id: 6,
    cv_id: 103,
    title: "Junior Frontend Developer",
    company: "WebCraft",
    city: "Warsaw",
    post: "JavaScript Developer",
    description: "Поддержка и разработка клиентских интерфейсов.",
    created_at: "2019-11-30T08:20:00.000Z",
    updated_at: "2021-08-17T15:10:00.000Z",
    start_at: "2019-03-15T00:00:00.000Z",
    end_at: "2020-08-31T00:00:00.000Z",
    deleted_at: null,
    cv: null,
  },
];

export default workExperiences;
