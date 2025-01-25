'use client';

import { FC, useActionState } from 'react';

import { mutationInitialState } from '@/actions/constants';
import { storeCompany } from '@/actions/postData';
import { TMutationState } from '@/actions/types';
import { TTariff } from '@/shared/types';

import FormItem from './form_elements/FormItem';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import DatePicker from './form_elements/DatePicker';
import { Button } from '../ui/button';
import { convertFormData } from '@/lib/utils/convertFormData';
import { cn } from '@/lib/utils';

type TProps = {
  tariffs: TTariff[];
};

export const AddCompanyForm: FC<TProps> = ({ tariffs }) => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    storeCompany,
    mutationInitialState
  );

  const defaultValues = state.payload ? convertFormData(state.payload) : undefined;

  const errors = state.error?.details

  console.log(state)
  console.log(defaultValues)

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="Название" error={errors?.name}>
          <Input placeholder="Название" name="name" defaultValue={defaultValues?.name} className={errors?.name && 'border-destructive'} />
        </FormItem>

        <FormItem labelText="Полное наименование" error={errors?.full_name}>
          <Textarea
            placeholder="Полное наименование"
            name="full_name"
            className={cn("resize-none", errors?.full_name && 'border-destructive')}
            rows={9}
            defaultValue={defaultValues?.full_name}
          />
        </FormItem>

        <FormItem labelText="Описание" error={errors?.description}>
          <Textarea
            placeholder="Описание организации"
            name="description"
            className={cn("resize-none", errors?.description && 'border-destructive')}
            rows={17}
            defaultValue={defaultValues?.description}
          />
        </FormItem>

        <FormItem labelText="ИНН" className="break-before-column" error={errors?.inn}>
          <Input placeholder="ИНН" name="inn" defaultValue={defaultValues?.inn} className={cn(errors?.inn && 'border-destructive')} />
        </FormItem>

        <FormItem labelText="Тариф" error={errors?.tariff}>
          <Select name="rate" defaultValue={defaultValues?.rate}>
            <SelectTrigger className={cn(errors?.rate && 'border-destructive')}>
              <SelectValue placeholder="Выбранный тарифный план" />
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

        <FormItem labelText="Дата оплаты" error={errors?.rate_at}>
          <DatePicker nameAttr="rate_at" defaultValue={defaultValues?.rate_at} />
        </FormItem>
      </div>

      <div className="self-end">
        <Button type='button' variant="ghost" className="mr-2">
          Отмена
        </Button>

        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
