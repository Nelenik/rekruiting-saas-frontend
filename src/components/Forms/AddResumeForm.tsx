'use client';

import { FC, useActionState } from 'react';

import { mutationInitialState } from '@/actions/constants';
import { storeCv } from '@/actions/postData';
import { TMutationState } from '@/actions/types';

import FormItem from './form_elements/FormItem';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const AddResumeForm: FC = () => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    storeCv,
    mutationInitialState
  );

  console.log({ state, formAction, pending });

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="ФИО">
          <Input placeholder="ФИО" name="candy_name" />
        </FormItem>

        <FormItem labelText="Название">
          <Input placeholder="Название" name="name" />
        </FormItem>

        <FormItem labelText="Опыт">
          <Input placeholder="Опыт" name="experience_months" />
        </FormItem>

        <FormItem labelText="Зарплата">
          <Input placeholder="Зарплата" name="salary" />
        </FormItem>

        <FormItem labelText="Телефон">
          <Input placeholder="Телефон" name="candy_phone" />
        </FormItem>

        <FormItem labelText="Телеграмм">
          <Input placeholder="Телеграмм" name="candy_tg" />
        </FormItem>

        <FormItem labelText="Почта">
          <Input placeholder="Почта" name="candy_email" />
        </FormItem>

        <FormItem labelText="Локация">
          <Input placeholder="Локация" name="candy_location" />
        </FormItem>

        <FormItem labelText="Ссылка на резюме">
          <Input placeholder="Ссылка на резюме" name="link" />
        </FormItem>

        <FormItem labelText="Био" className="break-before-column">
          <Textarea
            placeholder="Био"
            name="bio"
            className="resize-none"
            rows={9}
          />
        </FormItem>

        <FormItem labelText="Опыт">
          <Textarea
            placeholder="Опыт"
            name="experience_raw"
            className="resize-none"
            rows={17}
          />
        </FormItem>
      </div>

      <div className="self-end">
        <Button type="button" variant="ghost" className="mr-2">
          Отмена
        </Button>
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  );
};
