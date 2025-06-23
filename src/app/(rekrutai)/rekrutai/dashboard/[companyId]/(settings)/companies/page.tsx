// 'use client'

import { AddEntity } from "@/features/mutate-entity"
import { Paginate } from "@/features/pagination"
import { getCompaniesList } from "@/shared/api/actions"
import { COMPANIES_PER_PAGE } from "@/shared/api/constants"
import { TableSkeleton } from "@/shared/ui/skeletons/TableSkeleton"
import { CompaniesTable } from "@/widgets/companies-table"
import { CompaniesFilter } from "@/widgets/filter-companies"
import { Suspense } from "react"

type TProps = {

  searchParams: Promise<{ [key: string]: string }>

}

const CompaniesPage = async ({ searchParams }: TProps) => {
  const filters = (await searchParams)
  const { data: companies, total = null } = await getCompaniesList(filters)
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <div className="flex mb-6 items-end">
          <CompaniesFilter />
          <AddEntity
            entityType="company"
            className=" [&_span]:hidden lg:w-max ml-auto py-2 "
          />
        </div>

        <CompaniesTable companiesList={companies} />
        <Paginate currentPage={Number(filters.page) || 1} totalItems={total} itemsPerPage={COMPANIES_PER_PAGE} className='mt-6' />
      </Suspense>
    </div>
  );
}

export default CompaniesPage;