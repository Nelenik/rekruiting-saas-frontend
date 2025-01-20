'use client'
// import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Input } from "../../ui/input"

interface IDatePickerProps {
  nameAttr: string
}

const DatePicker = ({ nameAttr }: IDatePickerProps) => {
  const [date, setDate] = useState<Date>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input type="text" value={date ? format(date, 'dd.MM.yyyy') : ''} placeholder='ДД.ММ.ГГГГ' name={nameAttr} readOnly />
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
}

export default DatePicker;