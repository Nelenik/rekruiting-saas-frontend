// 'use client'

import { AddEntity } from "@/features/mutate-entity"
import { Paginate } from "@/features/pagination"
import { getCompaniesList } from "@/shared/api/getData"
import { CompaniesTable } from "@/widgets/companies-table"
import { CompaniesFilter } from "@/widgets/filters/ui/CompaniesFilter"

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
        <AddEntity
          entityType="company"
          className=" [&_span]:hidden lg:w-max ml-auto py-2 "
        />
      </div>
      <CompaniesTable companiesList={companies} />
      <Paginate currentPage={Number(filters.page) || 1} totalItems={total} className='mt-6' />
    </div>
  );
}

export default CompaniesPage;