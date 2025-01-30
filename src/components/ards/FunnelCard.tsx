import { FC } from 'react';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';

type TProps = {
  name: string;
  count: number;
};

export const FunnelCard: FC<TProps> = ({ name, count }) => {
  return (
    <Card className="w-full min-w-[240px] py-4 px-6 flex flex-col items-center">
      <CardTitle className="mb text-lg lg:text-2xl">{name}</CardTitle>

      <CardDescription>{count}</CardDescription>
    </Card>
  );
};
