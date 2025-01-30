'use client';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';

interface IDatePickerProps {
  nameAttr: string;
  defaultValue?: string | number | Date;
  isError?: boolean;
}

const DatePicker = ({
  nameAttr,
  defaultValue = '',
  isError = false,
}: IDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  const dateValue =
    date || defaultValue ? format(date || defaultValue, 'dd.MM.yyyy') : '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          type="text"
          value={dateValue}
          placeholder="ДД.ММ.ГГГГ"
          name={nameAttr}
          readOnly
          className={cn(isError && 'border-destructive')}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
