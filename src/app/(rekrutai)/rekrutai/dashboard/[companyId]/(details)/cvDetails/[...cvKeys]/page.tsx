import { CvDetails } from "@/pages-layer/cv-details";
import { getResumeById } from "@/shared/api/actions";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { GoBackLink } from "@/shared/ui/GoBackLink";
import { redirect } from "next/navigation";

const CvDetailsPage = async ({ params }: { params: Promise<{ cvKeys: string[], companyId: string }> }) => {
  const { cvKeys, companyId } = await params;
  const [cvId, cvName] = cvKeys;
  const cv = await getResumeById(cvId)
  if (!cv) return null;

  const cvSlug = encodeSegment(cv.name)
  if (!cvName || cvName !== cvSlug) {
    redirect(`/dashboard/${companyId}/cvDetails/${cvId}/${cvSlug}`)
  }
  return (
    <div>
      <GoBackLink
        text="Перейти к списку резюме"
      />
      <CvDetails cv={cv} />
    </div>
  );
}

export default CvDetailsPage;