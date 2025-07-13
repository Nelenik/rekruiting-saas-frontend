'use client'
import { usePathParamFilter } from "@/features/manage-url-filters"
import { TVacancyPosition } from "@/shared/api/types"
import { createContext, ReactNode, useContext } from "react"

type TPositionsContext = {
  positionsList: TVacancyPosition[],
  active: string,
  updatePosition: (newValue: string) => void
}
export const PubVacancyPositionsContext = createContext<TPositionsContext | null>(null)


/**
 * Is used for public vacancies positions
 * It is used in jobsite for filtering by position
 */

type TProps = {
  children: ReactNode,
  positionsList: TVacancyPosition[]
}

export const PositionsProvider = ({ children, positionsList }: TProps) => {

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