'use client'
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { getSalaryRange } from "@/lib/utils/getSalaryRange";
import { TVacancyShort } from "@/shared/types";
import { FC } from "react";
import { usePathname } from "next/navigation";

type TProps = Omit<TVacancyShort, 'created_at' | 'status'>

const VacancyBoardCard: FC<TProps> = ({ id, name, location, salary_from, salary_to }) => {
  const pathname = usePathname()
  return (
    <Link href={`${pathname}/${id}?name=${name}`}>
      <Card
        className={cn(
          'w-full py-4 px-6 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
        )}
      >
        <CardHeader className="p-0">
          <CardTitle className="text-base">{name}</CardTitle>
        </CardHeader>
        <p className="leading-7 text-muted-foreground">
          {location || 'Город неизвестен'}
        </p>
        <p className="leading-7 text-muted-foreground">
          {getSalaryRange(salary_from, salary_to)}
        </p>
      </Card>
    </Link>
  );
}

export default VacancyBoardCard;