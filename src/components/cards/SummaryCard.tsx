import { FC } from 'react';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import CaseIcon from '@/assets/icons/case.svg?rc';
import { getWordEndings } from '@/lib/utils/getWordEnding';
import { formatPrice } from '@/lib/utils/formatersIntl';
import { getSalaryRange } from '@/lib/utils/getSalaryRange';
import EditVacancyModal from '../modals/EditVacancyModal';

type TProps = {
  vacancyName: string;
  daysInProcessing: number;
  salaryOfferFrom: number;
  salaryOfferTo: number;
  salaryMiddle: number;
  salaryCandidate: number;
  candidatesCount: number;
  jobReactions: number;
};

export const SummaryCard: FC<TProps> = ({
  vacancyName,
  daysInProcessing,
  salaryOfferFrom,
  salaryOfferTo,
  salaryMiddle,
  salaryCandidate,
  candidatesCount,
  jobReactions,
}) => {
  const daysString = `${daysInProcessing} ${getWordEndings(daysInProcessing, [
    'день',
    'дня',
    'дней',
  ])}`;

  const salaryOfferString = getSalaryRange(salaryOfferFrom, salaryOfferTo);
  const salaryMiddleString = formatPrice(salaryMiddle, 'ru-Ru', 'RUB');
  const salaryCandidateString = formatPrice(salaryCandidate, 'ru-Ru', 'RUB');

  return (
    <Card className="w-full py-4 px-6 flex gap-6 relative">

      <div className="p-5 rounded-full bg-emerald-500 self-start">
        <CaseIcon width={32} height={32} className="text-white" />
      </div>

      <div className="grow">
        <CardTitle className="mb-2 first-letter:uppercase  typograpghy-h2">
          {vacancyName}
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
            <p>{candidatesCount}</p>
          </li>

          <li>
            <CardDescription>отклики</CardDescription>
            <p>{jobReactions}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
};
