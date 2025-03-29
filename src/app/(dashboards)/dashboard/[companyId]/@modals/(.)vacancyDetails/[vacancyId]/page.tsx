import { getVacancy } from '@/actions/getData';
import InterceptingModal from '@/components/modals/InterceptingModal';
import VacancyInfo from '@/components/pages/vacancyInfo/VacancyInfo';

const VacancyDetailsModal = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params

  const vacancy = await getVacancy(vacancyId)

  return (
    <InterceptingModal
      dialogTitle="Название вакансии"
      dialogDescription="Подробная информация о вакансии"
    >
      <VacancyInfo vacancy={vacancy} />

    </InterceptingModal>
  );
};

export default VacancyDetailsModal;
