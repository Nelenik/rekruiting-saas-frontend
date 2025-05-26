'use client';

import { getTariffs } from '@/shared/api/getData';
import { storeCompany } from '@/shared/api/postData';
import { TCompany } from '@/shared/api/types';
import { updateCompany } from '@/shared/api/updateData';
import { mutationInitialState } from '@/shared/api/constants';
import convertToFormData from '@/shared/lib/object_manipulations/convertToFormData';
import { NonNullableFields } from '@/shared/lib/object_manipulations/filterFalsyFields';
import { cn } from '@/shared/lib/utils';
import { useFormMutation } from '@/shared/model/hooks/useFormMutation';
import DatePicker from '@/shared/ui/DatePicker';
import FormItem from '@/shared/ui/FormItem';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';


type TProps = {
  type: 'edit' | 'add',
  initialData?: NonNullableFields<TCompany>,
  onSuccess?: () => void,
  onCancel?: () => void,
}

export const CompanyForm: FC<TProps> = ({
  type,
  initialData,
  onSuccess = () => { },
  onCancel = () => { }
}) => {

  const { data: tariffs = [] } = useQuery({
    queryFn: getTariffs,
    queryKey: ['tariffs']
  })

  //define form action depending of the form type
  const action = type === 'edit' && initialData
    ? updateCompany.bind(null, initialData.id)
    : storeCompany

  //define initial state
  const initialState = {
    ...mutationInitialState,
    ...(initialData && { payload: convertToFormData(initialData) })
  }
  //define toast message
  const toastMessage = type === 'edit' ? 'Данные о компании успешно обновлены' : 'Новая компания успешно сохранена'

  const { formAction, pending, defaultValues, errors, onChange } =
    useFormMutation({
      mutationAction: action,
      onSuccess: () => {
        onSuccess()
      },
      initialState,
      toastMessage
    });

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="Название" error={errors?.name}>
          <Input
            placeholder="Название"
            name="name"
            defaultValue={defaultValues?.name}
            className={errors?.name && 'ring-2 ring-destructive'}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Полное наименование" error={errors?.full_name}>
          <Textarea
            placeholder="Полное наименование"
            name="full_name"
            className={cn("resize-none", errors?.full_name && 'ring-2 ring-destructive')}
            rows={9}
            defaultValue={defaultValues?.full_name}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Описание" error={errors?.description}>
          <Textarea
            placeholder="Описание организации"
            name="description"
            className={cn("resize-none", errors?.description && 'ring-2 ring-destructive')}
            rows={17}
            defaultValue={defaultValues?.description}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="ИНН" className="break-before-column" error={errors?.inn}>
          <Input
            placeholder="ИНН"
            name="inn"
            defaultValue={defaultValues?.inn}
            className={cn(errors?.inn && 'ring-2 ring-destructive')}
            onChange={onChange}
          />
        </FormItem>

        <FormItem labelText="Тариф" error={errors?.tariff}>
          <Select
            name="rate"
            defaultValue={defaultValues?.rate}
          >
            <SelectTrigger
              className={cn(errors?.rate && 'ring-2 ring-destructive')}
            >
              <SelectValue
                placeholder="Выбранный тарифный план"
              />
            </SelectTrigger>

            <SelectContent>
              {tariffs.map((tariff) => (
                <SelectItem key={tariff.id} value={tariff.id}>
                  {tariff.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem
          labelText="Дата оплаты"
          error={errors?.rate_at}
        >
          <DatePicker
            nameAttr="rate_at"
            defaultValue={defaultValues?.rate_at}
          />
        </FormItem>
      </div>

      <div className="self-end">
        <Button
          type='button'
          variant="ghost"
          className="mr-2"
          onClick={onCancel}
        >
          Отмена
        </Button>

        <Button type="submit">
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
};
