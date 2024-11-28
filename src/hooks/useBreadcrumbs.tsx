import { useParams, usePathname } from "next/navigation";
import HomeIcon from '@/assets/icons/home.svg?rc';
import { Params } from "@/types/common";

// This mapping matches routes to breadcrumbs, displaying either static labels or dynamic names extracted from route parameters. 
//Each new route should be described here for better navigation.
//This approach does not take into account catch-all segments

const breadcrumbsMapping: { pattern: RegExp, handler: (params?: Params) => string | React.ReactNode }[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => <HomeIcon width={16} height={16} className="-translate-y-0.5" />
  },
  {
    pattern: /^\/dashboard\/vacancies$/,
    handler: () => 'Вакансии'
  },
  {
    pattern: /^\/dashboard\/reports$/,
    handler: () => 'Отчеты'
  },
  {
    pattern: /^\/dashboard\/settings$/,
    handler: () => 'Настройки'
  },
  {
    pattern: /^\/dashboard\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - vacancyId
    handler: (params = {}) => {
      const { vacancyId } = params;
      if (!vacancyId) { return 'Название вакансии' }
      //vacancyId has the format "vacancy name-vacancy id." To extract the name for the breadcrumbs, we split the provided parameter.
      const splitted = vacancyId.split('-')
      return decodeURIComponent(splitted[0])
    }
  },
  {
    pattern: /^\/dashboard\/resume\/([^\/]+)$/,//([^\/]+) this part of the regexp for dynamic part of routes - resumeId
    handler: (params = {}) => {
      const { resumeId } = params
      if (!resumeId) return 'Резюме'
      const splitted = resumeId.split('-')
      return decodeURIComponent(splitted[0])
    }
  },
]
/**
 * 
 * Generates an array of breadcrumb paths based on the given `pathname` and navigation parameters.
 *
 * @param {string} pathname - The current path as a string (e.g., "/home/products/item").
 * @param {ParamsNextNavigation} params - Parameters for navigation, used to dynamically generate breadcrumb labels.
 * @returns An array of breadcrumb objects, where each object contains:
 *   - `href`: The URL segment up to that breadcrumb.
 *   - `label`: The label for the breadcrumb, which can be a string or a ReactNode.
 * @example
 *  const pathname = "/dashboard/vacancies/Manager-125";
 *  const params = {vacancyId: 'Manager-125'}
 *
 * const breadcrumbs = defineBreadcrumbsPaths(pathname, params);
 * // Output:
 * // [
 * //   { href: "dashboard", label: <HomeIcon width={16} height={16} className="-translate-y-0.5" /> },
 * //   { href: "dashboard/vacancies", label: "Вакансии" },
 * //   { href: "dashboard/vacancies/Manager-125", label: "Manager" },
 * // ]
 * 
 */
const defineBreadcrumbsPaths = (pathname: string, params: Params): { href: string, label: string | React.ReactNode }[] => {
  //break pathname into parts for breadcrumbs
  const pathSegments = pathname.split('/').slice(1)
  const breadcrumbsPaths: { href: string, label: string | React.ReactNode }[] = []

  pathSegments.forEach((_, i) => {
    const currentPath = `/${pathSegments.slice(0, i + 1).join('/')}`
    const mathcedPattern = breadcrumbsMapping.find(el => el.pattern.test(currentPath))
    if (mathcedPattern) {
      breadcrumbsPaths.push({
        href: currentPath,
        label: mathcedPattern.handler(params)
      })
    }
  })
  return breadcrumbsPaths
}

const useBreadcrumbs = () => {
  const pathname = usePathname()
  const params = useParams()

  return defineBreadcrumbsPaths(pathname, params)
}

export default useBreadcrumbs;