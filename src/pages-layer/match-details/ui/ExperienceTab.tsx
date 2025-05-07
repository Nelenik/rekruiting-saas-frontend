import { WorkExperienceList } from "@/entities/experience";
import { TWorkExperience } from "@/shared/api/types";
import { TextFormatter } from "@/shared/ui/TextFormatter";

type Props = {
  workExperiences: TWorkExperience[] | null,
  experience_raw: string | null
}
export const ExperienceTab = ({
  workExperiences,
  experience_raw
}: Props) => {

  if (workExperiences) {
    return <WorkExperienceList experience={workExperiences} />
  }
  return (
    <TextFormatter text={experience_raw || 'Данные об опыте отсутствуют'} />
  )
}