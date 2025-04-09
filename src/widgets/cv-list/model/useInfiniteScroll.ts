import { getResumeList } from "@/shared/api/getData";
import { CV_PER_PAGE } from "@/shared/constants/constants";
import { useScrollContainer } from "@/shared/providers/ScrollProvider";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Custom hook to fetch and manage an infinite list of resumes.
 *
 * @param {Record<string, string>} filters - An object containing filter parameters for the request.
 * @returns {UseInfiniteQueryResult<TData, TError>} - The infinite query result object from React Query.
 *
 * This hook:
 * - Fetches resume data based on provided filters.
 * - Implements infinite scrolling with pagination.
 * - Determines the next and previous pages dynamically.
 * - Caches fetched data for 5 minutes (`gcTime`).
 * - Uses `staleTime: 0` to always fetch fresh data when refetching.
 *
 * Pagination behavior:
 * - `getNextPageParam`: Increments the page number unless the total pages are reached.
 * - `getPreviousPageParam`: Decrements the page number unless already at the first page.
 * - `select`: Flattens the response to return only the `data` array.
 */
const useInfiniteData = (filters: Record<string, string>) =>
  useInfiniteQuery({
    queryKey: ["reserve-infinite-list", filters],
    queryFn: async ({ pageParam }) => {
      const result = await getResumeList({
        ...filters,
        page: String(pageParam),
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      const { total, currentPage = 1 } = lastPage;
      const pagesCount = total ? Math.ceil(total / CV_PER_PAGE) : 1;
      const next = currentPage + 1;
      if (next > pagesCount) return null;
      return next;
    },
    getPreviousPageParam: (firstPage) => {
      const { currentPage = 1 } = firstPage;
      const prev = currentPage - 1;
      if (prev < 1) return null;
      return prev;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    maxPages: 5,
    select: ({ pages }) => pages.flatMap((page) => page.data || []),
  });

export const useInfiniteScroll = () => {
  const { scrollContainerRef } = useScrollContainer();
  const firstElementRef = useRef<HTMLDivElement | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const filters = useMemo(
    () => (searchParams ? Object.fromEntries(searchParams.entries()) : {}),
    [searchParams]
  );

  // Infinite query hook to handle fetching resumes.
  const {
    data: resumeList = [],
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteData(filters);

  // The direction state controls the scroll behavior (start vs. end).
  // If direction is false, it scrolls to the "end"; if true, it scrolls to the "start".
  const [direction, setDirection] = useState(false);
  const [indexTo, setIndexTo] = useState(0);

  const scrollToElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !scrollContainerRef.current) return;

      node.scrollIntoView({
        block: direction ? "start" : "end",
        behavior: "auto",
      });
    },
    [direction, scrollContainerRef]
  );

  // This effect decides which element to scroll to based on the direction.
  useEffect(() => {
    const newIndex = direction
      ? CV_PER_PAGE
      : Math.max(0, resumeList.length - CV_PER_PAGE);
    setIndexTo(newIndex);
  }, [direction, resumeList]);

  // Intersection Observer callback to handle when top or bottom of the list is visible.

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const root = scrollContainerRef.current;
      if (!root) return;

      entries.forEach(async (entry) => {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting || el.dataset.ignore) return;
        if (el.dataset.id === "topBoundary" && hasPreviousPage) {
          setDirection(true);
          await fetchPreviousPage();
        } else if (el.dataset.id === "bottomBoundary" && hasNextPage) {
          setDirection(false);
          await fetchNextPage();
        }
      });
    },
    [
      fetchNextPage,
      fetchPreviousPage,
      hasNextPage,
      hasPreviousPage,
      scrollContainerRef,
    ]
  );

  // This effect initializes the Intersection Observer for the top and bottom elements.
  useEffect(() => {
    if (!resumeList.length) return;
    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollContainerRef.current,
    });

    if (firstElementRef.current) {
      observer.observe(firstElementRef.current);
    }
    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [handleIntersection, resumeList.length, scrollContainerRef]);

  // This block resets query cache to first page with coresponding filters.
  const queryClient = useQueryClient();
  const resetToFirstPage = useCallback(async () => {
    setDirection(false);
    const firstPage = await getResumeList({ ...filters, page: "1" });

    if (firstElementRef.current)
      firstElementRef.current.dataset.ignore = "true";
    if (lastElementRef.current) lastElementRef.current.dataset.ignore = "true";

    queryClient.setQueryData(["reserve-infinite-list", filters], {
      pages: [firstPage],
      pageParams: [1],
    });
    setTimeout(() => {
      if (firstElementRef.current)
        delete firstElementRef.current.dataset.ignore;
      if (lastElementRef.current) delete lastElementRef.current.dataset.ignore;
    }, 100);
  }, [filters, queryClient]);

  return {
    resumeList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    firstElementRef,
    lastElementRef,
    indexTo,
    scrollToElementRef,
    resetToFirstPage,
  };
};
