import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "../shadcn/button";
import { ReactNode } from "react";

type TProps = {
  className?: string,
  children: ReactNode
} & ButtonProps
export const RekruCTA = ({ className, children, ...props }: TProps) => {
  return (
    <Button className={cn('w-max py-2.5 flex rounded-lg', className)} {...props}>
      {children}
    </Button>
  );
}