import { updateMatch } from "@/actions/updateData";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useToast } from "./use-toast";
import convertToFormData from "@/lib/utils/convertToFormData";

/**
 *
 * @param {number} matchId
 * @param {number} initialStatusId
 * @returns
 */

export const useUpdateMatch = (matchId: number, initialStatusId: number) => {
  const { toast } = useToast();
  const updateMatchWithId = updateMatch.bind(null, matchId);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const startUpdating = (formDataOrNewStatusId: FormData | number) => {
    let newStatusId: number;
    let newMatchData: FormData;

    if (formDataOrNewStatusId instanceof FormData) {
      newMatchData = formDataOrNewStatusId;
      newStatusId = Number(newMatchData.get("status_id"));
    } else {
      newStatusId = formDataOrNewStatusId;
      newMatchData = convertToFormData({ status_id: newStatusId });
    }

    startTransition(async () => {
      const { error } = await updateMatchWithId(newMatchData);
      if (!error) {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["matchCol", initialStatusId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["matchCol", newStatusId],
          }),
        ]);
      } else {
        toast({
          variant: "destructive",
          description: "Ошибка при обновлении данных",
        });
      }
    });
  };
  return {
    isPending,
    startUpdating,
  };
};
