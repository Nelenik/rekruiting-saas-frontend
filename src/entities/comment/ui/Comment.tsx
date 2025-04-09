import { TComment } from "@/shared/api/types";
import { format } from "date-fns";

type TProps = {
  comment: TComment
}
export const Comment = ({
  comment
}: TProps) => {
  return (
    <>
      <h3 className='font-semibold text-sm'>
        <span className="mr-3">
          {'Автор'}
        </span>
        <span className="italic text-xs">
          {format(new Date(comment.created_at), 'dd.MM.yyyy')}
        </span>
      </h3>
      <p className="text-muted-foreground text-sm">
        {comment.content}
      </p>
    </>
  );
}