// 'use client'
import { getCompaniesList } from "@/actions/getData";
import CompaniesFilter from "@/components/CompaniesFilter";
import CompaniesTable from "@/components/CompaniesTable";
import AddEntityModal from "@/components/modals/AddEntityModal";

type TProps = {

  searchParams: Promise<{ [key: string]: string }>

}

const CompaniesPage = async ({ searchParams }: TProps) => {
  const filters = (await searchParams)
  const companies = await getCompaniesList(filters)
  // console.log('companies page', companies)
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