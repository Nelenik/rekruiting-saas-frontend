import { CompanyInfoCard } from '@/entities/company/ui/CompanyInfoCard';
import { vacancyEpmpoymentDict } from '@/entities/vacancy';
import { PubVacDetails } from '@/pages-layer/pub-vac-details';
import { getPubVacancy } from '@/shared/api/actions/public-vacancy';
import { TPublicVacancy } from '@/shared/api/types';
import { encodeSegment } from '@/shared/lib/encodeSegments';
import { GoBackLink } from '@/shared/ui/GoBackLink';
import { addMonths, format } from 'date-fns';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateJsonLd = (vacancyData: TPublicVacancy) => {
  const dateFromServer = new Date(vacancyData.publication_at || Date.now())
  const dateValidThrough = addMonths(dateFromServer, 3)
  const publicationAt = format(dateFromServer, 'MM/dd/yyyy')
  const validThrough = format(dateValidThrough, 'MM/dd/yyyy')

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "JobPosting",
    "title": vacancyData.name,
    "hiringOrganization": vacancyData.company,
    "jobLocation": {
      "@type": "Place",
      "address": vacancyData.location
    },
    "datePosted": publicationAt,
    "validThrough": validThrough,
    "employmentType": vacancyData.employment ? vacancyEpmpoymentDict[vacancyData.employment] : '',
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "₽",
      "value": vacancyData.salary_from
    },
    "description": vacancyData.description || vacancyData.skills
  }
  return jsonLd
}

const JobsiteVacancyDetails = async ({
  params,
}: {
  params: Promise<{ vacancyKeys: string[] }>;
}) => {
  const { vacancyKeys } = await params;
  //redirect to vacancies list if vacancyKeys is not valid
  if (!vacancyKeys || vacancyKeys.length < 1 || vacancyKeys.length > 2) {
    redirect('/vacancies');
  }

  const [vacancyId, vacancyName] = vacancyKeys;

  const vacancy = await getPubVacancy(vacancyId)
  if (!vacancy) return null;

  //if  vacancyName segment is not provided , redirect to valid url with vacancy name got from API response
  const vacancySlug = encodeSegment(vacancy.name)
  if (!vacancyName || vacancyName !== vacancySlug) {
    redirect(`/vacancy/${vacancyId}/${vacancySlug}`)
  }

  return (
    <div className='py-8'>
      {/* UNCOMMENT WHEN GET DATA FOR REAL VACANCY */}
      {/* JSON-LD google for job markup */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(vacancy)).replace(/</g, '\\u003c'),
        }}
      /> */}
      <div className="rekru-container pb-8">
        <GoBackLink
          className='p-0'
          text='Назад к списку вакансий'
        />
      </div>
      <div className="rekru-container grid gap-8 grid-cols-12">
        <PubVacDetails
          vacancy={vacancy}
          className='col-span-7'
        />
        <CompanyInfoCard
          // company={vacancy.company}
          sourceLink={vacancy.link}
          className='col-span-5 self-start'
        />
      </div>
    </div >
  )
};

export default JobsiteVacancyDetails;
