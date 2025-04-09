import { TResume } from "@/shared/api/types";
import { FileUser, Mail, PhoneCall } from "lucide-react";
import { FC } from "react";
import { workStatusDict } from "../lib/dictionary";
import { cn } from "@/shared/lib/utils";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { formatDurationFromMonths } from "@/shared/lib/formatters/formatDurationFromMonths";
import List from "@/shared/ui/shadcn/list";


type TProps = {
  role: TResume["name"];
  work_status: TResume['status'];
  location: TResume["candy_location"];
  phone: TResume["candy_phone"];
  email: TResume["candy_email"];
  link: TResume["link"];
  bio: TResume["bio"];
  experience_duration: TResume["experience_months"];
  skills: [] | null
  className?: string
}

export const CvInfoBlock: FC<TProps> = ({
  role,
  work_status,
  location,
  phone,
  email,
  link,
  bio,
  experience_duration,
  skills,
  className
}) => {

  return (
    <div className={cn(" flex flex-col gap-6 ", className)}>
      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
        {role}
      </h2>

      <div className='bg-indigo-100 py-3 px-6 rounded-lg flex flex-col gap-1'>
        <h3 className='font-semibold text-base mb-2'>
          Основная информация
        </h3>
        <p className='text-sm'>
          <span className='text-muted-foreground'>
            Статус работы:&nbsp;
          </span>
          <span>{workStatusDict[work_status]}</span>
        </p>
        <p className='text-sm'>
          <span className='text-muted-foreground'>Локация: </span>
          <span>г. {location || '-'}</span>
        </p>
        <a href={`tel:${phone}`} className='text-muted-foreground inline-flex gap-2 items-center text-sm'>
          <PhoneCall width={16} height={16} />
          {phone || '-'}
        </a>
        <a href={`mailto:contact@devid.com`} className='text-muted-foreground inline-flex gap-2 items-center text-sm'>
          <Mail width={16} height={16} />
          {email || '-'}
        </a>
        <a href={`${link || "javascript:void(0)"}`} target="_blank" className='text-blue-700 inline-flex gap-2 items-center underline underline-offset-2 text-sm'>
          <FileUser width={16} height={16} />
          Резюме</a>
      </div>

      <div>
        <h2 className='font-semibold mb-2 text-lg'>Обо мне</h2>
        <TextFormatter text={bio} className="bio text-muted-foreground text-sm" />
      </div>

      <div className='bg-indigo-100 py-3 px-6 rounded-lg '>
        <h2 className='text-lg font-semibold mb-2'>Стаж</h2>
        <p className="text-muted-foreground text-sm">
          {
            experience_duration
              ? formatDurationFromMonths(experience_duration)
              : 'Не указан'
          }
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Навыки</h2>
        <List className='flex gap-3'>
          {
            skills && skills.map(el => (<li key={el} className='bg-indigo-100 rounded-md py-1 px-3.5 text-sm'>{el}</li>)) || <span className="text-muted-foreground text-sm">не указано</span>
          }
        </List>
      </div>
    </div>
  );
}