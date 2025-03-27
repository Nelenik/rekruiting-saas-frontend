import { CV_PER_PAGE } from "@/actions/constants";
import { getResumeList } from "@/actions/getData";
import { useScrollContainer } from "@/providers/ScrollProvider";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useInfiniteScroll = () => {
  const { scrollContainerRef } = useScrollContainer();
  const firstElementRef = useRef<HTMLDivElement | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  // The direction state controls the scroll behavior (start vs. end).
  // If direction is false, it scrolls to the "end"; if true, it scrolls to the "start".
  const [direction, setDirection] = useState(false);
  const [indexTo, setIndexTo] = useState(0);

  const scrollToElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !scrollContainerRef.current) return;

      node.scrollIntoView({
        block: direction ? "start" : "end",
        behavior: "smooth",
        inline: "nearest",
      });
    },
    [direction, scrollContainerRef]
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
  } = useInfiniteQuery({
    queryKey: ["reserve-infinite-list", filters],
    queryFn: async ({ pageParam }) => {
      const { page, direction } = pageParam;
      setDirection(direction);
      const result = await getResumeList({
        ...filters,
        page: String(page),
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      const { total, currentPage = 1 } = lastPage;
      const pagesCount = total ? Math.ceil(total / CV_PER_PAGE) : 1;
      const next = currentPage + 1;
      if (next > pagesCount) return null;
      return {
        page: next,
        direction: false, //'end'
      };
    },
    getPreviousPageParam: (firstPage) => {
      const { currentPage = 1 } = firstPage;
      const prev = currentPage - 1;
      if (prev < 1) return null;
      return {
        page: prev,
        direction: true, //'start'
      };
    },
    initialPageParam: {
      page: 1,
      direction: false, //'end'
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    maxPages: 5,
    select: ({ pages }) => pages.flatMap((page) => page.data || []),
  });

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
        if (!entry.isIntersecting) return;
        console.log("Intersecting element:", el.dataset.id);
        if (el.dataset.id === "topBoundary" && hasPreviousPage) {
          await fetchPreviousPage();
        } else if (el.dataset.id === "bottomBoundary" && hasNextPage) {
          console.log("next page");
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
    if (resumeList.length === 0) return;
    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollContainerRef.current,
      threshold: 0.5,
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
  }, [handleIntersection, scrollContainerRef, resumeList]);

  // This block handles scrolling back to the first page and updating the query cache.
  const queryClient = useQueryClient();
  const handleScrollUp = async () => {
    queryClient.resetQueries({ queryKey: ["reserve-infinite-list", filters] });

    // const firstPage = await getResumeList(filters);
    // queryClient.setQueryData(["reserve-infinite-list", filters], {
    //   pages: [firstPage],
    //   pageParams: [
    //     {
    //       page: 1,
    //       direction: false, //'end'
    //     },
    //   ],
    // });
  };

  return {
    resumeList,
    isFetchingNextPage,
    isFetchingPreviousPage,
    firstElementRef,
    lastElementRef,
    indexTo,
    scrollToElementRef,
    handleScrollUp,
  };
};
