import { useVacancies } from "@/entities/vacancy";
import { groupBy } from "@/shared/lib/array_manipulations/groupBy";
import { useCallback, useEffect, useState } from "react";
import { TGroupedVacancies } from "./types";
import { syncByOrder } from "@/widgets/vacancies-board/lib/syncByOrder";
import { useLocalStorageRef } from "@/shared/model/hooks/useLocalStorageRef";

export const useGroupedVacancies = () => {
  const vacancies = useVacancies();

  const [storedValue, setStoredValue] = useLocalStorageRef<
    Record<string, number[]>
  >("vacancies-board", {});

  const [groups, setGroups] = useState<null | TGroupedVacancies>(null);

  useEffect(() => {
    if (!vacancies.length) return;
    const rawGrouped = groupBy(vacancies, (el) => String(el.status_id));

    const syncedGroups: TGroupedVacancies = {};

    for (const [k, value] of Object.entries(rawGrouped)) {
      const localOrder = storedValue.current[k];
      syncedGroups[k] = localOrder ? syncByOrder(value, localOrder) : value;
    }
    setGroups(syncedGroups);
  }, [storedValue, vacancies]);

  const updateGroups = useCallback(
    (currentGroups: TGroupedVacancies) => {
      const newOrder: Record<string, number[]> = {};
      for (const [k, value] of Object.entries(currentGroups)) {
        newOrder[k] = value.map((el) => el.id);
      }
      setStoredValue(newOrder);
      setGroups(currentGroups);
    },
    [setStoredValue]
  );
  return {
    groups,
    updateGroups,
    isLoading: groups === null,
  };
};
