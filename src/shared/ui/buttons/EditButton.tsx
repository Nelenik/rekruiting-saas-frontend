'use client'
import { PenLine } from "lucide-react";
import { Button, ButtonProps } from "../shadcn/button";
import { cn } from "@/shared/lib/utils";

interface IEditButtonProps extends ButtonProps {
  isIconView?: boolean
}
export const EditButton = ({ isIconView = false, className, ...props }: IEditButtonProps) => {
  if (!isIconView) {
    return (
      <Button {...props} className={cn('w-max lg:w-full py-6 text-base', className)}>
        Изменить
      </Button>
    )
  }
  return (
    <Button variant={"ghost"} {...props} className={cn(' hover:bg-accent/10 hover:text-sidebar-foreground', className,)}>
      <PenLine />
    </Button>
  );
}
