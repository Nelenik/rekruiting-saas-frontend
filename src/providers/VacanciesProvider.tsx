'use client'

import { TVacancyShort } from "@/shared/types"
import { createContext, ReactNode, useContext } from "react"

const VacanciesContext = createContext<TVacancyShort[]>([])

export const VacanciesProvider = ({ children, vacancies }: { children: ReactNode, vacancies: TVacancyShort[] }) => {

  return (<VacanciesContext.Provider value={vacancies}>
    {children}
  </VacanciesContext.Provider>)
}

export const useVacancies = () => {
  const context = useContext(VacanciesContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}