'use client'

import ArchiveIcon from '@/assets/icons/archive.svg?rc';
import AddVacancyDialog from "../AddVacancyDialog";
import VacancyCard from "../Cards/VacancyCard";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface IVacanciesAside {
  className?: string
}

//for term uses
const tempMockData = [
  { id: 1, name: "Менеджер по продажам", days: 3, status: "В работе", },
  { id: 2, name: "Разарботчик", days: 17, status: "Ожидание", },
  { id: 3, name: "Разарботчик", days: 4, status: "Настройка", }
]


const VacanciesAside = ({ className }: IVacanciesAside) => {
  const path = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  //clean current route from prev vacancy segment
  const cleanedPath = params?.vacancy
    ? path.replace(new RegExp(`\/${params.vacancy}$`), '')
    : path;

  return (
    <aside className={cn("w-full lg:w-60 shrink-0 flex flex-col gap-6 ", className)}>
      <AddVacancyDialog className="self-start " />
      <div className="gap-1.5 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] lg:grid-cols-1">
        {tempMockData.map(el => (
          <Link key={el.id} href={`${cleanedPath}/${el.name}?${searchParams.toString()}`}>
            <VacancyCard vacancyName={el.name} daysInProcessing={el.days} vacancyStatus={el.status} />
          </Link>
        ))}
      </div>
      <a href="/#">
        <ArchiveIcon className="inline mr-2 text-blue-500" /> <span className="underline underline-offset-2 text-blue-500">Архив</span>
      </a>
    </aside>
  );
}

export default VacanciesAside;