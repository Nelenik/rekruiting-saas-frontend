'use client'
import { MATCH_COMMENTS_PER_PAGE } from "@/actions/constants";
import { getMatchCommentList } from "@/actions/getData";
import { Button } from "@/components/ui/button";
import List from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { TComment } from "@/shared/types/comments";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FC } from "react";
import SpinnerOne from '@/assets/icons/spinner1.svg?rc'
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type TProps = {
  matchId: string | number
}

const CommentsList: FC<TProps> = ({
  matchId
}) => {
  const {
    data: comments = [],
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['match-comments'],
    queryFn: async ({ pageParam }) => {
      const result = await getMatchCommentList(matchId, pageParam);
      return result;
    },
    getNextPageParam: (lastPage) => {
      const { total, currentPage = 1 } = lastPage;
      const pagesCount = total ? Math.ceil(total / MATCH_COMMENTS_PER_PAGE) : 1;
      const next = currentPage + 1;
      if (next > pagesCount) return null;
      return next;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    select: ({ pages }) => pages.flatMap((page) => page.data || []),
  });

  const handleGetNextPage = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  // // ref callback to scroll coments to last message
  // const scrollToLastComment = useCallback((node: HTMLLIElement) => {
  //   node?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest'
  //   })
  // }, [])

  return (
    <div className="ring-2 rounded-sm ring-offset-2 ring-primary/10">
      <ScrollArea className="h-[60vh] ">
        <List className="flex flex-col gap-6 p-6" >
          {(comments || []).map((comment: TComment, i, array) => (
            <li key={comment.id} className="flex flex-col gap-2 text-sm ">
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
              {i !== array.length - 1 && <Separator className="bg-primary/10" />}
            </li>
          ))}

          {hasNextPage && <li className="self-center">
            <Button
              onClick={handleGetNextPage}
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

export default CommentsList;