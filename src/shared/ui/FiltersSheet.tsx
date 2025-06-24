'use client'
import { FunnelPlus, PanelRightClose } from "lucide-react";
import { Button } from "./shadcn/button";
// import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { cn } from "../lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./shadcn/sheet";

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
          variant="outline"
          className={cn(
            "h-auto w-[50px] [&_svg]:size-6  text-muted-foreground",
            className
          )}
          aria-label="Открыть фильтры"
        >
          <FunnelPlus
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[300px] bg-white  overflow-y-auto pt-20" >
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
    // <Popover
    // >
    //   <PopoverTrigger asChild
    //     className={className}>
    //     <Button
    //       variant="outline"
    //       className="h-auto w-[50px] [&_svg]:size-6 hover:bg-input text-muted-foreground"
    //       aria-label="Открыть фильтры"
    //     >
    //       <FunnelPlus
    //       />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-full max-w-[300px]">
    //     {children}
    //   </PopoverContent>
    // </Popover>
  );
}