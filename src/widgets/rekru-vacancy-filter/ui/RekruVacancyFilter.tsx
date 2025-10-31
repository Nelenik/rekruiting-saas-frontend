'use client'
import { QueryFilterManager } from "@/features/manage-url-filters";
import { cn } from "@/shared/lib/utils";
import { FilterBase } from "./FilterBase";
import { Input } from "@/shared/ui/shadcn/input";
import { useState } from "react";


const defaultState = {
  salary_from: '',
  salary_to: '',
  location: '',
  page: '',
  work_format: [],
  level: []
}

type TProps = {
  className?: string
}
export const RekruVacancyFilter = ({
  className
}: TProps) => {
  const [localFiltersState, setLocalFiltersState] = useState(defaultState)

  return (
    <div className={cn('', className)}>
      <QueryFilterManager

        render={({ filters, updateFilter }) => {
          return (
            <>

              <FilterBase
                triggerText="Доход"
              >
                <Input
                  value={filters.salary_from || ''}
                  onChange={(e) => {
                    setLocalFiltersState(prev => ({ ...prev, salary_from: e.target.value }))
                  }}
                  placeholder="От"
                />

                <Input
                  value={filters.salary_to || ''}
                  onChange={(e) => updateFilter({ salary_to: e.target.value })}
                  placeholder="До"
                />

              </FilterBase>
            </>
          )
        }}
      />

    </div>
  );
}