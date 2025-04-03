'use client'

import { updateVacancy } from "@/actions/updateData"
import { useToast } from "@/hooks/use-toast"
import convertToFormData from "@/lib/utils/convertToFormData"
import { omitFields } from "@/lib/utils/omitFields"
import { TVacancy } from "@/shared/types"
import { TStatus } from "@/shared/types/statuses"
import { arrayMove } from "@dnd-kit/sortable"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState, useTransition } from "react"

type TVacancyContext = {
  vacancy: TVacancy,
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

const VacancyContext = createContext<TVacancyContext | null>(null)

export const SingleVacancyProvider = ({ children, vacancy }: { children: ReactNode, vacancy: TVacancy }) => {

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ['matchByStatus'] });
  }, [queryClient, vacancy.id]);

  //extract fields which are necessary for vacancy updating
  const vacancyEditData: TVacancyEdit = useMemo(() =>
    omitFields(vacancy, ["created_at", "match_hot_count", "match_count", "status", "status_id", "matchStatuses", "id"]),
    [vacancy]
  );

  const { toast } = useToast();
  //sort match statuses by rank to get right columns order
  const initColumns = vacancy.matchStatuses
    .toSorted((a, b) => a.rank - b.rank)
    .map((el) => el.status);

  const [columns, setColumns] = useState(initColumns);

  //transition to update column position
  const [, startTransition] = useTransition();

  //save the initial columns state to return to it if is needed
  const prevColumnsState = useRef(columns);

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

  const updateColumns = useCallback((newColumns: TStatus[]) => {
    setColumns(newColumns);
    updateAtServer(newColumns);
  }, [updateAtServer]);

  const moveColumn = useCallback((activeId: number | string, overId: number | string) => {
    const activeColIndex = columns.findIndex((col) => col.id === activeId);
    const overColIndex = columns.findIndex((col) => col.id === overId);
    const newColumns = arrayMove(columns, activeColIndex, overColIndex);
    updateColumns(newColumns);
  }, [columns, updateColumns]);

  const deleteColumn = useCallback((deletingColId: number | string) => {
    const newColumns = columns.filter((col) => col.id !== deletingColId);
    updateColumns(newColumns);
  }, [columns, updateColumns]);

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

  return (<VacancyContext value={{ vacancy, columns, moveColumn, addColumn, deleteColumn, updateColumn }}>
    {children}
  </VacancyContext>)
}

export const useSingleVacancy = () => {
  const context = useContext(VacancyContext)
  if (!context) {
    throw new Error('useSingleVacancy must be used within SingleVacancyProvider')
  }
  return context
}