import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { CompanySwitcher } from "@/features/company-switcher";

export const rekrutaiPathMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => (
      <HomeIcon width={16} height={16} />
    ),
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)$/,
    handler: () => <CompanySwitcher />,
    isLink: false
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies$/,
    handler: () => "Вакансии",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reports$/,
    handler: () => "Отчеты",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/companies$/,
    handler: () => "Настройки: Компании",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/users$/,
    handler: () => "Настройки: Пользователи",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reserve$/,
    handler: () => "Резюме: Резерв",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/search$/,
    handler: () => "Резюме: Поиск",
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/matchDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and matchId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Мэтч";
      return decodeURIComponent(name);
    },
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancyDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
    isLink: true
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/cvDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes -companyId and cvId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Резюме";
      return decodeURIComponent(name);
    },
    isLink: true
  },
];