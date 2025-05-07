import { PubVacDetails } from "@/pages-layer/pub-vac-details";
import { publicVacancies } from "@/shared/api/mockData";

const JobsiteVacancyDetails = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;

  const vacancy = publicVacancies.find(vacancy => String(vacancy.id) === vacancyId)

  if (!vacancy) return null
  return (
    <PubVacDetails vacancy={vacancy} />
  );
}

export default JobsiteVacancyDetails