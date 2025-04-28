import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { CompanySwitcher } from "@/features/company-switcher";

export const dashboardPathMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => (
      <HomeIcon width={16} height={16} />
    ),
  },
  {
    pattern: /^\/dashboard\/([^\/]+)$/,
    handler: () => <CompanySwitcher />,
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies$/,
    handler: () => "Вакансии",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reports$/,
    handler: () => "Отчеты",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/companies$/,
    handler: () => "Настройки: Компании",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/users$/,
    handler: () => "Настройки: Пользователи",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reserve$/,
    handler: () => "Резюме: Резерв",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/search$/,
    handler: () => "Резюме: Поиск",
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/matchDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and matchId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Мэтч";
      return decodeURIComponent(name);
    },
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancyDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/cvDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and cvId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Резюме";
      return decodeURIComponent(name);
    },
  },
];