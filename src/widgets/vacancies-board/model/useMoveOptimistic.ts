import { TVacancyShort } from "@/shared/api/types";
import { updateVacancy } from "@/shared/api/updateData";
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData";
import { useToast } from "@/shared/model/hooks/use-toast";
import { useState, useEffect, useOptimistic, useTransition } from "react";

type TGroupedVacancies = Record<string, TVacancyShort[]>;

export const useMoveOptimistic = (groupedItems: TGroupedVacancies) => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<TGroupedVacancies>(groupedItems);

  //set initial items grouped by status_id
  useEffect(() => {
    setGroups(groupedItems);
  }, [groupedItems]);

  const [, startTransition] = useTransition();

  const [optimisticGroups, updateOptimistic] = useOptimistic(
    groups,
    (currentState, optimisticData: TGroupedVacancies) => ({
      ...currentState,
      ...optimisticData,
    })
  );

  const moveBetweenColumns = async (
    sourceStatus: number,
    targetStatus: number,
    activeItem: TVacancyShort,
    overIndex?: number
  ) => {
    const sourceItems = [...groups[sourceStatus]];
    const targetItems = [...(groups[targetStatus] || [])];
    const updateVacancyWithId = updateVacancy.bind(null, activeItem.id);

    startTransition(async () => {
      let optimisticData: TGroupedVacancies;
      if (overIndex) {
        //if we move the item between columns and item is over another item
        optimisticData = {
          [sourceStatus]: sourceItems.filter(
            (item) => item.id !== activeItem.id
          ),
          [targetStatus]: [
            ...targetItems.slice(0, overIndex),
            { ...activeItem, status_id: targetStatus },
            ...targetItems.slice(overIndex),
          ],
        };
      } else {
        //if we move between columns and item is over column
        optimisticData = {
          [sourceStatus]: sourceItems.filter(
            (vac: TVacancyShort) => vac.id !== activeItem.id
          ),
          [targetStatus]: [
            ...targetItems,
            { ...activeItem, status_id: Number(targetStatus) },
          ],
        };
      }

      //make optimistic update of the state
      updateOptimistic(optimisticData);
    });
    //make updating at server
    // const { error } = await updateVacancyWithId(
    //   null,
    //   convertToFormData({ name: activeItem.name, status_id: targetStatus })
    // );
    // if (error) {
    //   toast({
    //     variant: "destructive",
    //     description: "Ошибка при обновлении статуса вакансии",
    //   });
    // } else {
    //   setGroups(optimisticGroups);
    // }
    // setGroups(optimisticGroups);
  };

  return {
    optimisticGroups,
    moveBetweenColumns,
  };
};
