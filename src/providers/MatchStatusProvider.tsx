'use client'

import { getMatchStatuses } from "@/actions/getData"
import { TMatchStatus } from "@/shared/types"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { FC, ReactNode, useContext } from "react"
import { createContext } from "react"

const MatchStatusContext = createContext<TMatchStatus[]>([])

type TProps = {
  children: ReactNode
  initialStatuses: TMatchStatus[]
}

export const MatchStatusProvider: FC<TProps> = ({ children, initialStatuses }) => {

  const { data: matchStatuses } = useQuery({
    queryKey: ['matchStatuses'],
    queryFn: getMatchStatuses,
    initialData: initialStatuses
  })

  return (
    <MatchStatusContext.Provider value={matchStatuses || []}>
      {children}
    </MatchStatusContext.Provider>
  )
}

export const useMatchStatuses = () => {
  const context = useContext(MatchStatusContext)
  if (!context) {
    throw new Error('useCompanies must be used within CompaniesProvider')
  }
  return context
}