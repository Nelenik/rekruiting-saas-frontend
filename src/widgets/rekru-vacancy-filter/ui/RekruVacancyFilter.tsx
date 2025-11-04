'use client'
import { QueryFilterManager } from "@/features/manage-url-filters";
import { cn } from "@/shared/lib/utils";
import { SalaryFilterField } from "./SalaryFilterField";
import { LocationFilterField } from "./LocationFilterField";
import { LevelFilterField } from "./LevelFilterField";
import { WorkFormatFilterField } from "./WorkFormatFilterField";


// const defaultState = {
//   salary_from: '',
//   salary_to: '',
//   location: '',
//   page: '',
//   work_format: [],
//   level: []
// }

type TProps = {
  className?: string
}
export const RekruVacancyFilter = ({
  className
}: TProps) => {

  return (
    <div className={cn('flex gap-4', className)}>
      <QueryFilterManager

        render={({ filters, updateFilter }) => {
          return (
            <>
              <SalaryFilterField
                defaultValues={{
                  salary_from: (filters.salary_from || '') as string,
                  salary_to: (filters.salary_to || '') as string
                }}
                updateCb={updateFilter}
              />

              <LocationFilterField
                defaultValue={filters.location as string || ''}
                updateCb={updateFilter}
              />
              <LevelFilterField
                defaultValues={filters.level as string[]}
                updateCb={updateFilter}
              />
              <WorkFormatFilterField
                defaultValues={filters.work_format as string[]}
                updateCb={updateFilter}
              />
            </>

          )
        }}
      />

    </div>
  );
}