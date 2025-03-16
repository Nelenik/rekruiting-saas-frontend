'use client';

import { FC } from 'react';

import { storeCv } from '@/actions/postData';

import FormItem from './form_elmts/FormItem';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useFormMutation } from '@/hooks/useFormMutation';
import { cn } from '@/lib/utils';
import { updateCV } from '@/actions/updateData';
import { NonNullableFields } from '@/lib/utils/filterFalsyFields';
import { mutationInitialState } from '@/actions/constants';
import convertToFormData from '@/lib/utils/convertToFormData';
import { TResume } from '@/shared/types/resume';
import { omitFields } from '@/lib/utils/omitFields';

type TProps = {
  type: 'edit' | 'add'
  initialData?: NonNullableFields<TResume>
  onSuccess?: () => void
  onCancel?: () => void
}

const ResumeForm: FC<TProps> = ({
  type,
  initialData,
  onSuccess = () => { },
  onCancel = () => { }
}) => {
  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateCV.bind(null, initialData.id)
    : storeCv

  //remove the field "experience" (shoul find a better solution, may be made universal converToFormData function)

  const cleanedInitialData = initialData && omitFields(initialData, ['experience'])

  //define initial state
  const initialState = {
    ...mutationInitialState,
    ...(cleanedInitialData && { payload: convertToFormData(cleanedInitialData) })
  }
  //define toast message
  const toastMessage = type === 'edit' ? 'Данные о резюме успешно обновлены' : 'Новое резюме успешно сохранено'

  const { formAction, pending, defaultValues, errors, onChange } =
    useFormMutation(action, onSuccess, initialState, toastMessage);

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
          labelText="Стаж"
          error={errors.experience_months}
        >
          <Input
            placeholder="Стаж"
            name="experience_months"
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

export default ResumeForm;