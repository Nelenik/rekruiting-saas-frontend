'use client'

import { FilterBase } from "./FilterBase"
import { useQuery } from "@tanstack/react-query"
import { searchAreasByName } from "@/features/add-hh-matches/api/areasActions"
import { useState } from "react"
import { AutocompleteControlledField } from "@/shared/ui/form-elements/autocomplete-field.tsx"

type TProps = {
  defaultValue?: string
  updateCb?: (newValues: Record<string, string>) => void
}
export const LocationFilterField = ({
  defaultValue = '',
  updateCb = () => { }
}: TProps) => {
  const [searchText, setSearchText] = useState(defaultValue)

  // useEffect(() => {
  //   setSearchText(defaultValue)
  // }, [defaultValue])

  // Get areas based on search text
  const { data: searchLocations = [], isFetching } = useQuery({
    queryKey: ['search-locations', searchText],
    queryFn: () => searchAreasByName(searchText),
    enabled: searchText.length >= 3
  })

  console.log(searchLocations)
  console.log('isFetching', isFetching)
  return (
    <FilterBase
      triggerText="Город"
      onSave={() => updateCb({ location: searchText })}
      onCancel={() => updateCb({ location: '' })}
    >

      <AutocompleteControlledField
        value={searchText}
        suggestionsList={searchLocations.map(item => item.name)}
        isFetching={isFetching}
        onChange={(e) => setSearchText(e.target.value)}
        onItemSelect={(value) => setSearchText(value)}
        popoverStyles="p-4"
      />
    </FilterBase>
  );
}