'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatNumber, formatPrice } from '@/shared/lib/formatters/formatersIntl';
import { splitRatingToArr } from '@/shared/lib/splitRatingToArr';
import { Star } from '@/shared/ui/Star';
import { Card } from '@/shared/ui/shadcn/card';
import { TCandidateShort } from '@/shared/api/types';
import { getDaysSinceCreated } from '@/shared/lib/date_time/getDaysSinceCreated';
import { StatusBadge } from '@/shared/ui/StatusBadge';
import { cn } from '@/shared/lib/utils';

type TProps = {
  candidate: TCandidateShort
}

export const CandidateCard = ({
  candidate
}: TProps) => {
  const { id,
    name,
    cv_name,
    city,
    salary,
    match_point: rating,
    created_at
  } = candidate
  const params = useParams();
  const companyId = params?.companyId as string | undefined;

  const daysInProcessing = getDaysSinceCreated(created_at)
  const isNew = daysInProcessing < 1

  return (
    <Link
      scroll={false}
      href={`/dashboard/${companyId}/matchDetails/${id}/${cv_name}`}
    >
      <Card className="w-full min-w-[240px] py-4 pl-8 pr-6 hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
        {isNew && <StatusBadge
          color='#34d399'
          className={cn("absolute top-1 right-1 px-1 text-[10px] border-none ", isNew && 'animate-pulse text-[12px]')}
        >
          Новая
        </StatusBadge>}
        <h3 className="text-base font-regular">
          {name || cv_name}
        </h3>

        <p className="text-muted-foreground text-base mb-1">{city}</p>

        <p className="text-base text-muted-foreground mb-1">
          {formatPrice(salary, 'ru-Ru', 'RUB')}
        </p>

        <div className="flex flex-wrap gap-1.5 items-center">
          <p className="text-base text-muted-foreground">
            {formatNumber(rating * 100, 'en-Us', 1)}
          </p>

          <div className="flex gap-px">
            {splitRatingToArr(rating * 10).map(
              (star: { id: string; fullness: number }, i) => (
                <Star
                  className="text-yellow-500"
                  starOptions={star}
                  key={i}
                  width={12}
                  height={12}
                />
              )
            )}
          </div>
        </div>
      </Card>
    </Link>

  );
};
