import { TCompany } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { CompanyShortInfo } from "./CompanyShortInfo";
import { ReactElement } from "react";


type TProps = {
  className?: string,
  company: TCompany,
  ResponseButton?: ReactElement
}
export const CompanyInfoCard = ({
  company,
  className,
  ResponseButton
}: TProps) => {

  return (
    <Card
      className={cn(
        'p-4 sm:p-8 rounded-3xl flex flex-col  gap-5 ',
        'md:flex-row',
        className
      )}
    >
      <div className={cn(
        "flex flex-col gap-5 w-full",
        'md:w-1/3'
      )}>

        <CompanyShortInfo
          className="aspect-square max-w-[220px] md:max-w-[282px] min-w-[220px] justify-center"
          name={company.name}
          rating={company.rating}
          logo={company.logo}
          it_accreditation={company.it_accreditation}
          enableLinkToCompaniesPage={false}
        />
        {ResponseButton}
      </div>

      <div className="grow w-full md:w-2/3 ">
        <ul className="flex flex-col gap-3 xs:gap-8 xs:justify-between  xs:flex-row mb-6 md:mb-10">
          <li className="flex flex-col gap-2">
            <span className="text-accent2/40">Сайт компании</span>
            <span>{company.site || '-'}</span>
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-accent2/40">Город</span>
            <span> -</span>

          </li>
          <li className="flex flex-col gap-2">
            <span className="text-accent2/40">Количество сотрудников</span>
            <span>-</span>
          </li>
        </ul>
        <div >
          <TextFormatter text={company.description} className="text-foreground" />
        </div>
      </div>

    </Card>

  );
}