import { VacancyDetails } from "@/pages-layer/vacancy-details";
import { getVacancy } from "@/shared/api/getData";
import InterceptingModal from "@/shared/ui/modals/InterceptingModal";

const VacancyDetailsModal = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params

  const vacancy = await getVacancy(vacancyId)

  return (
    <InterceptingModal
      dialogTitle="Название вакансии"
      dialogDescription="Подробная информация о вакансии"
    >
      <VacancyDetails vacancy={vacancy} />

    </InterceptingModal>
  );
};

export default VacancyDetailsModal;
