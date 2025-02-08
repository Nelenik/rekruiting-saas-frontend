// 'use client'
import { getCompaniesList } from "@/actions/getData";
import CompaniesFilter from "@/components/CompaniesFilter";
import CompaniesTable from "@/components/CompaniesTable";
import FilterInput from "@/components/app_forms/form_elmts/FilterField";
import AddEntityModal from "@/components/modals/AddEntityModal";
import { Input } from "@/components/ui/input";

type TProps = {

  searchParams: Promise<{ [key: string]: string }>

}

const CompaniesPage = async ({ searchParams }: TProps) => {
  const filters = (await searchParams)
  const companies = await getCompaniesList(filters)
  console.log('companies page', companies)
  return (
    <div>
      <div className="flex mb-6 items-end">
        <CompaniesFilter />
        <AddEntityModal entityType="company" className=" [&_span]:hidden lg:w-max ml-auto py-2 " />
      </div>
      <CompaniesTable companiesList={companies} />
    </div>
  );
}

export default CompaniesPage;