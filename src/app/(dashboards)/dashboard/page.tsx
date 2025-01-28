import { getTariffs, getUser } from '@/actions/getData';
import { AddCompanyModal } from '@/components/modals/AddCompanyModal';
import { FC } from 'react';

const MainAppPage: FC = async () => {
  const userData = await getUser()

  const tariffs = await getTariffs();
  return (
    <div>
      <div className="w-[70%]">
        У вас нет созданных компаний.
        <AddCompanyModal tariffs={tariffs} />
      </div>
    </div>
  );
};

export default MainAppPage;
