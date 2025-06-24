import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/shared/ui/shadcn/dropdown-menu";
import { DropdownMenuRadioGroupProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

type TProps = {
  className?: string;
} & DropdownMenuRadioGroupProps

export const SortingVacancies = ({
  className, ...props
}: TProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
          className={cn(
            'justify-between bg-white text-muted-foreground font-normal',
            className,
            'hover:bg-white hover:text-foreground',
          )}
        > Сортировка
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px]"
        align="start"
      >

        <DropdownMenuRadioGroup {...props} defaultValue="id">
          <DropdownMenuRadioItem value="id">По умолчанию</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="publication_at" >По дате (сначала новые)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="-publication_at">По дате (сначала старые)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name" >По имени (А → Я)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="-name">По имени (Я → А)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
