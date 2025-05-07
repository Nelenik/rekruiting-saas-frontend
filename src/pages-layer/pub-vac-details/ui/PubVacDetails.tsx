import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyPositionsDict, vacancyWorkFormatDict } from "@/entities/vacancy";
import { TPublicVacancy } from "@/shared/api/types";
import { formatPrice } from "@/shared/lib/formatters/formatersIntl";
import { cn } from "@/shared/lib/utils";
import { TextFormatter } from "@/shared/ui/TextFormatter";

import CaseIcon from '@/assets/icons/case.svg?rc';
import { Button } from "@/shared/ui/shadcn/button";
import { Card } from "@/shared/ui/shadcn/card";

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
    description,
    company_name,
    company_description
  } = vacancy
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
          <h2
            className={cn(
              "flex items-start gap-4",
              "scroll-m-20 text-[40px] font-bold text-foreground tracking-tight first:mt-0 "
            )}
          >
            {name || 'Имя не указано'}
          </h2>
          <h3 className="scroll-m-20 text-xl font-semibold text-foreground tracking-tight">
            {`от ${formatPrice(salary_from, "ru-Ru", "RUB")} до ${formatPrice(salary_to, 'ru-Ru', 'RUB')}`}
          </h3>
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
          <Button
            className='max-w-[320px]'
          >Откликнуться</Button>
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
            {company_name}
          </h3>
          <p className="text-base text-muted-foreground">
            {company_description || ''}
          </p>
        </div>
      </div>
      <div className={cn(
        "grid grid-cols-1  gap-x-7 gap-y-8 text-base text-muted-foreground",
        "md:grid-cols-2"
      )}>
        <Card
          className={cn(
            'py-3 px-7 min-h-[200px]'
          )}
        >
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Требования
          </h3>
          <TextFormatter text={skills || 'Нет информации'} />
        </Card>
        <Card
          className={cn(
            'py-3 px-7 min-h-[200px]'
          )}
        >
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Обязанности
          </h3>
          <TextFormatter text={responsibilities || 'Нет информации'} />
        </Card>
        <Card
          className={cn(
            'py-3 px-7 min-h-[200px]'
          )}
        >
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Условия
          </h3>
          <TextFormatter text={conditions || 'Нет информации'} />
        </Card>
        <Card
          className={cn(
            'py-3 px-7 min-h-[200px]'
          )}
        >
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Дополнительно
          </h3>
          <TextFormatter text={description || 'Нет информации'} />
        </Card>
      </div>

    </div>
  );
}