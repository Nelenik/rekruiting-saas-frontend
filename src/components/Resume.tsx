import { PhoneCall, Mail, FileUser, Dot } from 'lucide-react'
import List from './ui/list';

// interface IResumeProps {

// }

const Resume = () => {
  return (
    <div className='flex gap-6 flex-col lg:flex-row lg:gap-10 '>
      <div className='[&>div:not(:last-child)]:mb-6 lg:w-2/5'>
        <div className=''>
          <h1 className="scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight capitalize">Ivanov Ivan Ivan</h1>
          <p className="lowercase text-lg font-semibold"> менеджер по продажам</p>
        </div>
        <div className='bg-indigo-100 py-3 px-6 rounded-lg flex flex-col gap-1'>
          <h3 className='font-semibold text-base mb-2'>Основная информация</h3>
          <p className='text-sm'>
            <span className='text-muted-foreground'>Статус работы: </span>
            <span>не в поиске</span>
          </p>
          <p className='text-sm'>
            <span className='text-muted-foreground'>Локация: </span>
            <span>г. Москва</span>
          </p>
          <a href={`tel:+990 343 23443`} className='text-muted-foreground inline-flex gap-2 items-center'>
            <PhoneCall width={16} height={16} />
            +990 343 23443
          </a>
          <a href={`mailto:contact@devid.com`} className='text-muted-foreground inline-flex gap-2 items-center'>
            <Mail width={16} height={16} />
            contact@devid.com
          </a>
          <a href="/test.pdf" target="_blank" className='text-blue-700 inline-flex gap-2 items-center underline underline-offset-2'>
            <FileUser width={16} height={16} />
            Резюме</a>
        </div>
        <div className=''>
          <h2 className='text-lg font-semibold mb-2'>Обо мне</h2>
          <p className='text-muted-foreground'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsam dolore earum tenetur reprehenderit iusto delectus iste nulla magni, incidunt rerum explicabo dolorum, magnam optio pariatur sequi sunt sapiente. Perferendis mollitia quod, autem, cum voluptate porro recusandae tempore quam quae quidem vitae voluptates iste alias. Quam, laudantium! Ducimus, dicta a?
          </p>
        </div>
        <div className='bg-indigo-100 py-3 px-6 rounded-lg '>
          <h2 className='text-lg font-semibold mb-2'>Стаж</h2>
          <List className='text-muted-foreground border-l border-blue-700/50 pl-8 flex flex-col gap-6'>
            <li className='relative before:absolute before:-left-8 before:top-[50%] before:-translate-y-2/4 before:content-["—"] before:text-blue-700/50'>
              январь 2017 - январь 2024
            </li>
            <li className='relative before:absolute before:-left-8 before:top-[50%] before:-translate-y-2/4 before:content-["—"] before:text-blue-700/50'>
              <p className='text-foreground'>на последнем месте работы: </p>
              январь 2019 - январь 2024
            </li>
          </List>
        </div>
        <div className=''>
          <h2 className='text-lg font-semibold mb-2'>Навыки</h2>
          <List className='flex gap-3'>
            {
              ['Усидчивость', 'Node.js', 'Agile'].map(el => (<li key={el} className='bg-indigo-100 rounded-md py-1 px-3.5'>{el}</li>))
            }
          </List>
        </div>
      </div>

      <div className='lg:w-3/5'>
        <h2 className='mb-6 text-lg font-semibold'>Опыт работы</h2>
        <List className='
          grid grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] gap-y-6 gap-x-10
        '>
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className="bg-indigo-100 py-3 px-6 rounded-lg flex flex-col gap-2">
              <p className='flex gap-2 items-center'>
                <span className='text-blue-700'>Яндекс</span>
                <Dot />
                <span>менеджер по продажам</span>

              </p>
              <p className='text-muted-foreground'>январь 2019 - январь 2024</p>
              <p className='text-muted-foreground'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eius quis, ducimus consequatur, placeat consectetur doloremque consequuntur illum aperiam ullam, voluptates provident. Error, vel asperiores. Sit ducimus labore dolores dicta.
              </p>
            </li>
          ))}
        </List>

      </div>
    </div>
  );
}

export default Resume;