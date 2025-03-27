'use client'
import { ECvStatus } from "@/shared/types/resume";
import List from "../../../ui/list";
import { Card } from "../../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { MapPin } from "lucide-react";
import { Badge } from "../../../ui/badge";
import { workStatusDict } from "@/shared/dictionaries/resume";
import { formatPrice } from "@/lib/utils/formatersIntl";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import EditEntityModal from "../../../modals/EditEntityModal";
import { getDurationFromMonths } from "@/lib/utils/getDurationFromMonths";
import Loader from "@/components/shared/Loader";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import ScrollUpBtn from "@/components/buttons/ScrollUpBtn";


const badgeColors = {
  [ECvStatus.LOOKING]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  [ECvStatus.CONSIDERING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [ECvStatus.NOT_LOOKING]: 'ring-muted-foreground text-muted-foreground hover:text-white hover:bg-muted-foreground/70',
  [ECvStatus.OFFER]: 'ring-sky-500 text-sky-500 hover:text-white hover:bg-sky-500/70',
  default: 'ring-gray-300 text-gray-300 hover:text-white hover:bg-gray-300/70'
}


const ReserveList = () => {
  const {
    resumeList,
    firstElementRef,
    lastElementRef,
    isFetchingNextPage,
    isFetchingPreviousPage,
    scrollToElementRef,
    indexTo,
    handleScrollUp
  } = useInfiniteScroll()

  return (
    <div className="self-start grow pb-10">
      <ScrollUpBtn onClick={handleScrollUp} />
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
              className="text-lg w-[min(100%,850px)] mx-auto"
            >
              <Card className="py-2 px-6 min-h-[102px] flex gap-6 items-center justify-between h-full relative">

                <Avatar >
                  <AvatarImage
                    src={resume.candy_photo}
                    alt={`${resume.candy_name} avatar`}
                  />
                  <AvatarFallback>
                    {(resume.candy_name || '').at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-[40%] mr-auto">
                  <p>
                    {resume.candy_name || 'Имя не указано'}
                  </p>
                  <p className="font-semibold">
                    {resume.name}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin size={16} />
                    {resume.candy_location || 'Не указан'}
                  </p>
                </div>
                <div className="w-[25%]">
                  <p>
                    {getDurationFromMonths(resume.experience_months)}
                  </p>
                  <Badge className={cn("py-1 bg-transparent ring-1", badgeColors[resume.status || 'default'])}>
                    {workStatusDict[resume.status] || 'не установлен'}
                  </Badge>
                </div>
                <div className="w-[25%]">
                  <p className="font-medium">
                    {formatPrice(resume.salary || 0, 'ru-Ru', 'RUB')}
                  </p>
                  <p>
                    {format(new Date(), "d MMMM yyyy", { locale: ru })}
                  </p>
                </div>
                <EditEntityModal entityType="resume" triggerView="icon" initialData={resume} className="absolute right-0 top-0" />
              </Card>
            </li>
          )
        })}
      </List>
      <div
        ref={lastElementRef}
        data-id="bottomBoundary"
        className="min-h-2 relative"
      >
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}

export default ReserveList;