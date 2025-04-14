import { updateMatch } from "@/shared/api/updateData";
import { useToast } from "@/shared/model/hooks/use-toast";
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData";
import { TCandidateShort } from "@/shared/api/types";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

/**
 * A custom hook for optimistically updating the status of a match.
 *
 * This hook allows you to trigger a status update for a specific match, with an
 * optimistic UI update handled via React Query's cache manipulation. It provides a
 * smooth user experience by instantly reflecting the expected UI state before the
 * server confirms the change.
 *
 * The optimistic update moves the candidate from one status column to another in the local
 * cache (`matchByStatus`) and rolls back if the API request fails.
 *
 * @param matchId - The ID of the match to be updated.
 *
 * @returns An object containing:
 * - `isUpdating`: A boolean indicating if the update is currently pending.
 * - `startMatchUpd`: A function to initiate the status update.
 *
 * @example
 * const { isUpdating, startMatchUpd } = useOptimisticUpdateMatch(123);
 *
 * startMatchUpd(2, 1); // Move match from status 1 to status 2
 */

export const useOptimisticUpdateMatch = (matchId?: number) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const startMatchUpd = (newStatusId: number, initialStatusId: number) => {
    //define data to update. may be
    const newMatchFormData = convertToFormData({ status_id: newStatusId });

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

      if (!shouldUpdateOptimistic) return;

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

      //Request to server
      const { error } = await updateMatchWithId(null, newMatchFormData);

      if (error && shouldUpdateOptimistic) {
        toast({
          variant: "destructive",
          description: "Ошибка при обновлении статуса мэтча",
        });
        queryClient.setQueryData(
          ["matchByStatus", initialStatusId],
          oldStatusMatches
        );
        queryClient.setQueryData(
          ["matchByStatus", newStatusId],
          targetStatusMatches
        );
        return;
      }
    });
  };

  return {
    isUpdating: isPending,
    startMatchUpd,
  };
};
