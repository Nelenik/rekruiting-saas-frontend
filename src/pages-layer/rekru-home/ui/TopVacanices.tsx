'use client'

import { RekruVacancyCard } from "@/entities/vacancy";
import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type TProps = {
  topList: TPublicVacancy[]
}
export const TopVacancies = ({
  topList
}: TProps) => {
  const [visibleCount, setVisibleCount] = useState(3)
  const visibleItems = topList.slice(0, visibleCount)

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3)
  }
  return (
    <>
      <h2 className={cn(
        'mb-5 md:mb-10 text-3xl font-semibold tracking-tighter text-center',
        'lg:text-5xl'
      )}>
        Топ-вакансии компаний от Rekru.ru
      </h2>

      <div className="flex flex-col gap-5">
        <ul className="flex flex-col gap-5">
          {visibleItems.map(vacancy => (
            <li key={vacancy.id}>
              <RekruVacancyCard vacancy={vacancy} />
            </li>
          ))}
        </ul>
        {(visibleCount < topList.length) && (<Button
          variant={'ghost'}
          className="flex gap-3 items-center text-base font-medium leading-tight"
          onClick={handleShowMore}
        >
          Смотреть еще вакансии
          <ChevronDown />
        </Button>)}
      </div>

    </>
  );
}