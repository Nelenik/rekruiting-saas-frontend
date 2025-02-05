'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useCompanies } from "@/providers/CompaniesProvider";
import { createSidebarConfig } from "@/shared/config/sidebarConfig";


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



const CompanySwitcher = () => {
  const pathname = usePathname()

  //get companies from companies provider
  const { companiesList, activeCompany } = useCompanies()

  const extractNewPath = (newCompanyId: string): string => {
    const availablePathes = getAvailablePaths(newCompanyId)
    const currentPath = pathname.replace(String(activeCompany?.id), newCompanyId)

    const match = availablePathes
      .filter(path => currentPath.startsWith(path))
      .sort((a, b) => b.length - a.length)[0]
      || `/dashboard/${newCompanyId}`
    return match

  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="[data[state=open] a]:rotate-180">
        <a className="cursor-pointer flex gap-1 items-center">
          {activeCompany?.name}
          {/* <ChevronDown size={12} /> */}
          <span className="w-0 h-0 border-solid border-x-[5px] border-t-[5px] border-t-muted-foreground/65 border-b-transparent border-x-transparent rotate-0 "></span>
        </a>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full ">
        <DropdownMenuLabel>Компании клиента</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="h-[150px] overflow-y-auto [&::-webkit-scrollbar]:w-[4px]">

          {companiesList?.map((company) => (
            <DropdownMenuItem asChild key={company.id}>
              <Link href={extractNewPath(String(company.id))}>
                {company.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CompanySwitcher