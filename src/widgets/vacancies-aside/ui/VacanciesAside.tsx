'use client';

import { FC, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import ArchiveIcon from '@/assets/icons/archive.svg?rc';
import { useVacancies } from '@/entities/vacancy';
import { cn } from '@/shared/lib/utils';
import { VacancyCard } from '@/entities/vacancy/ui/VacancyCard';
import { AddEntity } from '@/features/mutate-entity';
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area';

type TProps = {
  className?: string;
};
export const VacanciesAside: FC<TProps> = ({ className }) => {
  const { companyId, vacancyKeys } = useParams(); //vacancyKeys = [{:vacancyId}, {:vacancyName}]
  const vacancies = useVacancies()
  const cleanedPath = `/dashboard/${companyId}/vacancies`
  return (
    <aside
      className={cn(
        'relative w-full shrink-0 flex flex-col gap-6 lg:w-60',
        className
      )}
    >
      <AddEntity entityType='vacancy' className="self-start" />
      <Suspense fallback={'loading'}>

        <ScrollArea
          type='always'
          className="lg:max-h-[70dvh] max-h-[400px] px-2"
        >

          <div className="gap-1.5 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] auto-rows-auto lg:grid-cols-1 py-1">
            {vacancies.map((vacancy) => {
              const isActive = vacancyKeys && vacancy.id === Number(vacancyKeys[1]);
              return (
                <Link
                  ref={isActive ? (el) => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) : null}
                  key={vacancy.id}
                  href={`${cleanedPath}/${vacancy.id}/${vacancy.name}`}
                >
                  <VacancyCard
                    vacancyName={vacancy.name}
                    createdAt={vacancy.created_at}
                    vacancyStatus={vacancy.status_id}
                    className={cn("h-full", isActive && 'bg-slate-100 border-primary dark:bg-slate-800')}
                  />

                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </Suspense>

      <Link href="/#" className="absolute top-3 right-0 lg:static">
        <ArchiveIcon className="inline mr-2 text-blue-500" />{' '}
        <span className="underline underline-offset-2 text-blue-500">
          Архив
        </span>
      </Link>
    </aside>
  );
};
