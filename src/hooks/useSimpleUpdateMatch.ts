import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useToast } from "./use-toast";
import { updateMatch } from "@/actions/updateData";

export const useSimpleUpdateMatch = (matchId: number) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const startMatchUpd = (newMatchData: FormData) => {
    startTransition(async () => {
      if (!matchId) return;

      const updateMatchWithId = updateMatch.bind(null, matchId);

      //Request to server
      const { error } = await updateMatchWithId(null, newMatchData);

      if (error) {
        toast({
          variant: "destructive",
          description: "Ошибка при обновлении мэтча",
        });
        return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["matchByStatus"],
      });
    });
  };
  return {
    isUpdating: isPending,
    startMatchUpd,
  };
};
