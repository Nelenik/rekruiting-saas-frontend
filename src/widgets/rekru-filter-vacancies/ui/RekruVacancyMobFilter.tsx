'use client'

import { cn } from "@/shared/lib/utils"
import { CancelButton } from "@/shared/ui/buttons/CancelButton"
import FormItem from "@/shared/ui/form-elements/FormItem"
import { Input } from "@/shared/ui/shadcn/input"
import { Search } from "lucide-react"
import { usePathFilters } from "../model/PathFiltersProvider"
import { useState, useTransition } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"
import { vacancyPositionsDict, vacancyWorkFormatDict } from "@/entities/vacancy"
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField"
import { useQueryFilters } from "@/features/manage-url-filters"
import { LocationSearch } from "./LocationFilterField"
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence"
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA"
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area"
import { useRouter } from "next/navigation"

const initState = {
  salary_from: '',
  salary_to: '',
  location: '',
  work_format: [],
  level: [],
}

const toggleCheckboxes = (initValues: string[], newValue: string): string[] => {
  const set = new Set(initValues)
  if (set.has(newValue)) {
    set.delete(newValue)
  } else {
    set.add(newValue)
  }
  return Array.from(set)
}

type TProps = {
  className?: string
}
export const RekruVacancyMobFilter = ({
  className
}: TProps) => {
  const router = useRouter()
  // filters from path params
  const { positionsList, filterCompanies, activeFilters, updatePathParams } = usePathFilters()
  //filtres from search params
  const { filters, getUpdatedQueryString } = useQueryFilters()

  const [, startTransition] = useTransition()

  const [pathParams, setPathParams] = useState(activeFilters)
  const [queryParams, setQueryParams] = useState<Record<string, string | string[]>>({ ...initState, ...filters })

  const handleSave = () => {
    startTransition(() => {
      const baseUrl = updatePathParams(Object.values(pathParams), { dryRun: true })
      const queryString = getUpdatedQueryString(queryParams)
      router.push(`${baseUrl}?${queryString}`, { scroll: false })
    })
  }

  return (
    <div className={cn(className, "flex flex-col gap-6 h-[92%]")}>
      <ScrollArea className="h-full pr-4 " type="always">

        <div className="flex flex-col items-center gap-6 pb-5">

          {/* SPECIALIZATION */}
          <FormItem labelText="Специализация" className="w-[96%]">
            <CancelButton
              onClick={() => setPathParams(prev => ({ ...prev, position: '' }))}
              className="absolute right-0 top-0 z-10"
            />
            <Select
              value={pathParams.position || ''}
              onValueChange={(value) => setPathParams(prev => ({ ...prev, position: value }))}

            >
              <SelectTrigger
                className={'bg-white text-left h-max'}
              >
                <SelectValue placeholder="Выберите позицию" />
              </SelectTrigger>
              <SelectContent>
                {positionsList.map((item) => (
                  <SelectItem
                    key={item.position}
                    value={item.position}
                  >
                    <span className="flex gap-3 items-center ">
                      <span className="hyphens-auto">
                        {vacancyPositionsDict[item.position]}
                      </span>
                      <span className="text-gray-400">
                        {`(${item.count})`}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          {/* COMPANY */}
          <FormItem labelText="Компания" className="w-[96%]">
            <CancelButton
              onClick={() => setPathParams(prev => ({ ...prev, company: '' }))}
              className="absolute right-0 top-0 z-10"
            />
            <div className="relative">
              <Search
                className="absolute top-1/2 left-2 -translate-y-1/2"
              />
              <AutocompleteField
                value={pathParams.company}
                onChange={
                  (value) => setPathParams(prev => ({
                    ...prev,
                    company: value
                  }))
                }
                onSelect={
                  (value: string) => setPathParams(prev => ({
                    ...prev,
                    company: value.replace(/\s*\(\d+\)\s*$/, '').trim()
                  }))
                }
                suggestionList={
                  filterCompanies.map(item => item.name + ` (${item.count})`)
                }
                shouldFilter
                placeholder="Введите название компании"
                className='pl-10'
              />
            </div>
          </FormItem>

          {/* SALARY */}
          <FormItem labelText="Зарплата" className="w-[96%]">
            <CancelButton
              onClick={
                () => setQueryParams(prev => ({
                  ...prev,
                  salary_from: '',
                  salary_to: ''
                }))
              }
              className="absolute right-0 top-0 z-10"
            />
            <Input
              value={queryParams.salary_from}
              onChange={(e) => {
                setQueryParams(prev => ({ ...prev, salary_from: e.target.value }))
              }}
              placeholder="От"
            />

            <Input
              value={queryParams.salary_to}
              onChange={(e) => {
                setQueryParams(prev => ({ ...prev, salary_to: e.target.value }))
              }}
              placeholder="До"
            />
          </FormItem>

          {/* LOCATION */}
          <FormItem labelText="География" className="w-[96%]">
            <CancelButton
              onClick={() => setQueryParams(prev => ({ ...prev, location: '' }))}
              className="absolute right-0 top-0 z-10"
            />
            <LocationSearch
              locationText={queryParams.location as string}
              setLocationText={(value) => setQueryParams(prev => ({ ...prev, location: value }))}
            />
          </FormItem>

          {/* LEVEL */}
          <FormItem labelText="Грейд" className="w-[96%]">
            <CancelButton
              onClick={() => setQueryParams(prev => ({ ...prev, level: [] }))}
              className="absolute right-0 top-0 z-10"
            />
            <div className="columns-2">
              {['intern', 'junior', 'middle', 'senior', 'lead', 'head'].map((item: string) => {
                const isChecked = queryParams.level.includes(item)
                const handleToggleLevels = () => {
                  setQueryParams((prev) => ({ ...prev, level: toggleCheckboxes(prev.level as string[], item) }))
                }
                return (
                  <label
                    key={item}
                    className="flex items-center gap-2 [&:not(:last-child)]:mb-4"
                  >
                    <Input
                      type="checkbox"
                      value={item}
                      className="inline w-5 h-5 accent-accent2 shrink-0"
                      checked={isChecked}
                      onChange={handleToggleLevels}
                    />
                    <span>{capitalizeSentences(item)}</span>
                  </label>
                )
              })}
            </div>
          </FormItem>

          {/* WORK_FORMAT */}
          <FormItem labelText="Формат" className="w-[96%]">
            <CancelButton
              onClick={() => setQueryParams(prev => ({ ...prev, work_format: [] }))}
              className="absolute right-0 top-0 z-10"
            />
            <div className="columns-2">
              {['office', 'remote', 'hybrid'].map((item: string) => {
                const isChecked = queryParams.work_format.includes(item)
                const handleToggFormat = () => {
                  setQueryParams((prev) => ({ ...prev, work_format: toggleCheckboxes(prev.work_format as string[], item) }))
                }
                return (
                  <label
                    key={item}
                    className="flex items-center gap-2 [&:not(:last-child)]:mb-4"
                  >
                    <Input
                      type="checkbox"
                      value={item}
                      className="inline w-5 h-5 accent-accent2 shrink-0"
                      checked={isChecked}
                      onChange={handleToggFormat}
                    />
                    <span>{capitalizeSentences(vacancyWorkFormatDict[item])}</span>
                  </label>
                )
              })}
            </div>
          </FormItem>

        </div>
      </ScrollArea>

      <div className="flex gap-5 justify-end absolute w-full bottom-0 left-0 bg-white p-4 shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)]">
        <RekruCTA
          view="stroke"
          onClick={() => {
            setPathParams({ company: '', position: '' });
            setQueryParams(initState)
          }}
        >
          Очистить
        </RekruCTA>
        <RekruCTA
          view="dark"
          onClick={handleSave}
        >
          Сохранить
        </RekruCTA>
      </div>
    </div>
  )
}