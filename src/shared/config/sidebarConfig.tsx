import { HomeIcon, Building2, Search, Star, BriefcaseBusiness, Users, FileText, FileUser, Settings } from "lucide-react";
import { IDashboardRoute } from "../types/navigation";

/**
* Creates a configuration array for the dashboard sidebar navigation
* 
* @description
* - Each object represents a navigation item with the following properties:
 *   - `routeName`: The display name of the route.
 *   - `href`: The link to navigate to. If set to empty string, the link is inactive (used for group titles).
 *   - `icon`: The React component for the item's icon.
 *   - `subMenu` (optional): An array of child items for dropdowns or grouped links, following the same structure as the parent.
 * 
 * Example:
 * - Top-level items like "Главная" and "Вакансии" navigate directly to their `href`.
 * - Items with `subMenu` (e.g., "Настройки") act as group titles and contain nested links.
* 
* @param companyId - The unique identifier of the company to generate routes for
* @returns An array of {@link IDashboardRoute} objects representing the sidebar navigation structure
* 
* @example
* ```tsx
* const sidebarRoutes = createSidebarConfig('company-123');
* // Returns navigation config with paths like:
* // - /dashboard/company-123
* // - /dashboard/company-123/vacancies
* // etc.
* ```
*/

export const createSidebarConfig = (companyId: string): IDashboardRoute[] => [
  {
    routeName: "Главная",
    href: `/dashboard/${companyId}`,
    icon: <HomeIcon className="[&>*]:stroke-sidebar-foreground" />,
  },

  {
    routeName: "Вакансии",
    href: `/dashboard/${companyId}/vacancies`,
    icon: <Building2 className="[&>*]:stroke-sidebar-foreground" />,
  },

  {
    routeName: 'Резюме',
    href: "",
    icon: <FileUser className="[&>*]:stroke-sidebar-foreground" />,
    subMenu: [
      {
        routeName: "Поиск",
        href: `/dashboard/${companyId}/search`,
        icon: <Search className="[&>*]:stroke-sidebar-foreground" />,
      },
      {
        routeName: "Резерв",
        href: `/dashboard/${companyId}/reserve`,
        icon: <Star className="[&>*]:stroke-sidebar-foreground" />,
      },
    ]
  },
  {
    routeName: "Отчеты",
    href: `/dashboard/${companyId}/reports`,
    icon: <FileText className="[&>*]:stroke-sidebar-foreground" />,
  },
  {
    routeName: 'Настройки',
    href: '',
    icon: <Settings className="[&>*]:stroke-sidebar-foreground" />,
    subMenu: [
      {
        routeName: "Компании",
        href: `/dashboard/${companyId}/companies`,
        icon: <BriefcaseBusiness className="[&>*]:stroke-sidebar-foreground" />,
      },
      {
        routeName: "Пользователи",
        href: `/dashboard/${companyId}/users`,
        icon: <Users className="[&>*]:stroke-sidebar-foreground" />,
      },
    ]
  }
];
