// 'use client'
import {
  Card,
} from "@/components/ui/card"
import { formatNumber, formatPrice } from "@/lib/utils/formatersIntl";

import Star from '@/components/Star'
// import { Star } from "lucide-react";
import { splitRatingToArr } from "@/lib/utils/splitRatingToArr";

interface ICandidateCard {
  name: string,
  city: string,
  salary: number,
  rating: number
}

const CandidateCard = ({ name, city, salary, rating }: ICandidateCard) => {
  return (
    <Card className="w-full min-w-[240px] py-4 px-6 hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
      <h3 className="text-base font-regular" >{name}</h3>
      <p className="text-muted-foreground text-base mb-1">{city}</p>
      <p className="text-base text-muted-foreground mb-1">
        {formatPrice(salary, 'ru-Ru', 'RUB')}
      </p>
      <div className="flex flex-wrap gap-1.5 items-center">
        <p className="text-base text-muted-foreground">
          {formatNumber(rating, 'en-Us', 2)}
        </p>
        <div className="flex gap-px">
          {/* Split rating into array to implemet partiall filled star */}
          {splitRatingToArr(rating).map((num: number, i) => {
            return (
              <Star
                className='text-yellow-500'
                fillLeft={num}
                key={i}
                width={12}
                height={12}
              />
            )
          })}
          {/* {Array.from({ length: Math.max(Math.ceil(rating), 5) }, (_, i) => {
            // const isFractional = (i + 1) > rating;
            // console.log('i+1', (i + 1) > Math.floor(rating))
            const isIntPart = (i + 1) <= Math.floor(rating)

            return (
              <Star
                className={cn('text-yellow-600', !isFractional && 'fill-yellow-600')}
                key={i}
                width={12}
                height={12}
              />
            );
          })} */}
        </div>
      </div>
    </Card>
  );
}

export default CandidateCard;