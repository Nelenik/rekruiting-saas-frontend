'use client'

import { ScrollUpBtn } from "@/features/scrollup-btn";
import { useInfiniteScroll } from "../model/useInfiniteScroll";
import { Loader } from "@/shared/ui/custom/Loader";
import List from "@/shared/ui/shadcn/list";
import { CvCard } from "@/entities/cv";
import { EditEntity } from "@/features/mutate-entity";

export const CvList = () => {
  const {
    resumeList,
    firstElementRef,
    lastElementRef,
    isFetchingNextPage,
    isFetchingPreviousPage,
    scrollToElementRef,
    indexTo,
    resetToFirstPage
  } = useInfiniteScroll()

  return (
    <div className="self-start grow pb-10">
      <ScrollUpBtn onClick={resetToFirstPage} />
      <div
        ref={firstElementRef}
        data-id="topBoundary"
        className="relative"
      >
        {isFetchingPreviousPage && <Loader />}
      </div>
      <List className="flex flex-col gap-4">
        {resumeList.map((resume, index) => {
          return (
            <li
              ref={index === indexTo ? scrollToElementRef : null}
              key={resume.id}
              className="text-lg w-[min(100%,850px)] mx-auto relative"
            >
              <CvCard resume={resume} />
              <EditEntity
                entityType="cv"
                triggerView="icon"
                initialData={resume}
                className="absolute right-0 top-0"
              />
            </li>
          )
        })}
      </List>
      <div
        ref={lastElementRef}
        data-id="bottomBoundary"
        className="relative min-h-3"
      >
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
