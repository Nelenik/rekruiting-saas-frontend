import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { VacancyParams } from "./VacancyParams";
import { CompanyInfoCard } from "@/entities/company/ui/CompanyInfoCard";
import { VacancyDescription } from "./VacancyDescription";
import { MobileMenu } from "@/widgets/rekru-nav";
import { GoBackLink } from "@/shared/ui/navigation/GoBackLink";
import { ScrollCTA } from "@/features/rekru-scroll-cta/ui/ScrollCTA";

type TProps = {
  vacancy: TPublicVacancy;
  className?: string
}
export const PubVacDetails = ({
  vacancy
}: TProps) => {
  const {
    name,
    salary_from,
    salary_to,
    location,
    experience,
    work_format,
    employment,
    skills,
    responsibilities,
    conditions,
    addition,
    description,
    company,
    link,
    level
  } = vacancy

  return (
    <>
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[10]",
        'md-lg:static md-lg:py-8'
      )}>
        <div className="rekru-container flex items-center justify-between gap-20 ">
          <GoBackLink
            className='p-0'
            text='Назад к списку вакансий'
          />
          <MobileMenu
            className="md-lg:hidden md-lg:invisible"
          />
        </div>
      </section>
      <section className="pt-5 pb-8 md-lg:pt-0">
        <div className="rekru-container grid gap-8 grid-cols-12 grid-row-2">
          <VacancyParams
            level={level}
            name={name}
            link={link}
            salary_from={salary_from}
            salary_to={salary_to}
            location={location}
            work_format={work_format}
            experience={experience}
            employment={employment}
            className={cn(
              'col-span-12 max-w-[550px]',
              'md-lg:col-span-7 md-lg:max-w-unset'
            )}
          />
          <CompanyInfoCard
            {...company.name && { company: company }}
            sourceLink={link}
            className={cn(
              'col-span-12 max-w-[500px]',
              'md-lg:col-span-5 md-lg:row-span-2 md-lg:self-start md-lg:w-full md-lg:max-w-unset'
            )}
          />
          <VacancyDescription
            description={description}
            skills={skills}
            responsibilities={responsibilities}
            conditions={conditions}
            addition={addition}
            className={cn(
              'col-span-12',
              'md-lg:col-span-7'
            )}
          />
        </div>

      </section>
      <ScrollCTA />
    </>


  );
}
