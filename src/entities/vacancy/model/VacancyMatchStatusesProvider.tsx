'use client'

import { TStatus, TVacancy } from "@/shared/api/types"
import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState, useTransition } from "react"
import { useSingleVacancy } from "./SingleVacancyProvider"
import { updateVacancy } from "@/shared/api/updateData"
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData"
import { omitFields } from "@/shared/lib/object_manipulations/omitFields"
import { useToast } from "@/shared/model/hooks/use-toast"
import { arrayMove } from "@dnd-kit/sortable"

type TVacancyMatchStatusesContext = {
  columns: TStatus[],
  moveColumn: (activeId: number | string, overId: number | string) => void,
  addColumn: (currentId: number | string, newStatus: TStatus, position: "left" | "right") => void,
  deleteColumn: (deletingColId: number | string) => void,
  updateColumn: (currentId: number | string, changes: Omit<TStatus, 'id'>) => void
}

type TVacancyEdit = Omit<
  TVacancy,
  "created_at" | "match_hot_count" | "match_count" | "status" | "status_id" | "matchStatuses" | "id"
>

// Context for managing vacancy match statuses
const VacancyMatchStatusesContext = createContext<TVacancyMatchStatusesContext | null>(null)

/**
 * VacancyMatchStatusesProvider component provides context to manage and manipulate columns (statuses) related to a vacancy.
 * It allows adding, moving, updating, and deleting columns.
 * 
 * @param children - The children components to be wrapped by this provider.
 * 
 * @returns A provider component that passes the columns and manipulation functions down the component tree.
 * 
 * @example
 * ```tsx
 * <VacancyMatchStatusesProvider>
 *   <SomeComponent />
 * </VacancyMatchStatusesProvider>
 * ```
 
 */
export const VacancyMatchStatusesProvider = ({ children }: { children: ReactNode }) => {
  const { vacancy } = useSingleVacancy()

  // Extract fields necessary for vacancy updating, excluding irrelevant fields
  const vacancyEditData: TVacancyEdit = useMemo(() =>
    omitFields(vacancy, ["created_at", "match_hot_count", "match_count", "status", "status_id", "matchStatuses", "id"]),
    [vacancy]
  );

  const { toast } = useToast();
  //sort match statuses by rank to get right columns order
  const initialColumns = vacancy.matchStatuses
    .toSorted((a, b) => a.rank - b.rank)
    .map((el) => el.status);

  const [columns, setColumns] = useState(initialColumns);

  //transition to update column position
  const [, startTransition] = useTransition();

  //save the initial columns state to return to it if is needed
  const prevColumnsState = useRef(columns);

  // Update the vacancy matchStatuses on the server
  const updateAtServer = useCallback((newColumns: TStatus[]) =>
    startTransition(async () => {
      const { error } = await updateVacancy(
        vacancy.id,
        null,
        convertToFormData({
          ...vacancyEditData,
          matchStatuses: newColumns.map((el) => el.id),
        })
      );

      if (error) {
        toast({
          variant: "destructive",
          description:
            "Произошла ошибка при обновлении колонок. Попробуйте снова.",
        });
        setColumns(prevColumnsState.current);
      }
    }), [toast, vacancy.id, vacancyEditData]);

  // Update the columns state locally and on the server
  const updateColumns = useCallback((newColumns: TStatus[]) => {
    setColumns(newColumns);
    updateAtServer(newColumns);
  }, [updateAtServer]);

  // Function to move a column's position within the list
  const moveColumn = useCallback((activeId: number | string, overId: number | string) => {
    const activeColIndex = columns.findIndex((col) => col.id === activeId);
    const overColIndex = columns.findIndex((col) => col.id === overId);
    const newColumns = arrayMove(columns, activeColIndex, overColIndex);
    updateColumns(newColumns);
  }, [columns, updateColumns]);

  // Function to delete a column
  const deleteColumn = useCallback((deletingColId: number | string) => {
    const newColumns = columns.filter((col) => col.id !== deletingColId);
    updateColumns(newColumns);
  }, [columns, updateColumns]);

  // Function to add a new column to the left or right of the current column
  const addColumn = useCallback((
    currentId: number | string,
    newStatus: TStatus,
    position: "left" | "right"
  ) => {
    let currPos = columns.findIndex((item) => item.id === currentId);
    currPos = position === "left" ? currPos : currPos + 1;
    const newColumns = columns.toSpliced(currPos, 0, newStatus);
    updateColumns(newColumns);
  }, [columns, updateColumns]);

  const updateColumn = useCallback((currentId: number | string, changes: Omit<TStatus, 'id'>) => {
    setColumns(prev => prev.map(col => col.id === currentId ? { ...col, ...changes } : col))
  }, [])

  return (
    <VacancyMatchStatusesContext
      value={{
        columns,
        moveColumn,
        addColumn,
        updateColumn,
        deleteColumn
      }}
    >
      {children}
    </VacancyMatchStatusesContext>
  )
}

/**
 * Custom hook to access the vacancy match statuses context.
 * It provides functions to manipulate columns (statuses) of a vacancy.
 * 
 * @throws {Error} Throws an error if the hook is used outside of the `VacancyMatchStatusesProvider`.
 * 
 * @returns The context value containing columns and manipulation functions.
 * 
 * @example
 * ```tsx
 * const { columns, moveColumn, addColumn } = useVacancyMatchStatuses();
 * ```
 
 */
export const useVacancyMatchStatuses = () => {
  const context = useContext(VacancyMatchStatusesContext)
  if (!context) {
    throw new Error('useVacancyMatchStatuses must be used within VacancyMatchStatusesProvider')
  }
  return context
}