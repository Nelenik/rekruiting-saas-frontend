import { AddEntity } from '@/features/mutate-entity';
import { getCompaniesList } from '@/shared/api/actions';
import { Card } from '@/shared/ui/shadcn/card';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const dynamic = 'force-dynamic';

const AppPage: FC = async () => {

  const { data: companies } = await getCompaniesList({});
  if (companies?.length) {
    redirect(`/dashboard/${companies[0].id}`)
  }

  return (
    <div>
      <div className="w-[70%]">
        <Card className='p-12 rounded-2xl fixed top-1/4 left-1/2 -translate-x-1/2  w-[min(90%,500px)] flex flex-col gap-8 items-center text-xl'>

          У вас нет созданных компаний.
          <AddEntity
            entityType='company'
          />
        </Card>
      </div>
    </div>
  );
};

export default AppPage;
