import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useToast } from "./use-toast";
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData";
import { TCandidateShort } from "@/shared/api/types";
import { updateMatch } from "@/shared/api/updateData";

/**
 * Custom hook to handle the update of a match's status, with optimistic UI updates and error handling.
 * It allows updating the match's status either via a form data object or a new status ID.
 *
 * The hook provides a function `startMatchUpd` to initiate the update and manage the optimistic update
 * and error recovery. It also returns a flag `isUpdating` to indicate if the update operation is in progress.
 *
 * @param matchId - The ID of the match to be updated.
 *
 * @returns An object containing:
 *   - `isUpdating`: A boolean indicating if the update process is pending.
 *   - `startMatchUpd`: A function to initiate the update process, accepting either FormData or a new status ID,
 *                      and the initial status ID of the match.
 *
 * @example
 * const { isUpdating, startMatchUpd } = useUpdateMatch(matchId);
 * startMatchUpd(newStatusId, initialStatusId);
 * // Or with form data
 * startMatchUpd(formData, initialStatusId);
 *
 * @throws Will handle errors by showing a toast message and reverting the changes if the update fails.
 */

export const useUpdateMatch = (matchId?: number) => {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const startMatchUpd = (
    formDataOrNewStatusId: FormData | number,
    initialStatusId: number
  ) => {
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
      if (!matchId) return;

      const updateMatchWithId = updateMatch.bind(null, matchId);

      //Optimistic updating of the board
      //Store prev state of the initial matches col and of the target
      const oldStatusMatches: TCandidateShort[] | undefined =
        queryClient.getQueryData(["matchByStatus", initialStatusId]);

      const targetStatusMatches: TCandidateShort[] | undefined =
        queryClient.getQueryData(["matchByStatus", newStatusId]);

      //check if cache exists, to use optimistic update or not
      const shouldUpdateOptimistic =
        !!oldStatusMatches && !!targetStatusMatches;

      if (shouldUpdateOptimistic) {
        const movedCandidate = oldStatusMatches.find(
          (match) => match.id === matchId
        );
        //Optimistic update of the cache
        queryClient.setQueryData(
          ["matchByStatus", initialStatusId],
          (prevData: TCandidateShort[]) =>
            prevData.filter((match) => match.id !== matchId)
        );
        if (movedCandidate) {
          queryClient.setQueryData(
            ["matchByStatus", newStatusId],
            (prevData: TCandidateShort[]) =>
              [...prevData, movedCandidate].sort((a, b) => a.id - b.id)
          );
        }
      }

      //Request to server
      const { error } = await updateMatchWithId(null, newMatchData);

      if (error) {
        if (shouldUpdateOptimistic) {
          queryClient.setQueryData(
            ["matchByStatus", initialStatusId],
            oldStatusMatches
          );
          queryClient.setQueryData(
            ["matchByStatus", newStatusId],
            targetStatusMatches
          );
        }
        toast({
          variant: "destructive",
          description: "Ошибка при обновлении мэтча",
        });
        return;
      }

      if (!shouldUpdateOptimistic) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["matchByStatus", initialStatusId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["matchByStatus", newStatusId],
          }),
        ]);
      }
    });
  };
  return {
    isUpdating: isPending,
    startMatchUpd,
  };
};
