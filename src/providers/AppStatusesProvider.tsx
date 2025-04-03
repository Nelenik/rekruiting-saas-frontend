'use client'

import { getStatuses } from "@/actions/getData"
import { TStatus } from "@/shared/types/statuses"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, useContext } from "react"
import { createContext } from "react"

const AppStatusesContext = createContext<TStatus[]>([])

type TProps = {
  children: ReactNode
  initialStatuses: TStatus[]
}

export const AppStatusesProvider: FC<TProps> = ({ children, initialStatuses }) => {

  const { data: appStatuses } = useQuery({
    queryKey: ['appStatuses'],
    queryFn: getStatuses,
    initialData: initialStatuses
  })

  return (
    <AppStatusesContext value={appStatuses || []}>
      {children}
    </AppStatusesContext>
  )
}

export const useStatuses = () => {
  const context = useContext(AppStatusesContext)
  if (!context) {
    throw new Error('useStatuses must be used within CompaniesProvider')
  }
  return context
}