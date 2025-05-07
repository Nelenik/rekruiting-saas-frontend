'use client'
import { FilterX } from "lucide-react";
import { UrlFilterManager } from "@/features/manage-url-filters";
import { CancelButton } from "@/shared/ui/buttons/CancelButton";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";
import FormItem from "@/shared/ui/FormItem";
import { PositionSelect } from "@/entities/vacancy";

const defaultState = {
  position: '',
  salary_from: '',
  salary_to: '',
  location: ''
}

export const ReserveFilter = () => {

  return (
    <UrlFilterManager
      className="flex flex-col gap-6"
      render={({ filters, updateFilter }) => {
        return (
          <>
            <div className="flex flex-wrap @3xl:flex-col gap-6">
              <FormItem labelText="Специализация" className="grow min-w-[250px]">
                <CancelButton
                  onClick={() => updateFilter({ position: '' })}
                  className="absolute right-0 top-0 z-10"
                />
                <PositionSelect
                  value={filters.position || ''}
                  onValueChange={(value: string) => updateFilter({ 'position': value })}
                  className="bg-white"
                />
              </FormItem>

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
            </div>

            <Button
              onClick={() => {
                updateFilter(defaultState)
              }}
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