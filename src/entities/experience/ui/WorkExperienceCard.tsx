import { TWorkExperience } from "@/shared/api/types/resume";
import { FC } from "react";
import { Dot } from "lucide-react";
import { formatToMonthYearString } from "@/shared/lib/formatters/formatToMonthYearString";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";

type TProps = {
  work_experience: TWorkExperience,
  className?: string
}

export const WorkExperienceCard: FC<TProps> = ({ work_experience, className }) => {
  const { company, post, city, description, start_at, end_at } = work_experience

  return (
    <Card
      className={cn(
        "flex flex-col gap-2 bg-indigo-100 py-3 px-6 rounded-lg min-h-40",
        className
      )}>
      <p className='flex gap-2 items-center'>
        <span className='text-blue-700'> {company}, {city}</span>
        <Dot />
        <span>{post}</span>

      </p>
      <p className='text-muted-foreground'>
        {formatToMonthYearString(start_at)}
        &nbsp;-&nbsp;
        {
          end_at
            ? formatToMonthYearString(end_at)
            : <i>(настоящее время)</i>
        }
      </p>
      <p className='text-muted-foreground'>
        {description}
      </p>
    </Card>
  );
}
