import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { identifyPubVacancyFilters } from "@/entities/vacancy/model/identifyPubVacancyFilters";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { vacancyPositionsDict } from "@/entities/vacancy";

export const jobsitePathMapping: IBreadcrumbPattern[] = [
  {
    pattern: "/",
    handler: () => (
      <>
        <HomeIcon width={16} height={16} className="inline-block mr-2 -translate-y-[1.5px]" />
        <span className="align-baseline">Rekru.ru</span>
      </>
    ),
    isLink: true
  },
  // {
  //   pattern: "/vacancies{/*filters}",
  //   handler: (params) => {
  //     if (!params || !params.filters || !params.filters.length) {
  //       return 'Все вакансии'
  //     }
  //     const { company, position } = identifyPubVacancyFilters(params.filters.slice(-1) as string[])

  //     if (company) {
  //       return `${capitalizeSentences(company)}`
  //     }
  //     if (position) {
  //       return `${vacancyPositionsDict[position] || capitalizeSentences(position)}`
  //     }

  //     return 'all'
  //   },
  //   isLink: true
  // },
  {
    pattern: "/vacancies{/:position}{/:company}",
    handler: (params) => {
      const { position, company } = params as { position: string, company: string }
      console.log('params', params)
      if (!params || !Object.keys(params).length) {
        return 'Все вакансии'
      }

      if (company) {
        return `${capitalizeSentences(company)}`
      }

      if (position && position !== 'all') {
        return `${vacancyPositionsDict[position] || capitalizeSentences(position)}`
      }

    },
    isLink: true
  },
  {
    pattern: "/vacancy/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Название вакансии";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/internships",
    handler: () => "Стажировки",
    isLink: true
  },
  {
    pattern: "/startups",
    handler: () => "Стартапы",
    isLink: true
  },
  {
    pattern: "/cofounders",
    handler: () => "Кофаундеры",
    isLink: true
  },
  {
    pattern: "/profile",
    handler: () => "Кабинет",
    isLink: true
  },
]