import { IBreadcrumbPattern } from "./types";
import { dashboardPathMapping } from "./dashboard.pathMapping";

// This mapping matches routes to breadcrumbs, displaying either static labels or dynamic names extracted from route parameters.
//Each new route should be described here for better navigation.

export const breadcrumbsMapping: IBreadcrumbPattern[] = [
  ...dashboardPathMapping
];
