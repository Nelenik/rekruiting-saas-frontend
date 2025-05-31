import Link from "next/link";
import { Link as LinkIcon } from 'lucide-react'
import { VacancyDetails } from "@/pages-layer/vacancy-details";
import { getVacancy } from "@/shared/api/actions";

const VacancyDetailsPage = async ({ params }: { params: Promise<{ vacancyId: string, companyId: string }> }) => {
  const { vacancyId, companyId } = await params;

  const vacancy = await getVacancy(vacancyId)

  return (
    <div>
      <Link
        href={`/dashboard/${companyId}/vacancies/${vacancyId}?name=${vacancy.name}`}

        className="flex items-center mb-6 font-medium text-sm text-primary/80 underline underline-offset-2 decoration-transparent hover:decoration-current transition-colors duration-300"
      >
        Перейти к мэтчу
        <LinkIcon className="h-[1cap]" />
      </Link>
      <VacancyDetails vacancy={vacancy} />
    </div>
  );
}

export default VacancyDetailsPage;