'use client'
import { AddEntity } from '@/features/mutate-entity';
import { groupBy } from '@/shared/lib/array_manipulations/groupBy';
import { useVacancies } from '@/shared/providers/VacanciesProvider';
import { VacanciesBoard } from '@/widgets/vacancies-board';
import { useMemo } from 'react';


const VacanciesPage = () => {
  const vacancies = useVacancies()

  const groupedVacs = useMemo(() => groupBy(vacancies, (el) => String(el.status_id)), [vacancies])

  return (
    <div className="flex flex-col gap-6 h-full">
      <AddEntity entityType='vacancy' className="lg:w-max ml-auto" />
      <VacanciesBoard groupedItems={groupedVacs} />
    </div>
  );
}

export default VacanciesPage;