import { Card } from "@/shared/ui/shadcn/card";

import AwardBlueSvg from '@/assets/icons/award-blue.svg?rc'
import { CompanyLogo } from "@/shared/ui/CompanyLogo";
import { Star } from "@/shared/ui/Star";
import { Separator } from "@/shared/ui/shadcn/separator";
import Link from "next/link";
import { getCompanyLogoByName } from "../lib/companies-dict";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { cn } from "@/shared/lib/utils";

type TProps = {
  name: string,
  count?: number,
  logo?: string,
  rating?: number
  it_accreditation?: boolean,
  className?: string
  enableLinkToCompaniesPage?: boolean
}
export const CompanyShortInfo = ({
  name,
  count,
  logo,
  rating,
  it_accreditation,
  className,
  enableLinkToCompaniesPage = true
}: TProps) => {
  return (
    <Card
      className={cn("p-4 flex flex-col gap-2 items-center rounded-3xl border-accent2/10", className)}
    >
      <h3 className="flex gap-2 text-[28px] leading-tight font-medium">{name} {it_accreditation && <AwardBlueSvg className="h-[2cap]" />}
      </h3>
      <CompanyLogo
        imageUrl={logo ? logo : getCompanyLogoByName(name || '')}
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
          starOptions={{ fullness: 1, id: name.replace(' ', '') }}
        />
        <span className="text-base font-medium -tracking-[1px]">
          {rating || 4.5}
        </span>

      </span>
      {enableLinkToCompaniesPage
        && <>
          <Separator />
          <Link
            href={`/vacancies/${name ? encodeSegment(name.toLocaleLowerCase()) : ''}`}
            className="text-base font-medium -tracking-[1px] hover:text-primary transition-colors"
            target="_blank"
          >
            Вакансии компании {count && `(${count})`}
          </Link>
        </>}
    </Card>
  );
}