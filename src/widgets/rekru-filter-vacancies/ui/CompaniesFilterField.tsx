import { ChangeEvent, useEffect, useMemo, useState, useTransition } from "react";
import { FilterBase } from "./FilterBase";
import { Input } from "@/shared/ui/shadcn/input";
import { usePathFilters } from "../model/PathFiltersProvider";
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField";
import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const CompaniesFilterField = ({
}) => {
  const { filterCompanies, activeFilters, updateFilter } = usePathFilters()

  const [, startTransition] = useTransition()

  const [itAccreditation, setItAccreditation] = useState(false)

  const [company, setCompany] = useState('')

  const companiesSuggests = useMemo(() => {
    const filteredByAccreditation = itAccreditation ? filterCompanies.filter(item => item?.it_accreditation) : filterCompanies
    return filteredByAccreditation.map(item => item.name + ` (${item.count})`)
  }, [filterCompanies, itAccreditation])


  useEffect(() => {
    setCompany(activeFilters.company)
  }, [activeFilters.company])



  const handleSave = () => {
    startTransition(() => {
      updateFilter(1)(company)
    })
  }

  const handleCancel = () => {
    startTransition(() => {
      updateFilter(1)('')
    })
  }

  return (
    <FilterBase
      triggerText="Компания"
      onSave={handleSave}
      onCancel={handleCancel}
      className={cn(activeFilters.company && 'ring-2 ring-primary ring-offset-1')}
    >
      <div className="">

        <label
          className="flex items-center gap-2 [&:not(:last-child)]:mb-4"
        >
          <Input
            type="checkbox"
            className="inline w-5 h-5 accent-primary shrink-0"
            defaultChecked={itAccreditation}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setItAccreditation(e.target.checked)}
          />
          <span>Аккредитованные ИТ-компании</span>
        </label>

        <div className="relative">
          <Search
            className="absolute top-1/2 left-2 -translate-y-1/2"
          />
          <AutocompleteField
            value={company}
            onChange={setCompany}
            onSelect={(value: string) => setCompany(value.replace(/\s*\(\d+\)\s*$/, '').trim())}
            suggestionList={companiesSuggests}
            shouldFilter
            placeholder="Введите название компании"
            className='pl-10'
          />
        </div>
      </div>

    </FilterBase>
  );
}