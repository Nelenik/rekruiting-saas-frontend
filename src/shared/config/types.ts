import { ReactNode } from "react";

export type TNavConfig = {
  routeName: string;
  href: string;
  icon?: ReactNode;
  subMenu?: TNavConfig[];
};
