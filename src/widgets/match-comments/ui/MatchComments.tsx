import { MessageCircleMore } from "lucide-react";
import { FC } from "react";
import { InfiniteMatchComments } from "./InfiniteMatchComments";
import { CommentsForm } from "@/entities/comment";

type TProps = {
  matchId: number | string
}

export const MatchComments: FC<TProps> = ({
  matchId
}) => {

  return (
    <div className="flex flex-col gap-6">
      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight flex items-center gap-2">
        <MessageCircleMore className="stroke-muted-foreground" />
        Комментарии
      </h2>
      <CommentsForm matchId={matchId} />
      <InfiniteMatchComments matchId={matchId} />
    </div>
  );
}
