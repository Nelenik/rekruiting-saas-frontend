'use client';

import { storeCv } from '@/shared/api/postData';
import { TResume } from '@/shared/api/types';
import { updateCV } from '@/shared/api/updateData';
import { mutationInitialState } from '@/shared/api/constants';
import convertToFormData from '@/shared/lib/object_manipulations/convertToFormData';
import { NonNullableFields } from '@/shared/lib/object_manipulations/filterFalsyFields';
import { omitFields } from '@/shared/lib/object_manipulations/omitFields';
import { cn } from '@/shared/lib/utils';
import { useFormMutation } from '@/shared/model/hooks/useFormMutation';
import FormItem from '@/shared/ui/FormItem';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';


type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TResume>
  onSuccess?: () => void
  onCancel?: () => void
}

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

  //remove the field "experience" (shoul find a better solution, may be made universal converToFormData function)

  const cleanedInitialData = initialData && omitFields(initialData, ['experience', 'workExperiences'])

  //define initial state
  const initialState = {
    ...mutationInitialState,
    ...(cleanedInitialData && { payload: convertToFormData(cleanedInitialData) })
  }
  //define toast message
  const toastMessage = type === 'edit' ? 'Данные о резюме успешно обновлены' : 'Новое резюме успешно сохранено'

  const { formAction, pending, defaultValues, errors, onChange } =
    useFormMutation({
      mutationAction: action,
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries({ queryKey: ["reserve-infinite-list"] })
      },
      initialState,
      toastMessage
    });

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
            onChange={onChange}
          />
        </FormItem>

        <FormItem
          labelText="Название"
          error={errors.name}
        >
          <Input
            placeholder="Название"
            name="name"
            defaultValue={defaultValues?.name}
            className={errors?.name && 'ring-2 ring-destructive'}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            rows={17}
          />
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
