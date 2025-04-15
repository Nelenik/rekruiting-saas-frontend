import { AddEntity } from '@/features/mutate-entity';
// import { groupBy } from '@/shared/lib/array_manipulations/groupBy';
// import { useVacancies } from '@/entities/vacancy';
import { VacanciesBoard } from '@/widgets/vacancies-board';
// import { useMemo } from 'react';


const VacanciesPage = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <AddEntity entityType='vacancy' className="lg:w-max ml-auto" />
      <VacanciesBoard />
    </div>
  );
}

export default VacanciesPage;