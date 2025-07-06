import { CvDetails } from "@/pages-layer/cv-details";
import { getResumeById } from "@/shared/api/actions";
import { redirect } from "next/navigation";

const CvDetailsPage = async ({ params }: { params: Promise<{ cvKeys: string[], companyId: string }> }) => {
  const { cvKeys, companyId } = await params;
  const [cvId, cvName] = cvKeys;
  const cv = await getResumeById(cvId)
  if (!cv) return null;

  const cvSlug = encodeURIComponent(cv.name)
  if (!cvName || cvName !== cvSlug) {
    redirect(`/dashboard/${companyId}/matchDetails/${cvId}/${cvSlug}`)
  }
  return (
    <div>
      <CvDetails cv={cv} />
    </div>
  );
}

export default CvDetailsPage;