'use client'
import { CommentsList } from "@/entities/comment";
import { getMatchCommentList } from "@/shared/api/getData";
import { MATCH_COMMENTS_PER_PAGE } from "@/shared/constants/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

type TProps = {
  matchId: number | string
}

export const InfiniteMatchComments = ({ matchId }: TProps) => {
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

  return (
    <CommentsList
      comments={comments}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}