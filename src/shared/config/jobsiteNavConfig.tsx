import { Circle } from "lucide-react";
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
    routeName: 'Компании',
    href: '/companies'
  },

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
    routeName: "Мои вакансии",
    href: '/profile/vacancies',
    icon: <Circle className="h-[2cap] w-[2cap] inline mr-3 group-hover/icon:stroke-primary transition-colors" />
  },
  {
    routeName: 'Статистика и аналитика',
    href: '/profile/analytics',
    icon: <Circle className="h-[2cap] w-[2cap] inline mr-3 group-hover/icon:stroke-primary transition-colors" />
  },
  {
    routeName: 'Настройки',
    href: '/profile/settings',
    icon: <Circle className="h-[2cap] w-[2cap] inline mr-3 group-hover/icon:stroke-primary transition-colors" />
  },
  {
    routeName: 'Тех.поддержка',
    href: '/profile/support',
    icon: <Circle className="h-[2cap] w-[2cap] inline mr-3 group-hover/icon:stroke-primary transition-colors" />
  }
]