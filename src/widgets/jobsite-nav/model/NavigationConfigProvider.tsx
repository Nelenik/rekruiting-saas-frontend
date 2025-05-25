'use client'

import { createJobsiteProfileNavConfig, createJobsitePublicNavConfig } from "@/shared/config/jobsiteNavConfig"
import { TNavConfig } from "@/shared/config/types"
import { createContext, ReactNode, useContext, useMemo } from "react"

export const NavigationContext = createContext<{
  publicRoutes: TNavConfig[],
  profileRoutes: TNavConfig[]
} | null>(null)


/**
 * Is used for sharing routes through components
 * It is used in jobsite-nav widget
 */


export const NavigationConfigProvider = ({ children }: { children: ReactNode }) => {
  const publicRoutes = useMemo(() => createJobsitePublicNavConfig(), [])
  const profileRoutes = useMemo(() => createJobsiteProfileNavConfig(), [])
  return (<NavigationContext value={{
    publicRoutes,
    profileRoutes
  }}>
    {children}
  </NavigationContext>)
}

export const useNavConfig = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavConfig must be used within NavigationConfigProvider')
  }
  return context
}