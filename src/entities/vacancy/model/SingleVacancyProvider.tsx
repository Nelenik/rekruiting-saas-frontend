'use client'

import { TVacancy } from "@/shared/api/types"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useEffect } from "react"

type TVacancyContext = {
  vacancy: TVacancy,
}

// Creating a context to provide the vacancy data to components
const VacancyContext = createContext<TVacancyContext | null>(null)

/**
 * SingleVacancyProvider component provides the `vacancy` object to its children components.
 * It also resets the query cache for `matchByStatus` whenever the `vacancy.id` changes, ensuring the data is fresh.
 * 
 * @param children - The child components that will consume the `vacancy` context.
 * @param vacancy - The vacancy object to be provided via context.
 * 
 * @returns A provider component that wraps children and passes down the vacancy data.
 * 
 * @example
 * ```tsx
 * <SingleVacancyProvider vacancy={vacancy}>
 *   <SomeComponent />
 * </SingleVacancyProvider>
 * ```
 
 */
export const SingleVacancyProvider = ({ children, vacancy }: { children: ReactNode, vacancy: TVacancy }) => {

  const queryClient = useQueryClient();
  // Reset queries related to match statuses whenever vacancy.id changes
  useEffect(() => {
    queryClient.resetQueries({ queryKey: ['matchByStatus'] });
  }, [queryClient, vacancy.id]);

  return (<VacancyContext value={{ vacancy }}>
    {children}
  </VacancyContext>)
}

/**
 * Custom hook to access the vacancy context.
 * Throws an error if the hook is used outside of the `SingleVacancyProvider`.
 * 
 * @throws {Error} Throws an error if the hook is used outside of the `SingleVacancyProvider`.
 * 
 * @returns The context value containing the `vacancy` data.
 * 
 * @example
 * ```tsx
 * const { vacancy } = useSingleVacancy();
 * ```
 
 */
export const useSingleVacancy = () => {
  const context = useContext(VacancyContext)
  if (!context) {
    throw new Error('useSingleVacancy must be used within SingleVacancyProvider')
  }
  return context
}