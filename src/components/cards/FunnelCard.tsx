import { FC } from 'react';
import SpinnerOne from '@/assets/icons/spinner1.svg?rc'

import { Card, CardDescription, CardTitle } from '@/components/ui/card';

type TProps = {
  name: string;
  count: number;
  isLoading?: boolean;
};

export const FunnelCard: FC<TProps> = ({ name, count, isLoading = false }) => {
  return (
    <Card className="w-full  py-4 px-6 flex flex-col items-center">
      <CardTitle className="mb text-lg lg:text-2xl">{name}</CardTitle>
      {
        isLoading
          ? <SpinnerOne className='fill-primary/10' />
          : <CardDescription>{count}</CardDescription>
      }

    </Card>
  );
};
