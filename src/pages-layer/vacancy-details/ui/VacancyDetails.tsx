'use client'
import { vacancyPositionsDict } from "@/entities/vacancy/lib/dictionary";
import { VacancyForm } from "@/entities/vacancy";
import { TVacancy } from "@/shared/api/types";
import { vacancyEpmpoymentDict, vacancyExperienceDict, vacancyWorkFormatDict } from "@/shared/dictionaries";
import { formatPrice } from "@/shared/lib/formatters/formatersIntl";
import { filterFalsyFields } from "@/shared/lib/object_manipulations/filterFalsyFields";
import { EditButton } from "@/shared/ui/buttons/EditButton";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { useState } from "react";
import CompanyOverview from "./CompanyOverview";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { cn } from "@/shared/lib/utils";

export const VacancyDetails = ({ vacancy }: { vacancy: TVacancy }) => {
  const [isEdit, setIsEdit] = useState(false)
  const {
    name,
    status,
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
    description
  } = vacancy

  const hideForm = () => setIsEdit(false)

  const showForm = () => setIsEdit(true)

  if (isEdit) {
    return (
      <>
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mb-6">
          Редактировать вакансию
        </h2>
        <VacancyForm
          type="edit"
          initialData={filterFalsyFields(vacancy)}
          onSuccess={hideForm}
          onCancel={hideForm}
        />
      </>

    )
  }
  return (

    <div>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 mb-6 flex items-start gap-4">
        {name || 'Имя не указано'}
        <StatusBadge color={status.color} className={cn(
          'text-xs py-0 px-1'
        )}>
          {status.name}
        </StatusBadge>
        <EditButton onClick={showForm} isIconView={true} />
      </h2>
      <div className="flex gap-7 mb-8">
        <div className="text-base text-muted-foreground w-1/2">
          <h3 className="scroll-m-20 text-xl font-semibold text-foreground tracking-tight mb-2">
            {`от ${formatPrice(salary_from, "ru-Ru", "RUB")} до ${formatPrice(salary_to, 'ru-Ru', 'RUB')}`}
          </h3>
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
        <CompanyOverview className="w-1/2" />
      </div>
      <div className="grid grid-cols-2 gap-x-7 gap-y-8 text-base text-muted-foreground">
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Требования
          </h3>
          <TextFormatter text={skills || 'Нет информации'} />
        </section>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Обязанности
          </h3>
          <TextFormatter text={responsibilities || 'Нет информации'} />
        </section>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Условия
          </h3>
          <TextFormatter text={conditions || 'Нет информации'} />
        </section>
        <section>
          <h3 className="text-lg text-foreground font-semibold mb-4">
            Дополнительно
          </h3>
          <TextFormatter text={description || 'Нет информации'} />
        </section>
      </div>

    </div>
  );
}
