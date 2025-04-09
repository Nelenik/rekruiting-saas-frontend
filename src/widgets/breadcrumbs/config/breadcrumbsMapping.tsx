import HomeIcon from "@/assets/icons/home.svg?rc";
import { CompanySwitcher } from "@/features/company-switcher";
// This mapping matches routes to breadcrumbs, displaying either static labels or dynamic names extracted from route parameters.
//Each new route should be described here for better navigation.

import { ReadonlyURLSearchParams } from "next/navigation";

interface IBreadcrumbPattern {
  pattern: RegExp;
  handler: (searchParams?: ReadonlyURLSearchParams) => string | React.ReactNode;
}

export const breadcrumbsMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => (
      <HomeIcon width={16} height={16} className="-translate-y-0.5" />
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
    pattern: /^\/dashboard\/([^\/]+)\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - vacancyId
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
    pattern: /^\/dashboard\/([^\/]+)\/matchDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - matchId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Мэтч";
      return decodeURIComponent(name);
    },
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancyDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/cvDetails\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - cvId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Резюме";
      return decodeURIComponent(name);
    },
  },
];
