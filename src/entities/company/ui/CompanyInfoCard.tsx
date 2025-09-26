import { TCompany } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Card, CardTitle } from "@/shared/ui/shadcn/card";
import { getCompanyLinkByName, getCompanyLogoByName } from "../lib/companies-dict";
import AwardSvg from '@/assets/icons/award.svg?rc'
import { TextFormatter } from "@/shared/ui/TextFormatter";
import Link from "next/link";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { CompanyLogo } from "@/shared/ui/CompanyLogo";

const companySample: Partial<TCompany> & { count?: number, accreditation?: boolean, size?: string } = {
  id: 1,
  name: "Т-Банк",
  full_name: "Тинькофф Банк",
  description: "Т‑Банк — онлайн-экосистема, основанная на финансовых и лайфстайл-услугах.\nКлиентами Т‑Банка стали 51 млн человек по всей России. Т‑Банк — второй крупнейший банк страны по количеству активных клиентов.",
  count: 1200,
  accreditation: true,
  size: "XL",
}

type TProps = {
  className?: string,
  sourceLink?: string,
  company?: Partial<TCompany> & { count?: number, accreditation?: boolean, size?: string }
}
export const CompanyInfoCard = ({
  company = companySample,
  sourceLink,
  className
}: TProps) => {

  console.log(getCompanyLogoByName(company.name || ''))
  return (
    <Card className={cn(
      'relative flex flex-col gap-5 p-8',
      ' rounded-3xl border-none bg-secondary ',
      'shadow-[0_2px_2px_rgba(35,112,242,4%),0_4px_6px_rgba(35,112,242,4%),0_12px_16px_rgba(35,112,242,8%)]',
      className
    )}
    >
      <CompanyLogo
        imageUrl={getCompanyLogoByName(company.name || '')}
        className="absolute top-8 right-8 w-[72px] h-[72px]"
      />
      <div>
        <CardTitle className="mb-2">{company.name || 'Не указана'}</CardTitle>
        <a
          href={getCompanyLinkByName(company.name || '') || '!#'}
          target="_blank"
          rel='noreferrer'
          className={cn('inline-block text-sm  font-semibold text-primary underline underline-offset-4 decoration-transparent', 'hover:decoration-primary hover:scale-105 transition-all')}
        >
          Перейти на сайт
        </a>
      </div>
      <div>
        <p
          className="text-secondary-foreground text-sm"
        >
          Размер компании
        </p>
        <p
          className="font-semibold text-base"
        >
          {company.size || '-'}
        </p>
      </div>
      {company.accreditation
        && <p className="flex items-center gap-2">
          <AwardSvg className=" fill-yellow-500/70" />
          Аккредитованная it компания
        </p>}
      <div>
        <TextFormatter
          text={company.description || 'Описание компании не указано'}
          className='text-sm text-foreground'
        />
      </div>
      <div className="flex items-center justify-between">
        <a
          href={sourceLink || '!#'}
          target="_blank"
          rel="noreferrer"
          className=' inline-block text-sm font-semibold text-primary hover:scale-105 transition-transform'
        >Перейти к текущей вакансии</a>
        <Link
          href={`/vacancies/all/${company.name ? encodeSegment(company.name.toLocaleLowerCase()) : ''}`}
          target="_blank"
          className='text-sm text-secondary-foreground font-semibold  hover:scale-105 transition-transform'
        >
          Все вакансии ({company.count || 0})
        </Link>
      </div>

    </Card>
  );
}