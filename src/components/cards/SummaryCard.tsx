'use client'

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import CaseIcon from '@/assets/icons/case.svg?rc';
import { getWordEndings } from '@/lib/utils/getWordEnding';
import { formatPrice } from '@/lib/utils/formatersIntl';
import { getSalaryRange } from '@/lib/utils/getSalaryRange';
import { getDaysSinceCreated } from '@/lib/utils/getDaysSinceCreated';
import { cn } from '@/lib/utils';
import { useSingleVacancy } from '@/providers/SingleVacancyProvider';
import StatusBadge from '../shared/StatusBadge';

export const SummaryCard = () => {
  const { vacancy } = useSingleVacancy()
  const {
    created_at,
    salary_candy,
    salary_from,
    salary_to,
    salary_market,
    name: vacancyName,
    match_count,
    match_hot_count,
    status: vacancyStatus
  } = vacancy

  const daysInProcessing = getDaysSinceCreated(created_at)
  const daysString = `${daysInProcessing} ${getWordEndings(daysInProcessing, [
    'день',
    'дня',
    'дней',
  ])}`;

  const salaryOfferString = getSalaryRange(salary_from || 0, salary_to || 0);
  const salaryMiddleString = formatPrice(salary_market || 0, 'ru-Ru', 'RUB');
  const salaryCandidateString = formatPrice(salary_candy || 0, 'ru-Ru', 'RUB');

  return (
    <Card className="w-full py-4 px-6 flex gap-6 relative">

      <div className="p-5 rounded-full bg-emerald-500 self-start sm:block hidden">
        <CaseIcon width={32} height={32} className="text-white" />
      </div>

      <div className="grow">
        <CardTitle className="mb-2 first-letter:uppercase  typograpghy-h2 flex items-start gap-4">
          {vacancyName ?? 'Имя неизвестно'}
          <StatusBadge color={vacancyStatus.color} className={cn('py-0 px-1')}>
            {vacancyStatus.name.toLowerCase()}
          </StatusBadge>
        </CardTitle>

        <ul
          className="
            grid grid-cols-[repeat(auto-fit,_minmax(145px,_1fr))] gap-6
            w-[min(100%,1000px)]
            [&>li]:flex 
            [&>li]:relative 
            [&>li]:flex-col 
            [&>li]:min-w-max
            [&>li:not(:first-child):after]:content-[''] 
            [&>li:not(:first-child):after]:w-px
            [&>li:not(:first-child):after]:h-[60%]
            [&>li:not(:first-child):after]:bg-gray-300
            [&>li:not(:first-child):after]:text-muted-foreground 
            [&>li:not(:first-child):after]:absolute 
            [&>li:not(:first-child):after]:-left-3 
            [&>li:not(:first-child):after]:top-1/2 
            [&>li:not(:first-child):after]:-translate-y-1/2"
        >
          <li>
            <CardDescription>в работе</CardDescription>
            <p>{daysString}</p>
          </li>

          <li>
            <CardDescription>оплата</CardDescription>
            <p>{salaryOfferString}</p>
          </li>

          <li>
            <CardDescription>средняя по рынку</CardDescription>
            <p>{salaryMiddleString}</p>
          </li>

          <li>
            <CardDescription>запросы кандидатов</CardDescription>
            <p>{salaryCandidateString}</p>
          </li>

          <li>
            <CardDescription>кандидатов в воронке</CardDescription>
            <p>{match_count}</p>
          </li>

          <li>
            <CardDescription>отклики</CardDescription>
            <p>{match_hot_count}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
};
