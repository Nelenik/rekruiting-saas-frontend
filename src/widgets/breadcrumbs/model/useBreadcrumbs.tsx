import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { breadcrumbsMapping } from "../config/breadcrumbsMapping";


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

const defineBreadcrumbsPaths: DefineBreadcrumbsPaths = (pathname: string | null, searchParams?) => {
  const breadcrumbsPaths: { href: string; label: string | React.ReactNode }[] = [];
  if (pathname) {

    // Split the pathname into segments to build hierarchical breadcrumb paths.
    const pathSegments = pathname.split('/').slice(1);

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
  }
  return breadcrumbsPaths;
};

const useBreadcrumbs = () => {
  const pathname = usePathname() as string
  const searchParams = useSearchParams() as ReadonlyURLSearchParams

  return defineBreadcrumbsPaths(pathname, searchParams)
}

export default useBreadcrumbs;
