import Image from "next/image";
import { cn } from "@/shared/lib/utils";

import ReviewSvg from '@/assets/icons/carbon_review.svg?rc'
import SecureSvg from '@/assets/icons/secure.svg?rc'
import AwardSvg from '@/assets/icons/award.svg?rc'
import PeopleSvg from '@/assets/icons/people.svg?rc'
export const TrustSection = () => {
  return (
    <>
      <h2 className={cn(
        'mb-5 md:mb-10 text-3xl font-semibold tracking-tighter text-center',
        'lg:text-5xl'
      )}>
        Why they trust us
      </h2>
      <ul className="flex flex-col gap-5">
        <li className="flex">
          <div className="xs:basis-1/2 p-5 md:p-[50px] flex flex-col gap-4 items-end border-r-2 border-accent2 xs:border-none">
            <span className="w-12 h-12 p-3 rounded-md bg-accent2">
              <ReviewSvg />
            </span>
            <h3 className="text-xl lg:text-[28px] leading-[110%] font-medium lg:tracking-tighter text-end">Anna, marketing specialist</h3>
            <p className="max-w-[425px] text-base text-accent2/80 text-end ">&quot;The site was very convenient and easy to use. I found a suitable vacancy here and got a job that I really enjoy&quot;</p>
          </div>
          <div className="hidden xs:block basis-1/2 ">
            <Image
              src={'/assets/other-img/trust1.webp'}
              alt=""
              aria-hidden
              width={473}
              height={300}
              className=" lg:w-3/4 h-full object-cover rounded-r-3xl"
            />
          </div>
        </li>
        <li className="flex">
          <div className="hidden xs:block basis-1/2">

            <Image
              src={'/assets/other-img/trust2.webp'}
              alt=""
              aria-hidden
              width={473}
              height={300}
              className="lg:w-3/4 h-full object-cover rounded-l-3xl ml-auto"
            />
          </div>
          <div className="xs:basis-1/2 p-5 md:p-[50px] flex flex-col gap-4 items-start border-l-2 border-[#BFDFF6] xs:border-none">
            <span className="w-12 h-12 p-3 rounded-md bg-[#BFDFF6]">
              <SecureSvg />
            </span>
            <h3 className="text-xl lg:text-[28px] leading-[110%] font-medium lg:tracking-tighter text-start">Data security</h3>
            <p className="max-w-[425px] text-base text-accent2/80 text-start ">We care about your security: we use SSL encryption, verify employers and protect your personal data at every step of the job search</p>
          </div>
        </li>
        <li className="flex">
          <div className="xs:basis-1/2 p-5 md:p-[50px] flex flex-col gap-4 items-end border-r-2 border-accent2 xs:border-none">
            <span className="w-12 h-12 p-3 rounded-md bg-accent2">
              <AwardSvg className="fill-white" />
            </span>
            <h3 className="text-xl lg:text-[28px] leading-[110%] font-medium lg:tracking-tighter text-end">HR-Tech Award 2024</h3>
            <p className="max-w-[425px] text-base text-accent2/80 text-end ">RekrutAI was recognized as the best digital job search service by DigitalHR</p>
          </div>
          <div className="hidden xs:block basis-1/2">

            <Image
              src={'/assets/other-img/trust3.webp'}
              alt=""
              aria-hidden
              width={473}
              height={300}
              className="lg:w-3/4 h-full object-cover rounded-r-3xl"
            />
          </div>
        </li>
        <li className="flex">
          <div className="hidden xs:block basis-1/2">

            <Image
              src={'/assets/other-img/trust4.webp'}
              alt=""
              aria-hidden
              width={473}
              height={300}
              className="lg:w-3/4 h-full object-cover rounded-l-3xl ml-auto"
            />
          </div>
          <div className="xs:basis-1/2 p-5 md:p-[50px] flex flex-col gap-4 items-start border-l-2 border-[#BFDFF6] xs:border-none">
            <span className="w-12 h-12 p-3 rounded-md bg-[#BFDFF6]">
              <PeopleSvg />
            </span>
            <h3 className="text-xl lg:text-[28px] leading-[110%] font-medium lg:tracking-tighter text-start">Reliable partners</h3>
            <p className="max-w-[425px] text-base text-accent2/80 text-start">We care about your security: we only post vacancies from verified companies and agencies</p>
          </div>
        </li>
      </ul>
    </>

  );
}