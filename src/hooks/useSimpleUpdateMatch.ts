import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useToast } from "./use-toast";
import { updateMatch } from "@/actions/updateData";

export const useSimpleUpdateMatch = (matchId: number) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const startMatchUpd = (newMatchData: FormData, initialStatusId: number) => {
    startTransition(async () => {
      if (!matchId) return;
      const newStatusId = newMatchData.get("status_id");

      const updateMatchWithId = updateMatch.bind(null, matchId);

      //Request to server
      const { error } = await updateMatchWithId(newMatchData);

      if (error) {
        toast({
          variant: "destructive",
          description: "Ошибка при обновлении мэтча",
        });
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["matchByStatus", initialStatusId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["matchByStatus", newStatusId],
        }),
      ]);
    });
  };
  return {
    isUpdating: isPending,
    startMatchUpd,
  };
};
