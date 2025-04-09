import { TWorkExperience } from "@/shared/api/types";
import { TextFormatter } from "@/shared/ui/custom/TextFormatter";
import { WorkExperienceList } from "@/widgets/experience-list";

type Props = {
  experience: TWorkExperience[] | null,
  experience_raw: string | null
}
export const ExperienceTab = ({
  experience,
  experience_raw
}: Props) => {

  if (experience) {
    return <WorkExperienceList experience={experience} />
  }
  return (
    <TextFormatter text={experience_raw || 'Данные об опыте отсутствуют'} />
  )
}