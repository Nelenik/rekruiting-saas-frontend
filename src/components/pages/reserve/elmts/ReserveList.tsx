'use client'
import List from "../../../ui/list";
import Loader from "@/components/shared/Loader";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import ScrollUpBtn from "@/components/buttons/ScrollUpBtn";
import ReserveCvCard from "@/components/cards/ReserveCvCard";
import EditEntityModal from "@/components/modals/EditEntityModal";

const ReserveList = () => {
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
              <ReserveCvCard resume={resume} />
              <EditEntityModal entityType="resume" triggerView="icon" initialData={resume} className="absolute right-0 top-0" />
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

export default ReserveList;