import { CvDetails } from "@/pages-layer/cv-details";
import { getResumeById } from "@/shared/api/actions";
import InterceptingModal from "@/shared/ui/modals/InterceptingModal";

const CvDetailsModal = async ({ params }: { params: Promise<{ cvKeys: string[] }> }) => {
  const { cvKeys } = await params;
  const cv = await getResumeById(cvKeys[0]);
  return (
    <InterceptingModal
      dialogTitle="Резюме"
      dialogDescription="Подробная информация о резюме"
    >
      <CvDetails cv={cv} />
    </InterceptingModal>
  );
};

export default CvDetailsModal;
