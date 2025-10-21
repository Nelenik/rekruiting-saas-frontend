'use client'

import { createContext, useContext } from "react"
import { TCheckboxItem } from "./types"

type TCheckboxContext = {
  selectedIds: Set<string>,
  onSelectionChange: (updated: Set<string> | ((prev: Set<string>) => Set<string>)) => void,
  includeParent: boolean,
  onLoadChildren: (item: TCheckboxItem) => Promise<TCheckboxItem[]>
  styles: {
    checkboxLabelClassName?: string,
    checkboxInputClassName?: string,
    collapsibleTriggerClassName?: string,
    collapsibleContentClassName?: string
  }
}
export const CheckboxContext = createContext<TCheckboxContext | null>(null)

/**
 * Is used for multilevel checkbox
 */

export const CheckboxProvider = CheckboxContext

export const useCheckbox = () => {
  const context = useContext(CheckboxContext)
  if (!context) {
    throw new Error('useCheckbox must be used within CheckboxProvider')
  }
  return context
}