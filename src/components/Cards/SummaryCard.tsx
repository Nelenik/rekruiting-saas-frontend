import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import CaseIcon from '@/assets/icons/case.svg?rc'
import { getWordEndings } from "@/utils/getWordEnding"
import { formatPrice } from "@/utils/formatersIntl"

interface ISummaryData {
  daysInProcessing: number,
  salaryOffer: number,
  salaryMiddle: number,
  salaryQueries: number,
  candidatesCount: number,
  jobReactions: number
}

interface ISummaryCard {
  vacancyName: string
  summaryData: ISummaryData
}

const SummaryCard = ({ vacancyName, summaryData }: ISummaryCard) => {
  const { daysInProcessing, salaryOffer, salaryMiddle, salaryQueries,
    candidatesCount, jobReactions } = summaryData

  return (
    <Card className="w-full py-4 px-6 flex gap-6">
      <div className="p-5 rounded-full bg-emerald-500 self-start">
        <CaseIcon width={32} height={32} className="text-white" />
      </div>
      <div className="grow">
        <CardTitle className="mb-2 first-letter:uppercase  typograpghy-h2">{vacancyName}</CardTitle>
        <ul className="
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
          <li >
            <CardDescription>в работе</CardDescription>
            <p>{`${daysInProcessing} ${getWordEndings(daysInProcessing, ['день', 'дня', 'дней'])}`}</p>
          </li>
          <li>
            <CardDescription>оплата</CardDescription>
            <p>{formatPrice(salaryOffer, 'ru-Ru', 'RUB')}</p>
          </li>
          <li>
            <CardDescription>средняя по рынку</CardDescription>
            <p>{formatPrice(salaryMiddle, 'ru-Ru', 'RUB')}</p>
          </li>
          <li>
            <CardDescription>запросы кандидатов</CardDescription>
            <p>{formatPrice(salaryQueries, 'ru-Ru', 'RUB')}</p>
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
}

export default SummaryCard;