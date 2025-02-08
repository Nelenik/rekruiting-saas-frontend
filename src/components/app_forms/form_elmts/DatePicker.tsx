'use client';

import { format, isValid, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';

interface IDatePickerProps {
  nameAttr: string;
  defaultValue?: string;
  isError?: boolean;
}

const DatePicker = ({
  nameAttr,
  defaultValue = '',
  isError = false,
}: IDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const parsedDate = parseISO(defaultValue);
    if (isValid(parsedDate)) {
      setDate(parsedDate);
    }
  }, [defaultValue]);

  const dateValue =
    date ? format(date, 'dd.MM.yyyy') : "ДД.ММ.ГГГГ";

  return (
    <Popover>
      <PopoverTrigger className={cn('h-10 w-full rounded-md border border-input bg-none px-3 py-2 text-base text-muted-foreground text-start', isError && 'border-destructive')}>
        <span >
          <input type='hidden' value={date ? date.toISOString() : ''} name={nameAttr} />
          {dateValue}
        </span>

      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          defaultMonth={date}
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
