'use client'
import { FilterX } from "lucide-react";
import { QueryFilterManager } from "@/features/manage-url-filters";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";
import FormItem from "@/shared/ui/FormItem";
// import { SortingVacanciesField } from "./SortingVacanciesField";
import { PositionFilterField } from "./PositionFilterField";
import { useRouter, useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/shared/lib/object_manipulations/filterFalsyFields";

const defaultState = {
  salary_from: '',
  salary_to: '',
  location: '',
  // sort: '',
  page: ''
}

type TProps = {
  className?: string
}

export const PubVacanciesFilter = ({
  className
}: TProps) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleReset = () => {
    const currentFilters = Object.fromEntries(searchParams.entries());
    const merged = { ...currentFilters, ...defaultState };
    const cleaned = removeEmptyValues(merged);
    const query = new URLSearchParams(cleaned).toString();

    router.push(`/vacancies${query ? `?${query}` : ''}`);
  }
  return (
    <QueryFilterManager
      className={cn(className, "flex flex-col gap-6")}
      render={({ filters, updateFilter }) => {
        return (
          <>
            <div className="flex flex-wrap @3xl:flex-col gap-6">

              <PositionFilterField className="grow min-w-[250px]" />

              <FormItem labelText="Зарплата от" className="grow min-w-[250px]">
                <CancelButton
                  onClick={() => updateFilter({ salary_from: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.salary_from || ''}
                  onChange={(e) => {
                    updateFilter({ salary_from: e.target.value })
                  }}
                  placeholder="Зарплата от"
                />
              </FormItem>

              <FormItem labelText="Зарплата до" className="grow min-w-[250px]">
                <CancelButton
                  onClick={() => updateFilter({ salary_to: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.salary_to || ''}
                  onChange={(e) => updateFilter({ salary_to: e.target.value })}
                  placeholder="Зарплата до"
                />
              </FormItem>

              <FormItem labelText="География" className="grow min-w-[250px]">
                <CancelButton
                  onClick={() => updateFilter({ location: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <Input
                  value={filters.location || ''}
                  onChange={(e) => updateFilter({ location: e.target.value })}
                  placeholder="География"

                  className=""
                />
              </FormItem>
              {/* 
              Sorting

              <FormItem labelText="Сортировка" className="grow min-w-[250px]">
                <CancelButton
                  onClick={() => updateFilter({ sort: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <SortingVacanciesField
                  value={filters.sort || ''}
                  onValueChange={(value: string) => updateFilter({ 'sort': value })}
                  className=""
                />
              </FormItem> */}
            </div>

            <Button
              onClick={handleReset}
              variant={'outline'}
              className={cn(
                'self-start ring-2 ring-input ring-offset-1 border-none',
                "hover:bg-input @3xl:self-stretch"
              )}
            >
              <FilterX /> Сбросить
            </Button>
          </>

        )
      }}
    />
  )
}