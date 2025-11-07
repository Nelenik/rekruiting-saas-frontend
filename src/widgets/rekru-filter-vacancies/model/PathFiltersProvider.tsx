'use client'
import { normalizeVacanciesFilterPath } from "@/entities/vacancy"
import { usePathParamFilter } from "@/features/manage-url-filters"
import { TFilterCompanies, TVacancyPosition } from "@/shared/api/types"
import { createContext, ReactNode, useContext } from "react"

type TPositionsContext = {
  positionsList: TVacancyPosition[],
  filterCompanies: TFilterCompanies[]
  activeFilters: { position: string, company: string };
  updatePathParams: (newValues: string[]) => void
}
export const PathFiltersContext = createContext<TPositionsContext | null>(null)


/**
 * Is used for public vacancies positions
 * It is used in jobsite for filtering by position
 */

type TProps = {
  children: ReactNode,
  positionsList: TVacancyPosition[]
  filterCompanies: TFilterCompanies[]
}

export const PathFiltersProvider = ({ children, positionsList, filterCompanies }: TProps) => {

  const { pathFilters, updatePathParams } = usePathParamFilter('/vacancies')

  const activeFilters = normalizeVacanciesFilterPath(pathFilters as string[])

  return (<PathFiltersContext value={{ positionsList, filterCompanies, activeFilters, updatePathParams }}>
    {children}
  </PathFiltersContext>)
}

export const usePathFilters = () => {
  const context = useContext(PathFiltersContext)
  if (!context) {
    throw new Error('usePathFilters must be used within PathFiltersProvider')
  }
  return context
}