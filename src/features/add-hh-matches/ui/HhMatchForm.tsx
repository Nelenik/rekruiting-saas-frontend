'use client'
import { cn } from "@/shared/lib/utils";
import FormItem from "@/shared/ui/form-elements/FormItem";
import { Input } from "@/shared/ui/shadcn/input";
import { HH_FIELDS_DICT } from "../lib/dictionary";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { Button } from "@/shared/ui/shadcn/button";
// import { RefObject } from "react";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { launchMatchFromHh } from "@/shared/api/actions";
import { THhEmployment, THhMatchRequest, THhStatus } from "../api/types";
import { useRef } from "react";
import { SpecializationField } from "./SpecializationField";

type TProps = {
  className?: string,
  vacancyId: string | number,
  vacancyName: string,
  // ref?: RefObject<HTMLFormElement | null>
  onSuccess?: () => void
}
export const HhMatchForm = ({
  className,
  vacancyId,
  vacancyName,
  // ref,
  onSuccess = () => { }
}: TProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const { formAction, pending, defaultValues, errors, removeError } = useMutateForm<THhMatchRequest>({
    mutationAction: launchMatchFromHh,
    toastMessage: 'Создание мэтчей с hh.ru запущено',
    onSuccess

  })

  return (
    <form
      action={formAction}
      ref={formRef}
      className={cn(
        'flex flex-col gap-8 px-2',
        'h-full overflow-y-auto pb-16 text-base',
        className
      )}

    >
      {/* Hidden inputs vacancyId and search text = vacancy name */}
      <input type="hidden" name="vacancy_id" defaultValue={vacancyId} />

      {/* Cv name */}
      <FormItem
        labelText="Название резюме"
        error={errors.text}
      >
        <Input
          name="text"
          defaultValue={defaultValues?.text || vacancyName}
          className="text-inherit"
        />
      </FormItem>

      {/* Area */}
      <FormItem
        labelText="Местоположение"
        className="gap-1"
        error={errors.area}
      >
        {HH_FIELDS_DICT.area.map((area: { id: number, name: string }) => {

          const isChecked = (defaultValues?.area || []).includes(String(area.id))
          return (
            <label
              key={area.id}
              className="flex items-center gap-2"
            >
              <Input
                type="checkbox"
                name="area[]"
                value={area.id}
                className="inline w-5 h-5 accent-primary"
                onChange={(e) => removeError(e.target.name)}
                defaultChecked={isChecked}
              />
              <span>{capitalizeSentences(area.name)}</span>
            </label>
          )
        })}
      </FormItem>

      {/* Professional_role */}
      <FormItem labelText="Специализация" className="gap-1">
        <SpecializationField
          defaultValues={defaultValues?.professional_role?.map(String)}
          name='professional_role[]'
          formRef={formRef}
        />
      </FormItem>

      {/* Experience */}
      <FormItem
        labelText="Опыт работы"
        className="gap-1"
        error={errors.experience}
      >
        {HH_FIELDS_DICT.experience.map((variant) => {
          const isChecked = variant.id === defaultValues?.experience
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="radio"
                name="experience"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
                defaultChecked={isChecked}
                onChange={(e) => removeError(e.target.name)}
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}

      </FormItem>

      {/* Age */}
      <div >
        <p className="mb-[10px] font-medium">Возраст</p>
        <div className="flex gap-4">
          <FormItem
            error={errors.age_from}
            className="grow"
          >
            <Input
              type="number"
              placeholder="от"
              name="age_from"
              min={14}
              max={99}
              defaultValue={defaultValues?.age_from}
              onChange={(e) => removeError(e.target.name)}
            />
          </FormItem>
          <FormItem
            error={errors.age_to}
            className="grow"
          >
            <Input
              type="number"
              placeholder="до"
              name="age_to"
              defaultValue={defaultValues?.age_to}
              min={14}
              max={99}
              onChange={(e) => removeError(e.target.name)}
            />
          </FormItem>
        </div>
      </div>

      {/* Gender */}
      <FormItem
        labelText="Пол"
        className="gap-1"
        error={errors.gender}
      >
        {HH_FIELDS_DICT.gender.map((variant) => {
          const isChecked = variant.id === defaultValues?.gender
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="radio"
                name="gender"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
                defaultChecked={isChecked}
                onChange={(e) => removeError(e.target.name)}
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}
      </FormItem>

      {/* Status */}
      <FormItem
        labelText="Статус поиска"
        className="gap-1"
        error={errors.status}
      >
        {HH_FIELDS_DICT.job_search_statuses_employer.map((status) => {
          const isChecked = (defaultValues?.status || []).includes(status.id as THhStatus)
          return (
            <label
              key={status.id}
              className="flex items-center gap-2"
            >
              <Input
                type="checkbox"
                // name="status[]"
                value={status.id}
                className="inline w-5 h-5 accent-primary shrink-0"
                onChange={(e) => removeError(e.target.name)}
                defaultChecked={isChecked}
              />
              <span>{capitalizeSentences(status.name)}</span>
            </label>
          )
        })}
      </FormItem>

      {/* Salary */}
      <FormItem
        labelText="Зарплата"
        className=""
        error={errors.salary}
      >
        <Input
          placeholder="Зарплата"
          name="salary"
          pattern="[0-9]+"
          title="Введите только цифры"
          onChange={(e) => removeError(e.target.name)}
          defaultValue={defaultValues?.salary}
        />
      </FormItem>
      {/* Employment */}

      <FormItem
        labelText="Тип занятости"
        className="gap-1"
        error={errors.employment}
      >
        {HH_FIELDS_DICT.employment.map((variant) => {
          const isChecked = (defaultValues?.employment || []).includes(variant.id as THhEmployment)
          return (
            <label
              key={variant.id}
              className="flex items-center gap-2"
            >
              <Input
                type="checkbox"
                name="employment[]"
                value={variant.id}
                className="inline w-5 h-5 accent-primary"
                onChange={(e) => removeError(e.target.name)}
                defaultChecked={isChecked}
              />
              <span>{capitalizeSentences(variant.name)}</span>
            </label>
          )
        })}
      </FormItem>


      {/* Search period in days */}
      <FormItem
        labelText="Учитывать резюме за последние {X} дней"
        className=""
        error={errors.search_period}
      >
        <Input
          placeholder="Количество дней"
          title="Введите только цифры"
          pattern="[0-9]+"
          name="search_period"
          defaultValue={defaultValues?.search_period}
          onChange={(e) => removeError(e.target.name)}
        />
      </FormItem>

      <div className={cn("absolute left-0 right-0 bottom-0 ", "px-12 py-2.5 bg-white shadow-[0px_-2px_3px_-2px_rgba(0,_0,_0,_0.35)] flex justify-end gap-4")}>
        <Button type="button" variant="ghost" className="mr-2" onClick={() => formRef?.current?.reset()}>
          Сбросить
        </Button>
        <Button type="submit">
          {pending ? 'Обработка...' : 'Запросить'}

        </Button>
      </div>
    </form>
  );
}