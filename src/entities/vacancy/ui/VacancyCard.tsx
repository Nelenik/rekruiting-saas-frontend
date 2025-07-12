import { FC } from 'react';

import { formatWordEndings } from '@/shared/lib/formatters/formatWordEndings';
import { cn } from '@/shared/lib/utils';
import { Card, CardFooter, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { TVacancy } from '@/shared/api/types';
import { getDaysSinceCreated } from '@/shared/lib/date_time/getDaysSinceCreated';


type TProps = {
  vacancyName: TVacancy['name'];
  createdAt: TVacancy['created_at'];
  vacancyStatus: number;
  className?: string;
};

export const VacancyCard: FC<TProps> = ({
  vacancyName,
  createdAt,
  className,
}) => {
  const daysInProcessing = getDaysSinceCreated(createdAt)
  const daysString = `${daysInProcessing} ${formatWordEndings(daysInProcessing, [
    'день',
    'дня',
    'дней',
  ])}`;

  return (
    <Card
      className={cn(
        'w-full py-4 px-6 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
    >
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base hyphens-auto">{vacancyName ?? 'Имя неизвестно'}</CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between p-0 text-sm text-muted-foreground">
        {daysString}
        {/* 
        <StatusBadge
          className={
            cn(vacancyBadgeColors[vacancyStatus], 'py-0 px-1')
          }
        >
          {vacancyStatusDict[vacancyStatus].toLowerCase()}
        </StatusBadge> */}
      </CardFooter>
    </Card>
  );
};
