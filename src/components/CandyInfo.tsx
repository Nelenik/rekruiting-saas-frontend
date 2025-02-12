import { FileUser, Mail, PhoneCall } from "lucide-react";
import List from "./ui/list";
import { FC } from "react";
import { workStatusDict } from "@/shared/dictionaries/resume";
import { ECvStatus } from "@/shared/types/resume";



type TProps = {
  role: string;
  work_status: ECvStatus;
  location: string;
  phone: string;
  email: string;
  link: string;
  bio: string;
  total_experience: string;
  last_experience: string;
  skills: string
}

const CandyInfo: FC<TProps> = ({
  role,
  work_status,
  location,
  phone,
  email,
  link,
  bio,
  total_experience,
  last_experience,
  skills,
}) => {
  return (
    <div className=" flex flex-col gap-6 ">
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
          <span>г. {location}</span>
        </p>
        <a href={`tel:+990 343 23443`} className='text-muted-foreground inline-flex gap-2 items-center text-sm'>
          <PhoneCall width={16} height={16} />
          {phone}
        </a>
        <a href={`mailto:contact@devid.com`} className='text-muted-foreground inline-flex gap-2 items-center text-sm'>
          <Mail width={16} height={16} />
          {email}
        </a>
        <a href={`${link}`} target="_blank" className='text-blue-700 inline-flex gap-2 items-center underline underline-offset-2 text-sm'>
          <FileUser width={16} height={16} />
          Резюме</a>
      </div>

      <div>
        <h2 className='font-semibold mb-2 text-lg'>Обо мне</h2>
        <p className='text-muted-foreground text-sm'>
          {bio}
        </p>
      </div>

      <div className='bg-indigo-100 py-3 px-6 rounded-lg '>
        <h2 className='text-lg font-semibold mb-2'>Стаж</h2>
        <p className="text-muted-foreground text-sm">
          {total_experience}
        </p>
        <p className="text-sm">
          на последнем месте работы:
        </p>
        <p className="text-muted-foreground text-sm">
          {last_experience}
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Навыки</h2>
        <List className='flex gap-3'>
          {
            skills.split(',').map(el => (<li key={el} className='bg-indigo-100 rounded-md py-1 px-3.5 text-sm'>{el}</li>))
          }
        </List>
      </div>
    </div>
  );
}

export default CandyInfo;