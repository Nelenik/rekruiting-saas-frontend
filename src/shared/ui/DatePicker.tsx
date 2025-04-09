'use client';

import { Popover } from '@radix-ui/react-popover';
import { format, isValid, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { PopoverContent, PopoverTrigger } from './shadcn/popover';
import { cn } from '@/shared/lib/utils';
import { Calendar } from './shadcn/calendar';

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
