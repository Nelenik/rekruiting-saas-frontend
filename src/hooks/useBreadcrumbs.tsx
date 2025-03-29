import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import HomeIcon from '@/assets/icons/home.svg?rc';
import CompanySwitcher from "@/components/navigation/nav_elmts/CompanySwitcher";

// This mapping matches routes to breadcrumbs, displaying either static labels or dynamic names extracted from route parameters.
//Each new route should be described here for better navigation.

interface IBreadcrumbPattern {
  pattern: RegExp,
  handler: (searchParams?: ReadonlyURLSearchParams) => string | React.ReactNode
}

const breadcrumbsMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => (
      <HomeIcon width={16} height={16} className="-translate-y-0.5" />
    ),
  },
  {
    pattern: /^\/dashboard\/([^\/]+)$/,
    handler: () => (
      <CompanySwitcher />
    ),
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies$/,
    handler: () => 'Вакансии',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reports$/,
    handler: () => 'Отчеты',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get('name') || 'Название вакансии'
      return decodeURIComponent(name)
    }
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/companies$/,
    handler: () => 'Настройки: Компании',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/users$/,
    handler: () => 'Настройки: Пользователи',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/reserve$/,
    handler: () => 'Резюме: Резерв',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/search$/,
    handler: () => 'Резюме: Поиск',
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/candidateDetails\/([^\/]+)$/,//([^\/]+) this part of the regexp for dynamic part of routes - candidateId
    handler: (searchParams) => {
      const name = searchParams?.get('name') || 'Кандидат'
      return decodeURIComponent(name)
    }
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/vacancyDetails\/([^\/]+)$/,//([^\/]+) this part of the regexp for dynamic part of routes - vacancyId
    handler: (searchParams) => {
      const name = searchParams?.get('name') || 'Название вакансии'
      return decodeURIComponent(name)
    }
  },
  {
    pattern: /^\/dashboard\/([^\/]+)\/cvDetails\/([^\/]+)$/,//([^\/]+) this part of the regexp for dynamic part of routes - cvId
    handler: (searchParams) => {
      const name = searchParams?.get('name') || 'Резюме'
      return decodeURIComponent(name)
    }
  },
]

type DefineBreadcrumbsPaths = (pathname: string, searchParams: ReadonlyURLSearchParams) => { href: string, label: string | React.ReactNode }[]

/**
 * Generates breadcrumb paths for the current route, based on the provided pathname and search parameters.
 * Each breadcrumb includes an `href` (URL) and a `label` (displayed text or React component).
 *
 * @param pathname - The current pathname of the application (e.g., `/dashboard/vacancies/123`). It is used to determine the hierarchical structure of breadcrumbs.
 * 
 * @param searchParams - A `ReadonlyURLSearchParams` instance that provides access to query parameters. Used for extracting dynamic values like `vacancyName` or `resumeName`.
 *
 * @returns An array of breadcrumb objects, where each object contains:
 *     - `href`: The URL segment corresponding to the breadcrumb (e.g., `/dashboard/vacancies`).
 *     - `label`: The displayed text or React component for the breadcrumb, as defined in the `breadcrumbsMapping`.
 */

const defineBreadcrumbsPaths: DefineBreadcrumbsPaths = (pathname, searchParams) => {
  // Split the pathname into segments to build hierarchical breadcrumb paths.
  const pathSegments = pathname.split('/').slice(1);
  const breadcrumbsPaths: { href: string; label: string | React.ReactNode }[] =
    [];

  // Iterate through each path segment to build breadcrumb paths and match them with patterns.
  pathSegments.forEach((_, i) => {
    // Create the current path by joining segments up to the current index.
    const currentPath = `/${pathSegments.slice(0, i + 1).join('/')}`;
    // Find a matching pattern in the breadcrumbs mapping for the current path.
    const mathcedPattern = breadcrumbsMapping.find((el) =>
      el.pattern.test(currentPath)
    );
    // If a matching pattern is found, add it to the breadcrumb paths.
    if (mathcedPattern) {
      breadcrumbsPaths.push({
        href: currentPath,
        label: mathcedPattern.handler(searchParams)
      })
    }
  });
  return breadcrumbsPaths;
};

const useBreadcrumbs = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return defineBreadcrumbsPaths(pathname, searchParams)
}

export default useBreadcrumbs;
