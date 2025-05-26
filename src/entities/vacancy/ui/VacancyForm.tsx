'use client'
import { PositionSelect } from "./PositionSelect"
import { storeVacancy } from "@/shared/api/postData"
import { EVacancyEmployment, EVacancyExperience, EVacancyWorkFormat, TVacancy } from "@/shared/api/types"
import { updateVacancy } from "@/shared/api/updateData"
import { mutationInitialState } from "@/shared/api/constants"
import convertToFormData from "@/shared/lib/object_manipulations/convertToFormData"
import { NonNullableFields } from "@/shared/lib/object_manipulations/filterFalsyFields"
import { omitFields } from "@/shared/lib/object_manipulations/omitFields"
import { cn } from "@/shared/lib/utils"
import { useFormMutation } from "@/shared/model/hooks/useFormMutation"
import FormItem, { ErrorMessage } from "@/shared/ui/FormItem"
import { Button } from "@/shared/ui/shadcn/button"
import { Input } from "@/shared/ui/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"
import { Textarea } from "@/shared/ui/shadcn/textarea"
import { useParams } from "next/navigation"
import { StatusSelect } from "./StatusSelect"

type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TVacancy>
  onSuccess?: () => void
  onCancel?: () => void
}

export const VacancyForm = ({
  type,
  initialData,
  onSuccess = () => { },
  onCancel = () => { }
}: TProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';

  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateVacancy.bind(null, initialData.id)
    : storeVacancy

  //!!!! remove the fields "status" and "matchStatuses" (should find a better solution, may be made universal convertToFormData function)

  const cleanedInitialData = initialData && omitFields(initialData, ['status', 'matchStatuses'])

  //define initial state
  const initialState = {
    ...mutationInitialState,
    ...(cleanedInitialData && { payload: convertToFormData(cleanedInitialData) })
  }
  //define toast message
  const toastMessage = type === 'edit' ? 'Вакансия успешно обновлена' : 'Вакансия успешно сохранена'

  const { formAction, pending, defaultValues, errors, onChange } =
    useFormMutation({
      mutationAction: action,
      onSuccess,
      initialState,
      toastMessage
    });

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <input type="hidden" name="company_id" defaultValue={companyId} />

        <FormItem labelText="Название вакансии" error={errors.name}>
          <Input
            placeholder="Название вакансии"
            name="name"
            defaultValue={defaultValues?.name}
            className={errors?.name && 'ring-2 ring-destructive'}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Позиция" error={errors.position}>
          <PositionSelect
            name="position"
            defaultValue={defaultValues?.position}
            className={errors.position && 'ring-2 ring-destructive'}
          />
        </FormItem>

        <FormItem labelText="Статус" error={errors.status_id}>
          <StatusSelect
            name="status_id"
            defaultValue={defaultValues?.status_id || '191'}
            className={errors.status_id && 'ring-2 ring-destructive'}
          />
        </FormItem>

        <FormItem labelText="Обязанности" error={errors.responsibilities}>
          <Textarea
            placeholder="Обязанности"
            name="responsibilities"
            className={cn(
              'resize-none',
              errors.responsibilities && 'ring-2 ring-destructive'
            )}
            rows={9}
            defaultValue={defaultValues?.responsibilities}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Условия" error={errors.conditions}>
          <Textarea
            placeholder="Условия"
            name="conditions"
            className={cn(
              'resize-none',
              errors.conditions && 'ring-2 ring-destructive'
            )}
            rows={10}
            defaultValue={defaultValues?.conditions}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Занятость" error={errors.employment}>
          <Select name="employment" defaultValue={defaultValues?.employment}>
            <SelectTrigger
              className={cn(errors.employment && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Занятость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EVacancyEmployment.FULL}>Полная</SelectItem>
              <SelectItem value={EVacancyEmployment.PARTIAL}>
                Частичная
              </SelectItem>
              <SelectItem value={EVacancyEmployment.PROJECT}>Проект</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <div >
          <p className="mb-[10px] font-medium">Оплата</p>
          <div className="flex gap-4">
            <FormItem error={errors.salary_from}>
              <Input
                placeholder="от"
                name="salary_from"
                defaultValue={defaultValues?.salary_from}
                onChange={onChange}
              />
            </FormItem>
            <FormItem error={errors.salary_to}>
              <Input
                placeholder="до"
                name="salary_to"
                defaultValue={defaultValues?.salary_to}
                onChange={onChange}
              />
            </FormItem>
          </div>
        </div>

        <FormItem
          labelText="Требования "
          error={errors.skills}
          className="break-before-column"
        >
          <Textarea
            placeholder="Требования к кандидату"
            name="skills"
            className={cn(
              'resize-none',
              errors.skills && 'ring-2 ring-destructive'
            )}
            rows={8}
            defaultValue={defaultValues?.skills}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Описание" error={errors.description}>
          <Textarea
            placeholder="Описание "
            name="description"
            className={cn(
              'resize-none',
              errors.description && 'ring-2 ring-destructive'
            )}
            rows={8}
            defaultValue={defaultValues?.description}
            onChange={onChange}
          />
        </FormItem>

        <div>
          <p className="mb-[10px] font-medium">Формат работы</p>
          <div className="flex gap-3 items-center justify-between relative">
            {errors.work_format && (
              <ErrorMessage message={errors.work_format} />
            )}
            <FormItem
              labelText="Офис"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.OFFICE}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.OFFICE
                }
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Удаленно"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.REMOTE}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.REMOTE
                }
                className="h-[20px]"
              />
            </FormItem>
            <FormItem
              labelText="Гибрид"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.HYBRID}
                defaultChecked={
                  defaultValues?.work_format === EVacancyWorkFormat.HYBRID
                }
                className="h-[20px]"
              />
            </FormItem>
          </div>
        </div>

        <FormItem labelText="Опыт" error={errors.experience}>
          <Select name="experience" defaultValue={defaultValues?.experience}>
            <SelectTrigger
              className={cn(errors.experience && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Опыт" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EVacancyExperience.LESS_THAN_1}>
                0-1 год
              </SelectItem>
              <SelectItem value={EVacancyExperience.FROM_1_TO_3}>
                1-3 года
              </SelectItem>
              <SelectItem value={EVacancyExperience.FROM_3_TO_5}>
                3-5 лет
              </SelectItem>
              <SelectItem value={EVacancyExperience.MORE_THAN_5}>
                более 5 лет
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem labelText="География" error={errors.location}>
          <Select name="location" defaultValue={defaultValues?.location}>
            <SelectTrigger
              className={cn(errors.location && 'ring-2 ring-destructive')}
            >
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Москва">Москва</SelectItem>
              <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
              <SelectItem value="Краснодар">Краснодар</SelectItem>
              <SelectItem value="Новосибирск">Новосибирск</SelectItem>
              <SelectItem value="Казань">Казань</SelectItem>
              <SelectItem value="Нижний Новгород">Нижний Новгород</SelectItem>
              <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
              <SelectItem value="Воронеж">Воронеж</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem labelText="ID внешней системы" error={errors.external_id}>
          <Input
            placeholder="ID"
            name="external_id"
            defaultValue={defaultValues?.external_id}
            className={errors?.external_id && 'ring-2 ring-destructive'}
            onChange={onChange}
          />
        </FormItem>
      </div>

      <div className="self-end">
        <Button type="button" variant="ghost" className="mr-2" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{pending ? 'Сохранение...' : 'Сохранить'}</Button>
      </div>
    </form>
  );
};

