import { TCandidateShort } from "@/shared/api/types";
import { formatPrice, formatNumber } from "@/shared/lib/formatters/formatersIntl";
import { splitRatingToArr } from "@/shared/lib/splitRatingToArr";
import { Card } from "@/shared/ui/shadcn/card";
import { Star } from "@/shared/ui/Star";
import { GripVertical } from "lucide-react";

type TProps = {
  name: TCandidateShort["name"];
  city: TCandidateShort["city"];
  salary: TCandidateShort["salary"]
  rating: TCandidateShort["match_point"];
}
export const CandidateCardAbstraction = ({
  name,
  city,
  salary,
  rating,
}: TProps) => {
  return (
    <div className="relative cursor-grabbing ring-2 rounded-lg ring-offset-2">
      <GripVertical className="absolute left-1 top-2 z-[100] stroke-muted-foreground" />
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
    </div>
  );
}