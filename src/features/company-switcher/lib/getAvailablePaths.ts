/**
 * Retrieves all available paths for a given company.
 *
 * This function generates an array of paths from the sidebar configuration
 * of the specified company. It includes both top-level routes and
 * sub-menu routes if they exist.
 *
 * @param {string} newCompanyId - The ID of the company for which to get the available paths.
 * @returns {string[]} An array of available paths for the given company.
 */

import { createSidebarConfig } from "@/shared/config/sidebarConfig";

export const getAvailablePaths = (newCompanyId: string): string[] => {
  return createSidebarConfig(newCompanyId).reduce((acc: string[], route) => {
    if (route.href) acc.push(route.href);
    if (route.subMenu)
      acc.push(...route.subMenu.map((subroute) => subroute.href));
    return acc;
  }, []);
};
