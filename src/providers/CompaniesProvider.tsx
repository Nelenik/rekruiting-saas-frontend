'use client'

import { getCompaniesList } from "@/actions/getData";
import { TCompany } from "@/shared/types/companies";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react"


interface CompaniesContextType {
  companiesList: TCompany[];
  activeCompany: TCompany | null;
  findCompany: (filters: { name: string }) => void;
  isFetching: boolean
}

export const CompaniesContext = createContext<CompaniesContextType | null>(null)

/**
 * Is used for company switcher
 */

type TProps = {
  children: ReactNode,
  activeCompany: TCompany | null,
  companiesPrefetch: { data: TCompany[] }
}
export const CompaniesProvider = ({ children, companiesPrefetch, activeCompany }: TProps) => {
  const [filters, setFilters] = useState({})

  const { data, isFetching } = useQuery({
    queryKey: ['companies', filters],
    queryFn: () => getCompaniesList(filters),
    initialData: companiesPrefetch,
    staleTime: 0,
    enabled: Object.values(filters).some(Boolean)
  })

  return (<CompaniesContext.Provider value={{
    companiesList: data.data,
    activeCompany,
    findCompany: (newFilters) => setFilters(newFilters),
    isFetching
  }}>
    {children}
  </CompaniesContext.Provider>)
}

export const useCompanies = () => {
  const context = useContext(CompaniesContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}