import { PubVacDetails } from '@/pages-layer/pub-vac-details';
import { getPubVacancy } from '@/shared/api/actions/public-vacancy';
import { GoBackLink } from '@/shared/ui/GoBackLink';
import { redirect } from 'next/navigation';

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
  const vacancySlug = encodeURIComponent(vacancy.name)
  if (!vacancyName || vacancyName !== vacancySlug) {
    redirect(`/vacancy/${vacancyId}/${vacancySlug}`)
  }

  return (
    <div>
      <GoBackLink
        text='Назад к вакансиям'
      />
      <PubVacDetails vacancy={vacancy} />;
    </div>
  )
};

export default JobsiteVacancyDetails;
