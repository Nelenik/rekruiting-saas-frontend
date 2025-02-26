import { FileUser, Mail, PhoneCall } from "lucide-react";
import List from "./ui/list";
import { FC } from "react";
import { workStatusDict } from "@/shared/dictionaries/resume";
import { ECvStatus, TResume } from "@/shared/types/resume";
import sanitize from "sanitize-html";


type TProps = {
  role: TResume["name"];
  work_status: ECvStatus;
  location: TResume["candy_location"];
  phone: TResume["candy_phone"];
  email: TResume["candy_email"];
  link: TResume["link"];
  bio: TResume["bio"];
  experience_descr: TResume["experience_raw"];
  skills: string | null
}

const CandyInfo: FC<TProps> = ({
  role,
  work_status,
  location,
  phone,
  email,
  link,
  bio,
  experience_descr,
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
        <a href={`${link}`} target="_blank" className='text-blue-700 inline-flex gap-2 items-center underline underline-offset-2 text-sm'>
          <FileUser width={16} height={16} />
          Резюме</a>
      </div>

      <div>
        <h2 className='font-semibold mb-2 text-lg'>Обо мне</h2>
        <BioInfo bio={bio} />
      </div>

      <div className='bg-indigo-100 py-3 px-6 rounded-lg '>
        <h2 className='text-lg font-semibold mb-2'>Стаж</h2>
        <p className="text-muted-foreground text-sm">
          {experience_descr || 'Не указан'}
        </p>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Навыки</h2>
        <List className='flex gap-3'>
          {
            skills && skills.split(',').map(el => (<li key={el} className='bg-indigo-100 rounded-md py-1 px-3.5 text-sm'>{el}</li>)) || <span className="text-muted-foreground text-sm">не указано</span>
          }
        </List>
      </div>
    </div>
  );
}

export default CandyInfo;

/**
 * `BioInfo` component renders a sanitized biography with each section title styled.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.bio - The raw biography string to be rendered. It will be sanitized and formatted before being displayed.
 * 
 * The component:
 * - Sanitizes the bio text to prevent security risks.
 * - Splits the bio into blocks based on double newlines.
 * - Each block is processed to convert newlines into `<br/>` tags.
 * - A regular expression is applied to detect titles (text before a colon, starting with an uppercase letter).
 * - Titles are wrapped in a styled `span` element.
 * - Each block is rendered inside a `div` with `dangerouslySetInnerHTML` to inject HTML content.
 * 
 * @returns {JSX.Element} A list of formatted bio blocks.
 */
const BioInfo = ({ bio }: { bio: string }) => {
  const cleanedBio = sanitize(bio)

  const regexp = /^([A-ZА-ЯЁ][^:\n]+):/g
  const blocks = cleanedBio.split(/\n{2,}/).map((block, id) => {
    const replaced = block
      .replace(/\n/g, '<br/>')
      .replace(regexp, (match) => {
        return `<span class="text-foreground/85 test-sm font-medium">${match}</span>`
      })

    return (
      <div
        key={id}
        className="bio text-muted-foreground text-sm [&:not(:last-child)]:mb-4"
        dangerouslySetInnerHTML={{ __html: replaced }}
      ></div>
    )
  })

  return (
    <>
      {blocks}
    </>
  )
}