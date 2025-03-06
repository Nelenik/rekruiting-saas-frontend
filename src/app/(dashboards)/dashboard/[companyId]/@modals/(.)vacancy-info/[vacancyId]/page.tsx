import InterceptingModal from '@/components/modals/InterceptingModal';
import VacancyInfo from '@/components/vacancyInfoPage/VacancyInfo';

const VacancyDetailsModal = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params

  return (
    <InterceptingModal
      dialogTitle="Название вакансии"
      dialogDescription="Подробная информация о вакансии"
    >
      <VacancyInfo vacancyId={Number(vacancyId)} />

    </InterceptingModal>
  );
};

export default VacancyDetailsModal;
