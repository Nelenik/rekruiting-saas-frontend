'use client'
import { Card } from '@/components/ui/card';
import { formatNumber, formatPrice } from '@/lib/utils/formatersIntl';

import Star from '@/components/shared/Star';
import { splitRatingToArr } from '@/lib/utils/splitRatingToArr';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TCandidateShort } from '@/shared/types';

type TProps = {
  id: TCandidateShort['id'];
  name: TCandidateShort["name"];
  city: TCandidateShort["city"];
  salary: TCandidateShort["salary"]
  rating: TCandidateShort["match_point"];
}

export const CandidateCard = ({
  id,
  name,
  city,
  salary,
  rating,
}: TProps) => {
  const { companyId } = useParams()
  return (
    <Link
      scroll={false}
      href={`/dashboard/${companyId}/candidate-info/${id}?name=${name}`}
    >
      <Card className="w-full min-w-[240px] py-4 px-6 hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
        <h3 className="text-base font-regular">
          {name ?? 'Имя не указано'}
        </h3>

        <p className="text-muted-foreground text-base mb-1">{city}</p>

        <p className="text-base text-muted-foreground mb-1">
          {formatPrice(salary, 'ru-Ru', 'RUB')}
        </p>

        <div className="flex flex-wrap gap-1.5 items-center">
          <p className="text-base text-muted-foreground">
            {formatNumber(rating, 'en-Us', 2)}
          </p>

          <div className="flex gap-px">
            {splitRatingToArr(rating).map(
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
