'use client'
import { usePathname, useRouter } from "next/navigation";
import { useCompanies } from "@/providers/CompaniesProvider";
import { createSidebarConfig } from "@/shared/config/sidebarConfig";
import { Command, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../../ui/scroll-area";


const CompanySwitcher = () => {
  const pathname = usePathname()

  //get companies from companies provider
  const { companiesList, activeCompany, findCompany, isFetching } = useCompanies()

  const router = useRouter()

  //delay for fetching list on search
  const delayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  const handleInput = (value: string) => {
    if (delayRef.current) clearTimeout(delayRef.current)
    delayRef.current = setTimeout(() => {
      findCompany({ name: value })
    }, 300)
  }

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
                  onSelect={(value) => router.push(extractNewPath(String(activeCompany?.id), value, pathname))}
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

export default CompanySwitcher

/**
 * Retrieves all available paths for a given company.
 *
 * This function generates an array of paths from the sidebar configuration 
 * of the specified company. It includes both top-level routes and 
 * sub-menu routes if they exist.
 *
 * @param {string} newCompanyId - The ID of the company for which to get the available paths.
 * @returns {string[]} An array of available paths for the given company.
 */

const getAvailablePaths = (newCompanyId: string): string[] => {
  return createSidebarConfig(newCompanyId).reduce((acc: string[], route) => {
    if (route.href) acc.push(route.href);
    if (route.subMenu) acc.push(...route.subMenu.map(subroute => subroute.href));
    return acc;
  }, []);
};

/**
 * Extracts a new path by replacing `activeCompanyId` with `newCompanyId` and validating available paths.
 * 
 * @param activeCompanyId - The identifier of the currently active company.
 * @param newCompanyId - The identifier of the new company.
 * @param currentPathname - The current URL path.
 * @returns The new path corresponding to `newCompanyId`, or the default `/dashboard/{newCompanyId}` if no match is found.
 */

const extractNewPath = (activeCompanyId: string, newCompanyId: string, currentPathname: string): string => {
  const availablePathes = getAvailablePaths(newCompanyId)
  const currentPath = currentPathname.replace(String(activeCompanyId), newCompanyId)

  const match = availablePathes
    .filter(path => currentPath.startsWith(path))
    .sort((a, b) => b.length - a.length)[0]
    || `/dashboard/${newCompanyId}`
  return match
}