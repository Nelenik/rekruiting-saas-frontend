'use client'
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { formatSalaryRange } from "@/shared/lib/formatters/formatSalaryRange";
import { Card, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { TVacancyShort } from "@/shared/api/types";

type TProps = Omit<TVacancyShort, 'created_at' | 'status_id' | 'status'>

export const VacancyBoardCard: FC<TProps> = ({ id, name, location, salary_from, salary_to }) => {
  const pathname = usePathname()
  return (
    <Link href={`${pathname}/${id}?name=${name}`}>
      <Card
        className={cn(
          'w-full py-4 pr-6 pl-7 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
        )}
      >
        <CardHeader className="p-0">
          <CardTitle className="text-base break-all">{name ?? 'Имя неизвестно'}</CardTitle>
        </CardHeader>
        <p className="leading-7 text-muted-foreground">
          {location || 'Город неизвестен'}
        </p>
        <p className="leading-7 text-muted-foreground">
          {formatSalaryRange(salary_from, salary_to)}
        </p>
      </Card>
    </Link>
  );
}
