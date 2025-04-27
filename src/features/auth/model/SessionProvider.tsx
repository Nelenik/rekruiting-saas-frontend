'use client'

import { TAuthorized } from "@/shared/api/types"
import { createContext, ReactNode, useContext } from "react"

type SessionContextType = TAuthorized



export const SessionContext = createContext<SessionContextType | null>(null)

type TProps = {
  children: ReactNode,
  session: TAuthorized
}
export const SessionPovider = ({ children, session }: TProps) => {
  return (<SessionContext value={session}>
    {children}
  </SessionContext>)
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return context
}

