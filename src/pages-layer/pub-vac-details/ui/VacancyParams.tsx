import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyWorkFormatDict } from "@/entities/vacancy"
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence"
import { formatSalaryRange } from "@/shared/lib/formatters/formatSalaryRange"
import { cn } from "@/shared/lib/utils"
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { Check } from "lucide-react"

type TProps = {
  className?: string
  level?: string
  name?: string
  salary_from?: number
  salary_to?: number
  location?: string
  work_format?: string
  experience?: string
  link?: string
  employment?: string
}
export const VacancyParams = ({
  className,
  level,
  name,
  salary_from,
  salary_to,
  location,
  work_format,
  experience,
  employment,
  link
}: TProps) => {
  const normalizedWorkFormat = capitalizeSentences(
    work_format
      ? vacancyWorkFormatDict[work_format || ''] || work_format
      : 'Не указан'
  )

  const normalizedExperience = capitalizeSentences(
    experience
      ? vacancyExperienceDict[experience || ''] || experience
      : "не указан"
  )
  const normalizedEmployment = capitalizeSentences(employment ? vacancyEpmpoymentDict[employment || ''] || employment : "не указана")

  const normalizedSalary = (Number.isFinite(salary_from) || Number.isFinite(salary_to))
    ? `${formatSalaryRange(salary_from || 0, salary_to || 0)} ₽ за месяц`
    : 'По договоренности'

  return (
    <div className={cn(
      'flex flex-col gap-5', className
    )}
    >
      <div>
        <h1
          className="mb-3 text-xl  md:text-[32px] md:leading-10 font-bold hyphens-auto [overflow-wrap:anywhere]"
        >{name}</h1>
        <StatusBadge
          color="#17499d"
          className="text-base px-3.5 py-1 rounded-lg font-medium"
        >
          {capitalizeSentences(level || 'any')}
        </StatusBadge>
      </div>
      <p className="text-primary text-xl font-semibold">
        {normalizedSalary}
      </p>
      <div>
        <p className="mb-2 text-sm text-[#5877ae] flex flex-wrap gap-2 items-center font-medium">
          <span>
            {normalizedWorkFormat}
          </span>
          <span>•</span>
          <span>
            Занятость: {normalizedEmployment}
          </span>
          <span>•</span>
          <span>
            Требуемый опыт: {normalizedExperience}
          </span>
        </p>
        <p className="text-sm text-secondary-foreground">
          {location || '-'}
        </p>
      </div>
      <RekruCTA
        view="dark"
        className="self-start"
        asChild
      >
        <a
          href={link || '#!'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Check />
          Откликнуться
        </a>


      </RekruCTA>
    </div>
  );
}