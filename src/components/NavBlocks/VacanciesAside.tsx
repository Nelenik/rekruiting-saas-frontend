'use client'

import ArchiveIcon from '@/assets/icons/archive.svg?rc';
import AddVacancyDialog from "../AddVacancyDialog";
import VacancyCard from "../Cards/VacancyCard";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { VacancyBasic } from '@/types/vacancyTypes';
import { getTimePartsFromSec } from '@/lib/utils/getTimePartsFromSec';

interface IVacanciesAside {
  className?: string
  basicVacancies: VacancyBasic[]
}

const VacanciesAside = ({ basicVacancies = [], className }: IVacanciesAside) => {
  const path = usePathname()
  const params = useParams()
  //clean current route from prev vacancy segment
  const cleanedPath = params?.vacancyDetails
    ? path.replace(new RegExp(`\/${params.vacancyDetails}$`), '')
    : path;

  return (
    <aside className={cn("relative w-full shrink-0 flex flex-col gap-6 lg:w-60", className)}>
      <AddVacancyDialog className="self-start " />
      <div className="gap-1.5 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] auto-rows-auto lg:grid-cols-1">
        {basicVacancies.map(vacancy => {
          const { VacName, VacStatus, id, VacCrD } = vacancy

          //get vacancy timestamp in seconds to transform in days for rendering
          const vacancyTimestamp = Math.floor((new Date().getTime() - new Date(VacCrD).getTime()) / 1000)
          const { days } = getTimePartsFromSec(vacancyTimestamp)

          return (
            <Link key={id} href={`${cleanedPath}/${VacName}-${id}`}>
              <VacancyCard vacancyName={VacName} daysInProcessing={days} vacancyStatus={VacStatus} className='h-full' />
            </Link>
          )
        })}
      </div>
      <a href="/#" className='absolute top-3 right-0 lg:static'>
        <ArchiveIcon className="inline mr-2 text-blue-500" /> <span className="underline underline-offset-2 text-blue-500">Архив</span>
      </a>
    </aside>
  );
}

export default VacanciesAside;