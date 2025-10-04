'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import { RekruCTA } from '@/shared/ui/buttons/RekruCTA';
import { cn } from '@/shared/lib/utils';

// type TProps = {

// }
export const Hero = ({ }) => {
  return (
    <section
      className='min-h-[495px] overflow-hidden'
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}

      >
        <SwiperSlide className='bg-secondary'>
          <div className={cn(
            "rekru-container flex flex-col justify-between gap-8 py-8 items-center",
            "md:flex-row"
          )}>
            <div className={cn(
              'flex flex-col items-center',
              'md:w-[60%] md:items-start'

            )}>
              <h1 className={cn(
                'w-[550px] mb-5 text-5xl  font-medium hyphens-auto [overflow-wrap:anywhere]',
                "lg:text-7xl lg:-tracking-[3px] md:w-full"
              )}>
                Премиум вакансии
                для профессионалов
              </h1>
              <p className='mb-10 -tracking-[1px] max-w-[550px] text-base'>
                Ваш карьерный рост начинается здесь: только лучшие предложения от ведущих работодателей. Доверяйте экспертам, выбирайте будущее
              </p>
              <RekruCTA
                view="dark"
                className={cn(
                  ' text-lg font-semibold tracking-[2.5px]',

                )}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </RekruCTA>
            </div>
            <picture className={cn(
              'h-[200px] flex flex-col overflow-hidden',
              "md:h-full"
            )}>
              <source srcSet="/assets/hero-part.webp" media="(min-width: 768px)"></source>
              <img src="/assets/hero-big.webp" alt="иллюстративное изображение" aria-hidden className='object-cover w-full h-auto' />
            </picture>
          </div>
        </SwiperSlide>
        <SwiperSlide>slide2</SwiperSlide>

        <RekruCTA

          view='stroke'
          className={cn(
            'hero-prev w-[30px] h-[30px] absolute z-10 left-2.5 top-1/2 -translate-y-1/2 rounded-full p-0',
            "md:[&_svg]:size-5 md:w-10 md:h-10",
            "xl:[&_svg]:size-10 xl:w-20 xl:h-20"
          )}
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </RekruCTA>

        <RekruCTA
          view='stroke'
          className={cn(
            'hero-next w-[30px] h-[30px] absolute z-10 right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0',
            "md:[&_svg]:size-5 md:w-10 md:h-10",
            "xl:[&_svg]:size-10 xl:w-20 xl:h-20"
          )}
        >
          <ChevronRight width={40} height={40} strokeWidth={1} />
        </RekruCTA>

        {/* <button className="hero-prev absolute z-10 left-5 top-1/2"></button>
        <button className="hero-next absolute z-10 right-5 top-1/2"><ChevronRight size={40} strokeWidth={1} /></button> */}
      </Swiper>
    </section >
  );
}