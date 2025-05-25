import { CircleUser, Cog, FileUser, Pin, SmilePlus } from "lucide-react";
import { TNavConfig } from "./types";

/**
 * Generates the public navigation configuration for the Jobsite main sections.
 *
 * @returns {TNavConfig[]} An array of public navigation items with route names and corresponding paths.
 *
 * @example
 * const navItems = createJobsitePublicNavConfig();
 * // navItems[0] = { routeName: "Вакансии", href: "/vacancies" }
 */
export const createJobsitePublicNavConfig = (): TNavConfig[] => [
  {
    routeName: ' Вакансии',
    href: '/vacancies'
  },
  {
    routeName: 'Стажировки',
    href: '/internships'
  },
  {
    routeName: 'Стартапы',
    href: '/startups'
  },
  {
    routeName: 'Кофаундеры',
    href: '/cofounders'
  }
]
/**
 * Generates the navigation configuration for the Jobsite user profile section.
 *
 * @returns {TNavConfig[]} An array of navigation items, each containing a route name, path, and associated icon.
 *
 * @example
 * const navItems = createJobsiteProfileNavConfig();
 * // navItems[0] = { routeName: "Личный кабинет", href: "/profile", icon: <CircleUser /> }
 */
export const createJobsiteProfileNavConfig = (): TNavConfig[] => [
  {
    routeName: 'Личный кабинет',
    href: '/profile',
    icon: <CircleUser />
  },
  {
    routeName: "Мои резюме",
    href: '/my-resumes',
    icon: <FileUser />
  },
  {
    routeName: 'Отклики',
    href: '/applications',
    icon: <SmilePlus />
  },
  {
    routeName: 'Сохраненные',
    href: '/saved',
    icon: <Pin />
  },
  {
    routeName: 'Настройки',
    href: '/settings',
    icon: <Cog />
  }
]