'use client'
import { useQuery } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getCompaniesList } from "@/actions/getData";
import Link from "next/link";
import { useParams } from "next/navigation";

const CompanySwitcher = () => {
  const { companyId } = useParams<{ companyId: string }>()
  const { data: companiesList } = useQuery({
    queryKey: ['companies', 'list'],
    queryFn: getCompaniesList
  })

  const currentCompany = companiesList?.find(el => el.id === Number(companyId))

  console.log(companiesList)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{currentCompany?.name}</DropdownMenuTrigger>
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