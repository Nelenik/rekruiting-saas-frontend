import { VacancyDetails } from "@/pages-layer/vacancy-details";
import { getVacancy } from "@/shared/api/actions";
import { redirect } from "next/navigation";
import { GoBackLink } from "@/shared/ui/GoBackLink";
import { encodeSegment } from "@/shared/lib/encodeSegments";

const VacancyDetailsPage = async ({ params }: { params: Promise<{ vacancyKeys: string[], companyId: string }> }) => {
  const { vacancyKeys, companyId } = await params;

  const [vacancyId, vacancyName] = vacancyKeys;
  const vacancy = await getVacancy(vacancyId);

  if (!vacancy) return null;

  //if  vacancyName segment is not provided or it differs from vacancy.name, redirect to valid url with vacancy name got from API response
  const vacancySlug = encodeSegment(vacancy.name)
  if (!vacancyName || vacancyName !== vacancySlug) {
    redirect(`/dashboard/${companyId}/vacancyDetails/${vacancyId}/${vacancySlug}`)
  }


  return (
    <div>
      <GoBackLink
        text='Назад к мэтчам'
      />
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}

export default VacancyDetailsPage;