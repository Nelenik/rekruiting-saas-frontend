import { TStatus } from "@/shared/api/types";
import { useState, useMemo, useCallback } from "react";
import { useVacancyMatchStatuses } from "@/entities/vacancy";

/**
 * Custom hook for managing the column menu actions such as adding, editing, and deleting columns.
 * It provides the necessary state and functions to control the menu and perform actions on a column.
 *
 * @param columnId - The ID of the column to manage.
 *
 * @returns An object containing the following properties:
 * - `open`: A boolean indicating whether the menu is open.
 * - `columnInitialData`: The initial data for the column, or `undefined` if not found.
 * - `selectedAction`: The currently selected action, or `null` if no action is selected.
 * - `setSelectedAction`: Function to update the selected action.
 * - `toggleMenu`: Function to toggle the menu's open state.
 * - `openMenu`: Function to open the menu.
 * - `closeMenu`: Function to close the menu.
 * - `handleAddColumn`: Function to add a new column at the specified position.
 * - `handleEditColumn`: Function to edit an existing column with the given status changes.
 * - `handleDeleteColumn`: Function to delete the column.
 *
 * @example
 * ```tsx
 * const {
 *   open,
 *   columnInitialData,
 *   selectedAction,
 *   handleAddColumn,
 *   handleEditColumn,
 *   handleDeleteColumn
 * } = useColumnMenu(1);
 * ```
 */

export const useColumnMenu = (columnId: number | string) => {
  const [open, setOpen] = useState(false);

  const { addColumn, deleteColumn, updateColumn, columns } =
    useVacancyMatchStatuses();

  const columnInitialData = useMemo(
    () => columns.find((item) => item.id === columnId),
    [columns, columnId]
  );

  const [selectedAction, setSelectedAction] = useState<
    "add-left" | "add-right" | "edit" | null
  >(null);

  //menu controls

  const toggleMenu = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSelectedAction(null);
  }, []);

  const openMenu = useCallback(() => setOpen(true), []);

  const closeMenu = useCallback(() => setOpen(false), []);

  //
  const handleAddColumn = useCallback(
    (newStatus: TStatus, position: "left" | "right") => {
      addColumn(columnId, newStatus, position);
      setSelectedAction(null);
      closeMenu();
    },
    [addColumn, closeMenu, columnId]
  );

  const handleEditColumn = useCallback(
    (statusChanges: TStatus) => {
      updateColumn(columnId, statusChanges);
      setSelectedAction(null);
      closeMenu();
    },
    [closeMenu, columnId, updateColumn]
  );

  const handleDeleteColumn = useCallback(() => {
    deleteColumn(columnId);
  }, [columnId, deleteColumn]);

  return {
    open,
    columnInitialData,
    selectedAction,
    setSelectedAction,
    toggleMenu,
    openMenu,
    closeMenu,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  };
};
