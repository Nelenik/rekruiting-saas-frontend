import { WorkExperienceCard } from "@/entities/experience";
import { TWorkExperience } from "@/shared/api/types";
import { splitArrayToColumns } from "@/shared/lib/array_manipulations/splitArrayToColumns";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";

type TProps = {
  experience: TWorkExperience[],
  className?: string
}

export const WorkExperienceList: FC<TProps> = ({ experience, className }) => {

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
