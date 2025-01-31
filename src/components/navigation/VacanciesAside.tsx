'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import ArchiveIcon from '@/assets/icons/archive.svg?rc';
import { cn } from '@/lib/utils';
import { getTimePartsFromSec } from '@/lib/utils/getTimePartsFromSec';
import { TVacancyShort } from '@/shared/types';

import { AddVacancyModal } from '../modals/AddVacancyModal';
import { VacancyCard } from '../cards/VacancyCard';
import { useVacancies } from '@/providers/VacanciesProvider';

type TProps = {
  className?: string;
};

export const VacanciesAside: FC<TProps> = ({ className }) => {
  const path = usePathname();
  const params = useParams();
  const vacancies = useVacancies()

  const cleanedPath = params?.vacancyId
    ? path.replace(new RegExp(`\/${params.vacancyId}$`), '')
    : path;

  return (
    <aside
      className={cn(
        'relative w-full shrink-0 flex flex-col gap-6 lg:w-60',
        className
      )}
    >
      <AddVacancyModal className="self-start" />

      <div className="gap-1.5 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] auto-rows-auto lg:grid-cols-1">
        {vacancies.map((vacancy) => {
          const vacancyTimestamp = Math.floor(
            (new Date().getTime() - new Date(vacancy.created_at).getTime()) /
            1000
          );
          const { days } = getTimePartsFromSec(vacancyTimestamp);

          return (
            <Link
              key={vacancy.id}
              href={`${cleanedPath}/${vacancy.id}?vacancyName=${vacancy.name}`}
            >
              <VacancyCard
                vacancyName={vacancy.name}
                daysInProcessing={days}
                vacancyStatus={vacancy.status}
                className="h-full"
              />
            </Link>
          );
        })}
      </div>

      <Link href="/#" className="absolute top-3 right-0 lg:static">
        <ArchiveIcon className="inline mr-2 text-blue-500" />{' '}
        <span className="underline underline-offset-2 text-blue-500">
          Архив
        </span>
      </Link>
    </aside>
  );
};
