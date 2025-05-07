// import { IBreadcrumbPattern } from "./types";
import { rekrutaiPathMapping } from "./rekrutai.pathMapping";
import { jobsitePathMapping } from "./jobsite.pathMapping";

/**
 * Returns the breadcrumb mapping configuration for a given tenant.
 * 
 * This mapping defines how URL paths should be translated into breadcrumb items
 * for navigation purposes. It selects the appropriate mapping based on the tenant's
 * host name, which is determined from environment variables.
 *
 * Each mapping contains route patterns that correspond to breadcrumb items
 * with static or dynamic labels.
 *
 * @param tenant - The tenant identifier, typically the hostname used to determine the app context.
 * @returns An array of breadcrumb pattern objects specific to the tenant, or an empty array if none is found.
 *
 * @example
 * const breadcrumbs = getBreadcrumbMapping("rekrutai.example.com");
 */
export const getBreadcrumbMapping = (tenat: string) => {
  // Get the allowed hosts from environment variables.
  // These are the expected hosts for the two sites: rekrutai and jobsite.
  const rekrutaiHost = process.env.NEXT_PUBLIC_REKRUTAI_HOST || "";
  const jobsiteHost = process.env.NEXT_PUBLIC_JOBSITE_HOST || "";
  const hostMapping = {
    [rekrutaiHost]: rekrutaiPathMapping,
    [jobsiteHost]: jobsitePathMapping
  }
  return hostMapping[tenat] || []
}

// export const breadcrumbsMapping: IBreadcrumbPattern[] = [
//   ...rekrutaiPathMapping,
//   ...jobsitePathMapping
// ];
