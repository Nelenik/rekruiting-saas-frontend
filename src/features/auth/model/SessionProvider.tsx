'use client'

import { TSession } from "@/shared/api/types"
import { createContext, ReactNode, useContext } from "react"

type SessionContextType = TSession



export const SessionContext = createContext<SessionContextType | null>(null)

type TProps = {
  children: ReactNode,
  session: TSession
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

