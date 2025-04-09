import SpinnerOne from '@/assets/icons/spinner1.svg?rc'
import { TComment } from "@/shared/api/types/comments";
import List from "@/shared/ui/shadcn/list";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";
import { Comment } from "./Comment";
import { Separator } from "@/shared/ui/shadcn/separator";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from '@/shared/lib/utils';

type TProps = {
  comments: TComment[],
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void
}
export const CommentsList = ({
  comments,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage = () => { }
}: TProps) => {
  return (
    <div className="ring-2 rounded-sm ring-offset-2 ring-primary/10">
      <ScrollArea className="h-[60vh] ">
        <List className="flex flex-col gap-6 p-6" >
          {(comments || []).map((comment: TComment, i, array) => (
            <li key={comment.id} className="flex flex-col gap-2 text-sm ">
              <Comment comment={comment} />
              {i !== array.length - 1 && <Separator className="bg-primary/10" />}
            </li>
          ))}

          {hasNextPage && <li className="self-center">
            <Button
              onClick={fetchNextPage}
              variant={'outline'}
              className={cn(
                'ring-2 ring-input ring-offset-1 border-none',
                "hover:bg-input @3xl:self-stretch"
              )}
            >
              Загрузить еще
              {isFetchingNextPage && <SpinnerOne className="text-white" />}
            </Button>
          </li>}
        </List>
      </ScrollArea>
    </div>
  );
}