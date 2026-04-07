'use client';

import { TResume } from '@/shared/api/types';
// import { mutationInitialState } from '@/shared/api/constants';
import { NonNullableFields } from '@/shared/lib/object_manipulations/filterFalsyFields';
import { cn } from '@/shared/lib/utils';
// import { useFormMutation } from '@/shared/model/hooks/useFormMutation';
import FormItem from '@/shared/ui/form-elements/FormItem';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useCallback } from 'react';
import { storeCv, updateCV } from '@/shared/api/actions';
import { useMutateForm } from '@/shared/model/hooks/useMutateForm';
import { TagSelect } from '@/shared/ui/form-elements/TagSelect';
import { skills } from '../lib/dictionary';


type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TResume>
  onSuccess?: () => void
  onCancel?: () => void
}
/**
 * A form component for creating or editing a CV (resume).
 *
 * Automatically determines whether to create a new CV or update an existing one,
 * based on the `type` and presence of `initialData`.
 *
 * Uses `useFormMutation` for handling form submission, validation errors, and
 * feedback notifications.
 *
 * @param props.type - Defines the form mode. Use `"edit"` to update an existing CV, or `"add"` to create a new one.
 * @param props.initialData - The initial form values, used in edit mode to prefill the fields.
 * @param props.onSuccess - Optional callback executed after a successful submission.
 * @param props.onCancel - Optional callback triggered when the user clicks the "Cancel" button.
 *
 * @returns A form element with input fields for CV data and submit/cancel buttons.
 */
export const CvForm: FC<TProps> = ({
  type,
  initialData,
  onSuccess = () => { },
  onCancel = () => { }
}) => {

  const queryClient = useQueryClient()

  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateCV.bind(null, initialData.id)
    : storeCv


  //define toast message
  const toastMessage = type === 'edit' ? 'Данные о резюме успешно обновлены' : 'Новое резюме успешно сохранено'

  const handleSuccess = useCallback(() => {
    onSuccess()
    queryClient.invalidateQueries({ queryKey: ["reserve-infinite-list"] })
  }, [onSuccess, queryClient])


  const { formAction, pending, defaultValues, errors, removeError } = useMutateForm({
    mutationAction: action,
    onSuccess: handleSuccess,
    initialData,
    toastMessage
  })

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem
          labelText="ФИО"
          error={errors.candy_name}
        >
          <Input
            placeholder="ФИО"
            name="candy_name"
            defaultValue={defaultValues?.candy_name}
            className={errors?.candy_name && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Название позиции"
          error={errors.name}
        >
          <Input
            placeholder="Название позиции"
            name="name"
            defaultValue={defaultValues?.name}
            className={errors?.name && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="ID внешней системы"
          error={errors.external_id}
        >
          <Input
            placeholder="ID"
            name="external_id"
            defaultValue={defaultValues?.external_id}
            className={errors?.external_id && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Стаж (в месяцах)"
          error={errors.experience_months}
        >
          <Input
            placeholder="Стаж"
            name="experience_months"
            title="Введите только цифры"
            pattern="[0-9]+"
            defaultValue={defaultValues?.experience_months}
            className={errors?.experience_months && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Зарплата"
          error={errors.salary}
        >
          <Input
            placeholder="Зарплата"
            title="Введите только цифры"
            pattern="[0-9]+"
            name="salary"
            defaultValue={defaultValues?.salary}
            className={errors?.salary && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Телефон"
          error={errors.candy_phone}
        >
          <Input
            placeholder="Телефон"
            name="candy_phone"
            defaultValue={defaultValues?.candy_phone}
            className={errors?.candy_phone && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Телеграмм"
          error={errors.candy_tg}
        >
          <Input
            placeholder="Телеграмм"
            name="candy_tg"
            defaultValue={defaultValues?.candy_tg}
            className={errors?.candy_tg && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Почта"
          error={errors.candy_email}
        >
          <Input
            placeholder="Почта"
            name="candy_email"
            defaultValue={defaultValues?.candy_email}
            className={errors?.candy_email && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Локация"
          error={errors.candy_location}
        >
          <Input
            placeholder="Локация"
            name="candy_location"
            defaultValue={defaultValues?.candy_location}
            className={errors?.candy_location && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Ссылка на резюме"
          error={errors.link}
        >
          <Input
            placeholder="Ссылка на резюме"
            name="link"
            defaultValue={defaultValues?.link}
            className={errors?.link && 'ring-2 ring-destructive'}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Био"
          className="break-before-column"
          error={errors.bio}
        >
          <Textarea
            placeholder="Био"
            name="bio"
            rows={9}
            defaultValue={defaultValues?.bio}
            className={cn("resize-none", errors?.bio && 'ring-2 ring-destructive')}
            onChange={(e) => removeError(e.target.name)}
          />
        </FormItem>

        <FormItem
          labelText="Опыт"
          error={errors.experience_raw}
        >
          <Textarea
            placeholder="Опыт"
            name="experience_raw"
            defaultValue={defaultValues?.experience_raw}
            className={cn("resize-none", errors?.experience_raw && 'ring-2 ring-destructive')}
            onChange={(e) => removeError(e.target.name)}
            rows={17}
          />
        </FormItem>
        <FormItem
          labelText='Навыки'
          error={errors.skills}
        >
          <TagSelect name="skills[]" defaultValue={defaultValues?.skills} suggestionsList={skills} />
        </FormItem>
      </div>


      <div className="self-end">
        <Button type="button" variant="ghost" className="mr-2" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
