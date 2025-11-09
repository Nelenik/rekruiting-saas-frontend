'use client'

import { TShortCompany } from "@/shared/api/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules'
import { Button } from "@/shared/ui/shadcn/button";

import ArrowLeftSvg from '@/assets/icons/arrow-left.svg?rc'
import ArrowRightSvg from "@/assets/icons/arrow-right.svg?rc"

import { cn } from "@/shared/lib/utils";
import { CompanyShortInfo } from "@/entities/company/ui/CompanyShortInfo";

type TProps = {
  className?: string,
  companiesList: TShortCompany[]
}
export const CompaniesSwiper = ({
  className,
  companiesList = []
}: TProps) => {

  return (
    <Swiper
      className={cn("w-full min-h-[261px] pb-14 relative", className)}
      modules={[Navigation]}
      navigation={{
        nextEl: '.companies-next',
        prevEl: '.companies-prev',
      }}
      slidesPerView={1}
      spaceBetween={25}
      breakpoints={{
        "450": {
          slidesPerView: 2
        },
        "768": {
          slidesPerView: 3
        },
        "1024": {
          slidesPerView: 4
        }
      }}
    >

      {companiesList.map(company => (
        <SwiperSlide key={company.id}>
          <CompanyShortInfo
            name={company.name}
            count={company.count}
            logo={company.logo}
            rating={company.rating}
          />
          {/* <Card
            className="p-4 flex flex-col gap-2 items-center rounded-3xl border-accent2/10"
          >
            <h3 className="flex gap-2 text-[28px] leading-tight font-medium">{company.name} <AwardBlueSvg className="h-[2cap]" /></h3>
            <CompanyLogo
              imageUrl={getCompanyLogoByName(company.name || '')}
              className=" w-[124px] h-[124px] p-3 shadow-none border border-accent2/10 rounded-3xl"
            />
            <span className="flex gap-2 items-center">
              <span className="text-base font-medium -tracking-[1px]">
                XL
              </span>
              <Star
                className="text-[#FFDD2D]"
                width={12}
                height={12}
                starOptions={{ fullness: 1, id: company.name.replace(' ', '') }}
              />
              <span className="text-base font-medium -tracking-[1px]">
                4.5
              </span>
            </span>
            <Separator />
            <Link
              href={`/vacancies/${company.name ? encodeSegment(company.name.toLocaleLowerCase()) : ''}`}
              className="text-base font-medium -tracking-[1px] hover:text-primary transition-colors"
              target="_blank"
            >

              Вакансии компании ({company.count})

            </Link>
          </Card> */}
        </SwiperSlide>
      ))}

      <span className="absolute left-1/2 -translate-x-1/2 bottom-0">
        <Button variant={'ghost'} className="companies-prev group/swiper2">
          <ArrowLeftSvg className="fill-accent2 group-hover/swiper2:fill-primary" />
        </Button>
        <Button variant={'ghost'} className="companies-next group/swiper2">
          <ArrowRightSvg className="fill-accent2 group-hover/swiper2:fill-primary" />
        </Button>
      </span>
    </Swiper>
  );
}