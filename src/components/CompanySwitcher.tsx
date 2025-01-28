'use client'
import { useQuery } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getCompaniesList } from "@/actions/getData";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const CompanySwitcher = () => {
  const { companyId } = useParams<{ companyId: string }>()
  const pathname = usePathname()
  console.log(pathname)

  //get user's companies list
  const { data: companiesList } = useQuery({
    queryKey: ['companies', 'list'],
    queryFn: getCompaniesList
  })

  const currentCompany = companiesList?.find(el => el.id === Number(companyId))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="[data[state=open] a]:rotate-180">
        <a className="cursor-pointer flex gap-1 items-center">
          {currentCompany?.name}
          {/* <ChevronDown size={12} /> */}
          <span className="w-0 h-0 border-solid border-x-[5px] border-t-[5px] border-t-muted-foreground/65 border-b-transparent border-x-transparent rotate-0 "></span>
        </a>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel>Компании клиента</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companiesList?.map((company) => (
          <DropdownMenuItem asChild key={company.id}>
            <Link href={`/dashboard/${company.id}`}>
              {company.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CompanySwitcher;