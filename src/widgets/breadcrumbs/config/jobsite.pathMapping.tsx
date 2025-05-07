import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";

export const jobsitePathMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/$/,
    handler: () => (
      <>
        <HomeIcon width={16} height={16} className="inline-block mr-2 -translate-y-[1.5px]" />
        <span className="align-middle">Rekru.ru</span>
      </>
    ),
    isLink: true
  },
  {
    pattern: /^\/vacancies$/,
    handler: () => "Вакансии",
    isLink: true
  },
  {
    pattern: /^\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routevacancyId
    handler: (searchParams) => {
      const name = searchParams?.get("name") || "Название вакансии";
      return decodeURIComponent(name);
    },
    isLink: true
  },
  {
    pattern: /^\/internships$/,
    handler: () => "Стажировки",
    isLink: true
  },
  {
    pattern: /^\/startups$/,
    handler: () => "Стартапы",
    isLink: true
  },
  {
    pattern: /^\/cofounders$/,
    handler: () => "Кофаундеры",
    isLink: true
  },
  {
    pattern: /^\/profile$/,
    handler: () => "Кабинет",
    isLink: true
  },
]