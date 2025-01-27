'use client';

import { FC, Suspense, useCallback } from 'react';

import { storeVacancy } from '@/actions/postData';
import { vacancyPositionsDict } from '@/shared/dictionaries';

import { Textarea } from '../ui/textarea';
import FormItem, { ErrorMessage } from './form_elmts/FormItem';
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
import { useFormMutation } from '@/hooks/useFormMutation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getVacancyPositions } from '@/actions/getData';
import { useQuery } from '@tanstack/react-query';

type TProps = {
  closeModal: () => void
};

export const AddVacancyForm: FC<TProps> = ({ closeModal }) => {
  const { toast } = useToast()

  const { data: vacancyPositions } = useQuery({
    queryFn: getVacancyPositions,
    queryKey: ["vacancy", "positions"]
  });

  const handleSuccess = useCallback(() => {
    closeModal();
    toast({
      description: 'Вакансия успешно создана',
    });
  }, [closeModal, toast]);

  const {
    formAction,
    pending,
    defaultValues,
    errors,
    onChange
  } = useFormMutation(storeVacancy, handleSuccess)

  return (
    <form action={formAction} className="flex flex-col justify-between grow">
      <div className="sm:columns-2 sm:gap-6 [&>*:not(:last-child)]:mb-6 mb-6">
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
          <Select
            name="position"
            defaultValue={defaultValues?.name}
          >
            <SelectTrigger className={errors.position && 'ring-2 ring-destructive'}>
              <SelectValue placeholder="Выберите позицию" />
            </SelectTrigger>
            <SelectContent>
              {vacancyPositions && vacancyPositions.map((position) => (
                <SelectItem key={position} value={position}>
                  {vacancyPositionsDict[position]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem
          labelText="Обязанности"
          error={errors.responsibilities}
        >
          <Textarea
            placeholder="Обязанности"
            name="responsibilities"
            className={cn("resize-none", errors.responsibilities && 'ring-2 ring-destructive')}
            rows={9}
            defaultValue={defaultValues?.responsibilities}
            onChange={onChange}
          />
        </FormItem>

        <FormItem
          labelText="Условия"
          error={errors.conditions}
        >
          <Textarea
            placeholder="Условия"
            name="conditions"
            className={cn("resize-none", errors.conditions && 'ring-2 ring-destructive')}
            rows={10}
            defaultValue={defaultValues?.conditions}
            onChange={onChange}
          />
        </FormItem>

        <FormItem
          labelText="Занятость"
          error={errors.employment}
        >
          <Select
            name="employment"
            defaultValue={defaultValues?.employment}
          >
            <SelectTrigger className={cn(errors.employment && 'ring-2 ring-destructive')}>
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

        <FormItem labelText="Требования " error={errors.skills}>
          <Textarea
            placeholder="Требования к кандидату"
            name="skills"
            className={cn('resize-none', errors.skills && 'ring-2 ring-destructive')}
            rows={8}
            defaultValue={defaultValues?.skills}
            onChange={onChange}
          />
        </FormItem>

        <div>
          <p className="mb-[10px] font-medium">Формат работы</p>
          <div className="flex gap-3 items-center justify-between relative">
            {errors.work_format && <ErrorMessage message={errors.work_format} />}
            <FormItem
              labelText="Офис"
              className="flex flex-row-reverse items-center [&>span]:font-normal"
            >
              <Input
                type="radio"
                name="work_format"
                value={EVacancyWorkFormat.OFFICE}
                defaultChecked={defaultValues?.work_format === EVacancyWorkFormat.OFFICE}
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
                defaultChecked={defaultValues?.work_format === EVacancyWorkFormat.REMOTE}
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
                defaultChecked={defaultValues?.work_format === EVacancyWorkFormat.HYBRID}
                className="h-[20px]"
              />
            </FormItem>
          </div>
        </div>

        <FormItem labelText="Опыт" error={errors.experience}>
          <Select
            name="experience"
            defaultValue={defaultValues?.experience}
          >
            <SelectTrigger className={cn(errors.experience && 'ring-2 ring-destructive')}>
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

        <FormItem
          labelText="География"
          error={errors.location}
        >
          <Select
            name="location"
            defaultValue={defaultValues?.location}
          >
            <SelectTrigger
              className={cn(errors.location && 'ring-2 ring-destructive')}
            >
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
        <Button type="submit">
          {pending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
};
