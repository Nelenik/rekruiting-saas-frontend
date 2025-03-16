// import { getUser } from '@/actions/getData';
import AddEntityModal from '@/components/modals/AddEntityModal';
import { Card } from '@/components/ui/card';
import { FC } from 'react';

const MainAppPage: FC = async () => {
  // const userData = await getUser()

  return (
    <div>
      <div className="w-[70%]">
        <Card className='p-12 rounded-2xl fixed top-1/4 left-1/2 -translate-x-1/2  w-[min(90%,500px)] flex flex-col gap-8 items-center text-xl'>

          У вас нет созданных компаний.
          <AddEntityModal
            entityType='company'
          />
        </Card>
      </div>
    </div>
  );
};

export default MainAppPage;
