import { ParamData, Path } from "path-to-regexp";

export interface IBreadcrumbPattern {
  pattern: Path | Path[];
  handler: (params?: ParamData | null) => string | React.ReactNode;
  isLink: boolean;
}
