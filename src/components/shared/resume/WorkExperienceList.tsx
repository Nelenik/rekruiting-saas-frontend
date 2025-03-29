import WorkExperienceCard from "@/components/cards/WorkExperienceCard";
import { cn } from "@/lib/utils";
import { splitArrayToColumns } from "@/lib/utils/array_manipulations/splitArrayToColumns";
import { TResume, TWorkExperience } from "@/shared/types/resume";
import { FC } from "react";

type TProps = {
  experience: TResume['experience'],
  className?: string
}

const WorkExperienceList: FC<TProps> = ({ experience, className }) => {

  //Since splitting the array into columns with grid, flex, or multicolumn layout did not provide a flexible chronological view, we used the splitArrayToColumns function instead
  const columns = splitArrayToColumns<TWorkExperience>(experience, 2)

  return (
    <div className={cn("flex gap-6 flex-col @3xl:flex-row", className)}>
      {columns.map((column, index) => {
        return (
          <div
            key={index}
            className="@3xl:w-[calc(100%/2-24px)] w-full flex flex-col gap-6"
          >
            {column.map((item) => (
              <WorkExperienceCard
                key={item.id}
                work_experience={item}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default WorkExperienceList;