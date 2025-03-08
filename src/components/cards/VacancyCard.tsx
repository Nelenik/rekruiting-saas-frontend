import { FC } from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getWordEndings } from '@/lib/utils/getWordEnding';
import { cn } from '@/lib/utils';
import { EVacancyStatus, TVacancy } from '@/shared/types';

import { vacancyStatusDict } from '@/shared/dictionaries';
import StatusBadge from '@/components/StatusBadge';
import { vacancyBadgeColors } from '@/shared/dictionaries/badgeColors';


type TProps = {
  vacancyName: TVacancy['name'];
  daysInProcessing: number;
  vacancyStatus: EVacancyStatus;
  className?: string;
};

export const VacancyCard: FC<TProps> = ({
  vacancyName,
  daysInProcessing,
  vacancyStatus,
  className,
}) => {
  const daysString = `${daysInProcessing} ${getWordEndings(daysInProcessing, [
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
        <CardTitle className="text-base">{vacancyName ?? 'Имя неизвестно'}</CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between p-0 text-sm text-muted-foreground">
        {daysString}

        <StatusBadge
          className={
            cn(vacancyBadgeColors[vacancyStatus], 'py-0 px-1')
          }
        >
          {vacancyStatusDict[vacancyStatus].toLowerCase()}
        </StatusBadge>
      </CardFooter>
    </Card>
  );
};
