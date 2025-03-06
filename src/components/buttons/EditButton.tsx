'use client'
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { PenLine } from "lucide-react";

interface IEditButtonProps extends ButtonProps {
  isIconView?: boolean
}
const EditButton = ({ isIconView = false, className, ...props }: IEditButtonProps) => {
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

export default EditButton;