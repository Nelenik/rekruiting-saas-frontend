import { FC, ReactNode } from "react";
import { Badge } from "./shadcn/badge";
import { cn } from "@/shared/lib/utils";

type TProps = {
  color?: string,
  children: ReactNode,
  className?: string
}
const StatusBadge: FC<TProps> = ({ color = '#9ca3af', children, className }) => {
  return (
    <Badge
      style={{
        borderColor: color,
        color: color,
      }}
      className={cn("p-0 bg-transparent hover:bg-transparent", className,)}
    >
      {children}
    </Badge>
  );
}

export { StatusBadge };