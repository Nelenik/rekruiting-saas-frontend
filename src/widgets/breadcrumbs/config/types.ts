import { ReadonlyURLSearchParams } from "next/navigation";

export interface IBreadcrumbPattern {
  pattern: RegExp;
  handler: (searchParams?: ReadonlyURLSearchParams) => string | React.ReactNode;
  isLink: boolean;
}
