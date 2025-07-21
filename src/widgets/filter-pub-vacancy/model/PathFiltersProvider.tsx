'use client'
import { usePathParamFilter } from "@/features/manage-url-filters"
import { TFilterCompanies, TVacancyPosition } from "@/shared/api/types"
import { createContext, ReactNode, useContext } from "react"

type TPositionsContext = {
  positionsList: TVacancyPosition[],
  filterCompanies: TFilterCompanies[]
  activeFilters: { position: string, company: string };
  updateFilter: (paramIndex: number) => (newValue: string) => void
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

  const { pathFilters, updatePathParam: updateFilter } = usePathParamFilter('/vacancies')
  const [position = '', company = ''] = pathFilters
  const parsedPosition = position === 'all' ? '' : position

  const activeFilters = {
    position: parsedPosition,
    company: company
  }

  return (<PathFiltersContext value={{ positionsList, filterCompanies, activeFilters, updateFilter }}>
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