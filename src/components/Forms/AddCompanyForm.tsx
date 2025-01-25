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

type TProps = {
  tariffs: TTariff[];
};

export const AddCompanyForm: FC<TProps> = ({ tariffs }) => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    storeCompany,
    mutationInitialState
  );

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="Название">
          <Input placeholder="Название" name="name" />
        </FormItem>

        <FormItem labelText="Полное наименование">
          <Textarea
            placeholder="Полное наименование"
            name="full_name"
            className="resize-none"
            rows={9}
          />
        </FormItem>

        <FormItem labelText="Описание">
          <Textarea
            placeholder="Описание организации"
            name="description"
            className="resize-none"
            rows={17}
          />
        </FormItem>

        <FormItem labelText="ИНН" className="break-before-column">
          <Input placeholder="ИНН" name="inn" />
        </FormItem>

        <FormItem labelText="Тариф">
          <Select name="rate">
            <SelectTrigger>
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

        <FormItem labelText="Дата оплаты">
          <DatePicker nameAttr="rate_at" />
        </FormItem>
      </div>

      <div className="self-end">
        <Button variant="ghost" className="mr-2">
          Отмена
        </Button>

        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
