import { HomeIcon, Building2, Search, Star, BriefcaseBusiness, Users, FileText, FileUser, Settings } from "lucide-react";
import { IDashboardRoute } from "../types/navigation";

/**
 * This is the configuration for the admin navigation menu.
 * - Each object represents a navigation item with the following properties:
 *   - `routeName`: The display name of the route.
 *   - `href`: The link to navigate to. If set to "javascript:void(0)", the link is inactive (used for group titles).
 *   - `icon`: The React component for the item's icon.
 *   - `subMenu` (optional): An array of child items for dropdowns or grouped links, following the same structure as the parent.
 * 
 * Example:
 * - Top-level items like "Главная" and "Вакансии" navigate directly to their `href`.
 * - Items with `subMenu` (e.g., "Настройки") act as group titles and contain nested links.
 */

export const sidebarConfig: IDashboardRoute[] = [
  {
    routeName: "Главная",
    href: "/dashboard",
    icon: <HomeIcon className="[&>*]:stroke-sidebar-foreground" />,
  },

  {
    routeName: "Вакансии",
    href: "/dashboard/vacancies",
    icon: <Building2 className="[&>*]:stroke-sidebar-foreground" />,
  },

  {
    routeName: 'Резюме',
    href: "javascript:void(0)",//makes link inactive, for group title
    icon: <FileUser className="[&>*]:stroke-sidebar-foreground" />,
    subMenu: [
      {
        routeName: "Поиск",
        href: "/dashboard/search",
        icon: <Search className="[&>*]:stroke-sidebar-foreground" />,
      },
      {
        routeName: "Резерв",
        href: "/dashboard/reserve",
        icon: <Star className="[&>*]:stroke-sidebar-foreground" />,
      },
    ]
  },
  {
    routeName: "Отчеты",
    href: "/dashboard/reports",
    icon: <FileText className="[&>*]:stroke-sidebar-foreground" />,
  },
  {
    routeName: 'Настройки',
    href: 'javascript:void(0)',
    icon: <Settings className="[&>*]:stroke-sidebar-foreground" />,
    subMenu: [
      {
        routeName: "Компании",
        href: "/dashboard/companies",
        icon: <BriefcaseBusiness className="[&>*]:stroke-sidebar-foreground" />,
      },
      {
        routeName: "Пользователи",
        href: "/dashboard/users",
        icon: <Users className="[&>*]:stroke-sidebar-foreground" />,
      },
    ]
  }
];
