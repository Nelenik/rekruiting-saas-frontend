import InterceptingModal from '@/components/modals/InterceptingModal';
import ReserveInfo from '@/components/pages/reserveInfo/ReserveInfo';

const CvDetailsModal = async ({ params }: { params: Promise<{ cvId: string }> }) => {
  const { cvId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о резюме"
    >
      <ReserveInfo cvId={Number(cvId)} />
    </InterceptingModal>
  );
};

export default CvDetailsModal;
