/**
 * Extracts a new path by replacing `activeCompanyId` with `newCompanyId` and validating available paths.
 *
 * @param activeCompanyId - The identifier of the currently active company.
 * @param newCompanyId - The identifier of the new company.
 * @param currentPathname - The current URL path.
 * @returns The new path corresponding to `newCompanyId`, or the default `/dashboard/{newCompanyId}` if no match is found.
 */

import { getAvailablePaths } from "./getAvailablePaths";

export const extractNewPath = (
  activeCompanyId: string,
  newCompanyId: string,
  currentPathname: string
): string => {
  const availablePathes = getAvailablePaths(newCompanyId);
  const currentPath = currentPathname.replace(
    String(activeCompanyId),
    newCompanyId
  );

  const match =
    availablePathes
      .filter((path) => currentPath.startsWith(path))
      .sort((a, b) => b.length - a.length)[0] || `/dashboard/${newCompanyId}`;
  return match;
};
