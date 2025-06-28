import { PubVacDetails } from '@/pages-layer/pub-vac-details';

const JobsiteVacancyDetails = async ({
  params,
}: {
  params: Promise<{ vacancyId: string }>;
}) => {
  const { vacancyId } = await params;

  console.log({ vacancyId });

  const vacancy = null;

  if (!vacancy) return null;
  return <PubVacDetails vacancy={vacancy} />;
};

export default JobsiteVacancyDetails;
