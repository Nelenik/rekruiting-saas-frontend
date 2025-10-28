import { TPublicVacancy } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { VacancyParams } from "./VacancyParams";
import { CompanyInfoCard } from "@/entities/company/ui/CompanyInfoCard";
import { VacancyDescription } from "./VacancyDescription";
import { GoBackLink } from "@/shared/ui/navigation/GoBackLink";
import { ScrollCTA } from "@/features/rekru-scroll-cta/ui/ScrollCTA";
import { FixedMobileMenu } from "@/widgets/rekru-nav/ui/MobileMenu";

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
        <div className="rekru-container flex items-center justify-between gap-5 ">
          <GoBackLink
            className='p-0'
            text='Назад к списку вакансий'
          />
          <FixedMobileMenu />
        </div>
      </section>
      <section className=" pb-8">
        <div className={cn(
          "rekru-container gap-8 flex flex-col",
          "md-lg:grid md-lg:grid-cols-12 md-lg:grid-row-2"
        )}>
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
              'max-w-[550px]',
              'md-lg:col-span-7 md-lg:max-w-none'
            )}
          />
          <CompanyInfoCard
            {...company.name && { company: company }}
            sourceLink={link}
            className={cn(
              'max-w-[500px]',
              'md-lg:col-span-5 md-lg:row-span-2 md-lg:self-start md-lg:w-full md-lg:max-w-none'
            )}
          />
          <VacancyDescription
            description={description}
            skills={skills}
            responsibilities={responsibilities}
            conditions={conditions}
            addition={addition}
            className={cn(

              'md-lg:col-span-7'
            )}
          />
        </div>

      </section>
      <ScrollCTA />
    </>


  );
}
