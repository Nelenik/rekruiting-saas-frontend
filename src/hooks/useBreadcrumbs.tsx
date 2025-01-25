import { useParams, usePathname } from 'next/navigation';
import HomeIcon from '@/assets/icons/home.svg?rc';
import { Params } from 'next/dist/server/request/params';

// This mapping matches routes to breadcrumbs, displaying either static labels or dynamic names extracted from route parameters.
//Each new route should be described here for better navigation.

interface IBreadcrumbPattern {
  pattern: RegExp;
  handler: (params?: Params) => string | React.ReactNode;
}

const breadcrumbsMapping: IBreadcrumbPattern[] = [
  {
    pattern: /^\/dashboard$/,
    handler: () => (
      <HomeIcon width={16} height={16} className="-translate-y-0.5" />
    ),
  },
  {
    pattern: /^\/dashboard\/vacancies$/,
    handler: () => 'Вакансии',
  },
  {
    pattern: /^\/dashboard\/reports$/,
    handler: () => 'Отчеты',
  },
  {
    pattern: /^\/dashboard\/settings$/,
    handler: () => 'Настройки',
  },
  {
    pattern: /^\/dashboard\/vacancies\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - vacancyDetails
    handler: (params = {}) => {
      const { vacancyDetails } = params;

      // If we use catch-all segments, the params object may contain fields with an array of strings.
      // Here, we check if the field exists and explicitly tell TypeScript that we expect a string.

      if (!vacancyDetails || typeof vacancyDetails !== 'string') {
        return 'Название вакансии';
      }

      //vacancyDetails has the format "vacancy name-vacancy id." To extract the name for the breadcrumbs, we split the provided parameter.
      const splitted = vacancyDetails.split('-');
      return decodeURIComponent(splitted[0]);
    },
  },
  {
    pattern: /^\/dashboard\/resume\/([^\/]+)$/, //([^\/]+) this part of the regexp for dynamic part of routes - resumeDetails
    handler: (params = {}) => {
      const { resumeDetails } = params;
      if (!resumeDetails || typeof resumeDetails !== 'string') return 'Резюме';
      const splitted = resumeDetails.split('-');
      return decodeURIComponent(splitted[0]);
    },
  },
];
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

type DefineBreadcrumbsPaths = (
  pathname: string,
  params: Params
) => { href: string; label: string | React.ReactNode }[];

const defineBreadcrumbsPaths: DefineBreadcrumbsPaths = (pathname, params) => {
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
        label: mathcedPattern.handler(params),
      });
    }
  });
  return breadcrumbsPaths;
};

const useBreadcrumbs = () => {
  const pathname = usePathname();
  const params = useParams();

  return defineBreadcrumbsPaths(pathname, params);
};

export default useBreadcrumbs;
