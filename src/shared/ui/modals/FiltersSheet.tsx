'use client'
import { FunnelPlus, PanelRightClose } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../shadcn/sheet";
import { cn } from "@/shared/lib/utils";
import { Button } from "../shadcn/button";

type TProps = {
  children?: React.ReactNode;
  className?: string;
}
export const FiltersSheet = ({
  children,
  className = "",
}: TProps) => {
  return (
    <Sheet >
      <SheetTrigger asChild >
        <Button
          className={cn(
            "h-auto w-[40px] [&_svg]:size-5  text-primary-foreground bg-accent2",
            className
          )}
          aria-label="Открыть фильтры"
        >
          <FunnelPlus
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[320px] bg-white pl-4 pr-1 pt-16" >
        <SheetClose className={cn(
          "absolute left-4 top-4 rounded-sm p-1 text-muted-foreground transition-colors",
          'hover:text-foreground '
        )}>
          <PanelRightClose size={20} />
        </SheetClose>
        <SheetTitle className="text-3xl visually-hidden">
          Фильтры вакансий
        </SheetTitle>

        <SheetDescription className="visually-hidden">
          Здесь вы можете настроить фильтры для поиска вакансий.
        </SheetDescription>

        {children}

      </SheetContent>
    </Sheet>
  );
}