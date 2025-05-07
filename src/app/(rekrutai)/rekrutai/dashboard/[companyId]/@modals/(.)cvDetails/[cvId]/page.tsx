import { CvDetails } from "@/pages-layer/cv-details";
import InterceptingModal from "@/shared/ui/modals/InterceptingModal";

const CvDetailsModal = async ({ params }: { params: Promise<{ cvId: string }> }) => {
  const { cvId } = await params;
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о резюме"
    >
      <CvDetails cvId={Number(cvId)} />
    </InterceptingModal>
  );
};

export default CvDetailsModal;
