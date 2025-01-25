import { FC } from 'react';

import { AddCompanyModal } from '@/components/Modals/AddCompanyModal';
import { AddResumeModal } from '@/components/Modals/AddResumeModal';
import { AddVacancyModal } from '@/components/Modals/AddVacancyModal';
import { getTariffs, getVacancyPositions } from '@/actions/getData';

const DashboardMain: FC = async () => {
  const tariffs = await getTariffs();
  const vacancyPositions = await getVacancyPositions();

  return (
    <div>
      <div className="w-[70%]">
        <AddCompanyModal tariffs={tariffs} />
        <br />
        <br />
        <AddVacancyModal vacancyPositions={vacancyPositions} />
        <br />
        <br />
        <AddResumeModal />
      </div>
    </div>
  );
};

export default DashboardMain;
