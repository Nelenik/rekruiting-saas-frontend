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
    throw new Error('useVacancies must be used within VacanciesProvider')
  }
  return context
}