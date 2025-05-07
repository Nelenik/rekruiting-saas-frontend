'use client'

import { createContext, ReactNode, useContext } from "react"

export const TenatContext = createContext<{ tenat: string } | null>(null)

/**
 * Is used for sharing current tenat through components
 */

type TProps = {
  children: ReactNode,
  tenat: string
}

export const TenatProvider = ({ children, tenat }: TProps) => {

  return (<TenatContext value={{
    tenat
  }}>
    {children}
  </TenatContext>)
}

export const useTenat = () => {
  const context = useContext(TenatContext)
  if (!context) {
    throw new Error('useTenat must be used within TenatProvider')
  }
  return context
}