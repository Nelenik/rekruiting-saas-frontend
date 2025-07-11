'use client'
import { usePathParamFilter } from "@/features/manage-url-filters"
import { createContext, ReactNode, useContext } from "react"

type TPositionsContext = {
  positionsList: string[],
  active: string,
  updatePosition: (newValue: string) => void
}
export const PubVacancyPositionsContext = createContext<TPositionsContext | null>(null)


/**
 * Is used for public vacancies positions
 * It is used in jobsite for filtering by position
 */


export const PositionsProvider = ({ children, positionsList }: { children: ReactNode, positionsList: string[] }) => {

  const { value: active, updatePathParam: updatePosition } = usePathParamFilter('/vacancies', 0)
  const parsedPosition = active === 'all' ? '' : active

  return (<PubVacancyPositionsContext value={{ positionsList, active: parsedPosition, updatePosition }}>
    {children}
  </PubVacancyPositionsContext>)
}

export const usePositions = () => {
  const context = useContext(PubVacancyPositionsContext)
  if (!context) {
    throw new Error('useNavConfig must be used within PubVacancyPositionsProvider')
  }
  return context
}