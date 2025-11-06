'use client'

import { FilterBase } from "./FilterBase"
import { useQuery } from "@tanstack/react-query"
import { searchAreasByName } from "@/features/add-hh-matches/api/areasActions"
import { useEffect, useState } from "react"
import { useDebounce } from "@/shared/model/hooks/useDebounce"
import { Search } from "lucide-react"
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField"

type TProps = {
  defaultValue?: string
  updateCb?: (newValues: Record<string, string>) => void
}
export const LocationFilterField = ({
  defaultValue = '',
  updateCb = () => { }
}: TProps) => {
  const [searchText, setSearchText] = useState(defaultValue)

  useEffect(() => {
    setSearchText(defaultValue)
  }, [defaultValue])

  const debouncedSearchText = useDebounce(searchText, 300)

  // Get areas based on search text
  const { data: searchLocations = [], isFetching } = useQuery({
    queryKey: ['search-locations', debouncedSearchText],
    queryFn: () => searchAreasByName(debouncedSearchText),
    enabled: debouncedSearchText.length >= 2
  })

  return (
    <FilterBase
      triggerText="Город"
      onSave={() => updateCb({ location: searchText })}
      onCancel={() => updateCb({ location: '' })}
    >

      <div className="relative">
        <Search
          className="absolute top-1/2 left-2 -translate-y-1/2"
        />
        <AutocompleteField
          value={searchText}
          suggestionList={searchLocations.map(item => item.name)}
          onChange={setSearchText}
          onSelect={setSearchText}
          shouldFilter
          isFetching={isFetching}
          placeholder="Введите город, область или страну"
          className='pl-10'
        />
      </div>
    </FilterBase>
  );
}