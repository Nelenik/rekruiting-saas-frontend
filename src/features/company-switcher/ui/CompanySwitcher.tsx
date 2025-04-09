'use client'
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/shared/ui/shadcn/command";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";
import { useCompanySwitcher } from "../model/useCompanySwitcher";


export const CompanySwitcher = () => {
  const {
    companiesList,
    isFetching,
    activeCompany,
    handleInput,
    handleSelect
  } = useCompanySwitcher()

  return (
    <Popover>
      <PopoverTrigger asChild className="[data[state=open] a]:rotate-180">
        <a className="cursor-pointer flex gap-1 items-center">
          {activeCompany?.name}
          <span className="w-0 h-0 border-solid border-x-[5px] border-t-[5px] border-t-muted-foreground/65 border-b-transparent border-x-transparent rotate-0 "></span>
        </a>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-max">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Компании клиента" onValueChange={handleInput} />
          <ScrollArea>
            <CommandList className="max-h-[150px] overflow-visible">
              {isFetching && <CommandItem className="text-muted-foreground px-4 text-sm">Loading...</CommandItem>}
              {companiesList?.map((company) => (
                <CommandItem
                  value={String(company.id)}
                  className="px-4"
                  key={company.id}
                  onSelect={handleSelect}
                >
                  {company.name}
                </CommandItem>
              ))}
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

