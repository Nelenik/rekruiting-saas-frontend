import { FC } from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getWordEndings } from '@/lib/utils/getWordEnding';
import { cn } from '@/lib/utils';
import { EVacancyStatus, TVacancy } from '@/shared/types';

import { Badge } from '../ui/badge';
import { vacancyStatusDict } from '@/shared/dictionaries';

const badgeColors: Record<EVacancyStatus, string> = {
  [EVacancyStatus.SETTING]: 'bg-indigo-300 hover:bg-indigo-300/80',
  [EVacancyStatus.WORK]: 'bg-blue-300 hover:bg-blue-300/80',
  [EVacancyStatus.PAUSE]: 'bg-gray-500 hover:bg-gray-500/80',
  [EVacancyStatus.WAIT]: 'bg-emerald-400 hover:bg-emerald-400/80',
  [EVacancyStatus.UNASSIGNED]: 'bg-orange-300 hover:bg-orange-300/80'
};


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

        <Badge
          className={
            badgeColors[vacancyStatus] ?? 'bg-zinc-900 hover:bg-zinc-900/80'
          }
        >
          {vacancyStatusDict[vacancyStatus].toLowerCase()}
        </Badge>
      </CardFooter>
    </Card>
  );
};
