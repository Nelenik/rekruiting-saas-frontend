import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyPositionsDict, vacancyWorkFormatDict } from "@/entities/vacancy";
import { TPublicVacancy } from "@/shared/api/types";
import { formatPrice } from "@/shared/lib/formatters/formatersIntl";
import { cn } from "@/shared/lib/utils";
import { TextFormatter } from "@/shared/ui/TextFormatter";

import CaseIcon from '@/assets/icons/case.svg?rc';
import { Button } from "@/shared/ui/shadcn/button";
import { Card } from "@/shared/ui/shadcn/card";
import { Fragment } from "react";

type TProps = {
  vacancy: TPublicVacancy
  ;
}
export const PubVacDetails = ({
  vacancy
}: TProps) => {
  const {
    name,
    salary_from,
    salary_to,
    location,
    experience,
    work_format,
    position,
    employment,
    skills,
    responsibilities,
    conditions,
    addition,
    description,
    company,
    link
  } = vacancy

  const vacancyCharacteristics: { title: string, content: string }[] = [
    {
      title: 'Требования',
      content: skills,
    },
    {
      title: 'Обязанности',
      content: responsibilities,
    },
    {
      title: 'Условия',
      content: conditions,
    },
    {
      title: 'Дополнительно',
      content: addition,
    }
  ]
  return (

    <div className="w-full max-w-[900px] m-auto flex flex-col gap-16" >
      <div className={cn(
        "grid grid-cols-1 gap-x-7 gap-y-8",
        'md:grid-cols-2'
      )} >
        <div className={cn(
          "flex flex-col gap-4",
          "text-base text-muted-foreground"
        )}
        >
          <h1
            className={cn(
              "flex items-start gap-4",
              "scroll-m-20 text-[40px] font-bold text-foreground tracking-tight first:mt-0 leading-[2.8rem] hyphens-auto",
            )}
          >
            {name || 'Имя не указано'}
          </h1>
          <h2 className="scroll-m-20 text-xl font-semibold text-foreground tracking-tight">
            {`от ${formatPrice(salary_from, "ru-Ru", "RUB")} до ${formatPrice(salary_to, 'ru-Ru', 'RUB')}`}
          </h2>
          <div >
            <p>
              Локация: {location}
            </p>
            <p>
              Опыт: {experience ? vacancyExperienceDict[experience] : '-'}
            </p>
            <p>
              Формат работы: {work_format ? vacancyWorkFormatDict[work_format] : '-'}
            </p>
            <p>
              Позиция: {position ? vacancyPositionsDict[position] : '-'}
            </p>
            <p>
              Занятость: {employment ? vacancyEpmpoymentDict[employment] : '-'}
            </p>
          </div>
          {link && <Button
            className='max-w-[320px]'
            asChild
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-full">

              Откликнуться
            </a>
          </Button>}
        </div>
        {/* company info */}
        <div
          className={cn(
            'py-4 px-6 self-start',
            'rounded-md bg-indigo-100'
          )}
        >
          <h3 className="text-lg font-semibold flex items-center gap-3 mb-4">
            <span className="p-3 rounded-full bg-emerald-500 self-start sm:block hidden">
              <CaseIcon width={20} height={20} className="text-white" />
            </span>
            {company.name}
          </h3>
          <p className="text-base text-muted-foreground">
            {company.description || ''}
          </p>
        </div>
      </div>

      {/* vacancy description */}
      {description &&
        <Card
          className={cn(
            'py-3 px-7 '
          )}
        >
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Описание вакансии
          </h3>
          <TextFormatter text={description} />
        </Card>}

      <div className={cn(
        "grid grid-cols-1  gap-x-7 gap-y-8 text-base text-muted-foreground",
        "md:grid-cols-2"
      )}>

        {vacancyCharacteristics.map((item) => (
          <Fragment key={item.title}>
            {item.content && <Card
              className={cn(
                'py-3 px-7 min-h-[200px]'
              )}
            >
              <h3 className="text-lg text-foreground font-semibold mb-4">
                {item.title}
              </h3>
              <TextFormatter text={item.content} />
            </Card>}
          </Fragment>
        ))}

      </div>

    </div>
  );
}