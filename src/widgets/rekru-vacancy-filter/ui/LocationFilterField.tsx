'use client'

import { FilterBase } from "./FilterBase"
import { useQuery } from "@tanstack/react-query"
import { searchAreasByName } from "@/features/add-hh-matches/api/areasActions"
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField"
import { useState } from "react"

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
  const { data: searchLocations = [], isPending } = useQuery({
    queryKey: ['search-locations', searchText],
    queryFn: () => searchAreasByName(searchText),
    enabled: searchText.length >= 3
  })

  // console.log('searchLocations', searchLocations)
  console.log('isfetching', isPending)

  return (
    <FilterBase
      triggerText="Город"
      onSave={() => updateCb({ location: searchText })}
      onCancel={() => updateCb({ location: '' })}
    >

      <AutocompleteField
        defaultValue={defaultValue}
        suggestionsList={searchLocations?.map(item => item.name)}
        placeholder="Введите город, область или страну"
        onChange={(e) => setSearchText(e.target.value)}
        onItemSelect={(value) => setSearchText(value)}
      />

      {/* <Command shouldFilter={false}>
        <CommandInput placeholder="Введите город, область или страну" onValueChange={handleInput} />
        <ScrollArea>
          <CommandList className="max-h-[150px] overflow-visible">
            {isFetching && <CommandItem className="text-muted-foreground px-4 text-sm">Loading...</CommandItem>}
            {(searchLocations || [])?.map((location) => (
              <CommandItem
                value={location.name}
                className="px-4"
                key={location.id}
                onSelect={handleInput}
              >
                {location.name}
              </CommandItem>
            ))}
          </CommandList>
        </ScrollArea>
      </Command> */}
    </FilterBase>
  );
}