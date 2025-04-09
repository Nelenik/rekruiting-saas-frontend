'use client'

import { createContext, ReactNode, useContext } from "react"
import { TVacancyShort } from "../api/types"

const VacanciesContext = createContext<TVacancyShort[]>([])

export const VacanciesProvider = ({ children, vacancies }: { children: ReactNode, vacancies: TVacancyShort[] }) => {

  return (<VacanciesContext value={vacancies}>
    {children}
  </VacanciesContext>)
}

export const useVacancies = () => {
  const context = useContext(VacanciesContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}