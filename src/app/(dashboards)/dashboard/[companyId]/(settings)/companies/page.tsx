// 'use client'
import { getCompaniesList } from "@/actions/getData";
import CompaniesFilter from "@/components/CompaniesFilter";
import CompaniesTable from "@/components/CompaniesTable";
import AddEntityModal from "@/components/modals/AddEntityModal";
import Paginate from "@/components/navigation/Paginate";
import { Suspense } from "react";

type TProps = {

  searchParams: Promise<{ [key: string]: string }>

}

const CompaniesPage = async ({ searchParams }: TProps) => {
  const filters = (await searchParams)
  const { data: companies, total = null } = await getCompaniesList(filters)
  return (
    <div>
      <div className="flex mb-6 items-end">
        <CompaniesFilter />
        <AddEntityModal entityType="company" className=" [&_span]:hidden lg:w-max ml-auto py-2 " />
      </div>
      <CompaniesTable companiesList={companies} />
      <Paginate currentPage={Number(filters.page) || 1} totalItems={total} className='mt-6' />
    </div>
  );
}

export default CompaniesPage;