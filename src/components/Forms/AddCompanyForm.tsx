'use client';

import { FC } from 'react';

import { storeCompany } from '@/actions/postData';
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
import { cn } from '@/lib/utils';
import { useFormMutation } from '@/hooks/useFormMutation';

type TProps = {
  tariffs: TTariff[];
};

export const AddCompanyForm: FC<TProps> = ({ tariffs }) => {
  const {
    formAction,
    pending,
    defaultValues,
    errors,
    success,
    onChange,
  } = useFormMutation(storeCompany)

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
        <Button type='button' variant="ghost" className="mr-2">
          Отмена
        </Button>

        <Button type="submit">
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
};
