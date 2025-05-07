import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { getBreadcrumbMapping } from "../config/breadcrumbsMapping";
import { IBreadcrumbPattern } from "../config/types";


type DefineBreadcrumbsPaths = (breadcrumbsMapping: IBreadcrumbPattern[], pathname: string, searchParams: ReadonlyURLSearchParams) => { href: string, label: string | React.ReactNode, isLink: boolean }[]

type BreadcrumbsPaths = ReturnType<DefineBreadcrumbsPaths>

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

const defineBreadcrumbsPaths: DefineBreadcrumbsPaths = (breadcrumbsMapping, pathname: string | null, searchParams?) => {
  const breadcrumbsPaths: BreadcrumbsPaths = [];

  if (pathname) {
    // Get path segments. If it's the root pathname, we use [''], otherwise we split the pathname by '/' to build hierarchical breadcrumb paths.
    let pathSegments;
    if (pathname === '/') pathSegments = ['']
    else {
      pathSegments = pathname.split('/');
    }

    // Iterate through each path segment to build breadcrumb paths and match them with patterns.
    pathSegments.forEach((_, i) => {
      // Create the current path by joining segments up to the current index.
      const currentPath = `/${pathSegments.slice(0, i + 1).join('/')}`.replace(/^\/+/, '/');
      // Find a matching pattern in the breadcrumbs mapping for the current path.
      const mathcedPattern = breadcrumbsMapping.find((el) =>
        el.pattern.test(currentPath)
      );
      // If a matching pattern is found, add it to the breadcrumb paths.
      if (mathcedPattern) {
        breadcrumbsPaths.push({
          href: currentPath,
          label: mathcedPattern.handler(searchParams),
          isLink: mathcedPattern.isLink
        })
      }
    });
  }
  return breadcrumbsPaths;
};

const useBreadcrumbs = (tenat: string) => {
  const pathname = usePathname() as string
  const searchParams = useSearchParams() as ReadonlyURLSearchParams

  // Get breadcrumbs mapping based on current tenat
  const currentMapping = getBreadcrumbMapping(tenat)

  return defineBreadcrumbsPaths(currentMapping, pathname, searchParams)
}

export default useBreadcrumbs;
