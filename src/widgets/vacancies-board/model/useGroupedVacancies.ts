import { useVacancies } from "@/entities/vacancy";
import { groupBy } from "@/shared/lib/array_manipulations/groupBy";
import { useCallback, useEffect, useState } from "react";
import { TGroupedVacancies } from "./types";
import { syncByOrder } from "@/widgets/vacancies-board/lib/syncByOrder";
import { useLocalStorageRef } from "@/shared/model/hooks/useLocalStorageRef";

/**
 * A React hook that groups vacancies by their status and synchronizes the order with local storage.
 *
 * It initializes and maintains grouped vacancies (`groups`) by their `status_id`,
 * using the persisted order from local storage if available.
 * The order can be updated using the `updateGroups` function, which also updates the local storage.
 *
 * @returns An object containing:
 * - `groups`: The currently grouped and ordered vacancies, or `null` while loading.
 * - `updateGroups`: Function to update the group state and persist the new order.
 * - `isLoading`: Boolean flag indicating whether the grouping is still being initialized.
 */
export const useGroupedVacancies = () => {
  // Get all current vacancies from context
  const vacancies = useVacancies();

  // Local storage-backed ref to store the order of vacancies by status
  const [storedOrder, setStoredOrder] = useLocalStorageRef<
    Record<string, number[]>
  >("vacancies-board", {});

  // Grouped vacancies state, initially null while loading
  const [groups, setGroups] = useState<null | TGroupedVacancies>(null);

  useEffect(() => {
    // If vacancies not loaded yet, skip grouping
    // if (!vacancies.length) return;

    // Group vacancies by status_id (as string keys)
    const rawGrouped = groupBy(vacancies, (el) => String(el.status_id));

    const syncedGroups: TGroupedVacancies = {};

    // Sync each group with the stored order if it exists
    for (const [k, value] of Object.entries(rawGrouped)) {
      const localOrder = storedOrder.current[k];
      syncedGroups[k] = localOrder ? syncByOrder(value, localOrder) : value;
    }

    // Set grouped and ordered vacancies
    setGroups(syncedGroups);
  }, [storedOrder, vacancies]);

  /**
   * Updates the current grouped vacancies and stores their new order in local storage.
   *
   * @param currentGroups - The new group state to persist.
   */
  const updateGroups = useCallback(
    (currentGroups: TGroupedVacancies) => {
      const newOrder: Record<string, number[]> = {};

      // Extract order of vacancy IDs from the new groupings
      for (const [k, value] of Object.entries(currentGroups)) {
        newOrder[k] = value.map((el) => el.id);
      }

      // Save the new order and update state
      setStoredOrder(newOrder);
      setGroups(currentGroups);
    },
    [setStoredOrder]
  );
  return {
    groups,
    updateGroups,
    isLoading: groups === null,
  };
};
