'use client'
import VacanciesBoard from '@/components/dnd-boards/VacanciesBoard';
import AddEntityModal from '@/components/modals/AddEntityModal';
import { groupBy } from '@/lib/utils/groupBy';
import { useVacancies } from '@/providers/VacanciesProvider';
import { useMemo } from 'react';


const VacanciesPage = () => {
  const vacancies = useVacancies()
  const groupedVacs = useMemo(() => groupBy(vacancies, (el) => el.status), [vacancies])
  return (
    <div className="flex flex-col gap-6 h-full">
      <AddEntityModal entityType='vacancy' className="lg:w-max ml-auto" />
      <VacanciesBoard groupedItems={groupedVacs} />
    </div>
  );
}

export default VacanciesPage;