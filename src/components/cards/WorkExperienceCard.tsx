import { TWorkExperience } from "@/shared/types/resume";
import { Card } from "../ui/card";
import { FC } from "react";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatToMonthYearString } from "@/lib/utils/date_time/formatToMonthYearString";

type TProps = {
  work_experience: TWorkExperience,
  className?: string
}

const WorkExperienceCard: FC<TProps> = ({ work_experience, className }) => {
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

export default WorkExperienceCard;