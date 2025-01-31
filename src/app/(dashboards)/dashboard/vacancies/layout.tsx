import { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { getVacanciesList } from '@/actions/getData';
import { VacanciesAside } from '@/components/NavBlocks/VacanciesAside';

export const metadata: Metadata = {
  title: 'REkrutAI|Вакансии',
};

const VacanciesLayout: FC<PropsWithChildren> = async ({ children }) => {
  const vacancies = await getVacanciesList({ companyId: 0 });

  return (
    <div className="flex gap-10 flex-col w-full lg:gap-5 lg:flex-row">
      <VacanciesAside vacancies={vacancies} />

      <div className=" h-px bg-gray-400 w-2/3 self-center lg:hidden" />

      <div className="w-full lg:w-[calc(100%-240px-20px)]">{children}</div>
    </div>
  );
};

export default VacanciesLayout;
