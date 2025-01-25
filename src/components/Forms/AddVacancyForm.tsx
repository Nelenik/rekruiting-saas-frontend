'use client';

import { FC, useActionState } from 'react';

import { mutationInitialState } from '@/actions/constants';
import { storeVacancy } from '@/actions/postData';
import { TMutationState } from '@/actions/types';
import { vacancyPositionsDict } from '@/shared/dictionaries';

import { Textarea } from '../ui/textarea';
import FormItem from './form_elements/FormItem';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import {
  EVacancyEmployment,
  EVacancyExperience,
  EVacancyWorkFormat,
} from '@/shared/types';

type TProps = {
  vacancyPositions: string[];
};

export const AddVacancyForm: FC<TProps> = ({ vacancyPositions }) => {
  const [state, formAction, pending] = useActionState<TMutationState, FormData>(
    storeVacancy,
    mutationInitialState
  );

  console.log({ state, formAction, pending });

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
        <FormItem labelText="Название вакансии">
          <Input placeholder="Название вакансии" name="name" />
        </FormItem>

        <FormItem labelText="Позиция">
          <Select name="position">
            <SelectTrigger>
              <SelectValue placeholder="Выберите позицию" />
            </SelectTrigger>
            <SelectContent>
              {vacancyPositions.map((position) => (
                <SelectItem key={position} value={position}>
                  {vacancyPositionsDict[position]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem labelText="Обязанности">
          <Textarea
            placeholder="Обязанности"
            name="responsibilities"
            className="resize-none"
            rows={9}
          />
        </FormItem>

        <FormItem labelText="Условия">
          <Textarea
            placeholder="Условия"
            name="conditions"
            className="resize-none"
            rows={10}
          />
        </FormItem>

        <FormItem labelText="Занятость">
          <Select name="employment">
            <SelectTrigger>
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

        <div className="break-before-column">
          <p className="mb-[10px] font-medium">Оплата</p>
          <div className="flex gap-4">
            <FormItem>
              <Input placeholder="от" name="salary_from" />
            </FormItem>
            <FormItem>
              <Input placeholder="до" name="salary_to" />
            </FormItem>
          </div>
        </div>

        <FormItem labelText="Требования ">
          <Textarea
            placeholder="Требования к кандидату"
            name="skills"
            className="resize-none"
            rows={8}
          />
        </FormItem>

        <div>
          <p className="mb-[10px] font-medium">Формат работы</p>
          <div className="flex gap-3 items-center justify-between">
            <FormItem
              labelText="Офис"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.OFFICE}
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
                className="h-[20px]"
              />
            </FormItem>
          </div>
        </div>

        <FormItem labelText="Опыт">
          <Select name="experience">
            <SelectTrigger>
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

        <FormItem labelText="География">
          <Select name="location">
            <SelectTrigger>
              <SelectValue placeholder="Выбирете город" />
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
      </div>

      <div className="self-end">
        <Button type='button' variant="ghost" className="mr-2">
          Отмена
        </Button>
        <Button type="submit">Создать</Button>
      </div>
    </form>
  );
};
