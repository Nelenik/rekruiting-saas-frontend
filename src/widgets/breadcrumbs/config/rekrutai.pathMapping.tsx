import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { CompanySwitcher } from "@/features/company-switcher";


export const rekrutaiPathMapping: IBreadcrumbPattern[] = [
  {
    pattern: "/dashboard",
    handler: () => (
      <HomeIcon width={16} height={16} />
    ),
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId",
    handler: () => <CompanySwitcher />,
    isLink: false
  },
  {
    pattern: "/dashboard/:companyId/vacancies",
    handler: () => "Вакансии",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/reports",
    handler: () => "Отчеты",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/vacancies/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Вакансия";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/companies",
    handler: () => "Настройки: Компании",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/users",
    handler: () => "Настройки: Пользователи",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/reserve",
    handler: () => "Резюме: Резерв",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/search",
    handler: () => "Резюме: Поиск",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/matchDetails/:matchId/:matchName",
    handler: (params) => {
      const name = params?.matchName || "Мэтч";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/vacancyDetails/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Название вакансии";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/cvDetails/:cvId/:cvName",
    handler: (params) => {
      const name = params?.cvName || "Резюме";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
];