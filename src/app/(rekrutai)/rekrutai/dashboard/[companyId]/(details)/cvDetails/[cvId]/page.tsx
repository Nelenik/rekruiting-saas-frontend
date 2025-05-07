import { CvDetails } from "@/pages-layer/cv-details";

const CvDetailsPage = async ({ params }: { params: Promise<{ cvId: string }> }) => {
  const { cvId } = await params;
  return (
    <div>
      <CvDetails cvId={Number(cvId)} />
    </div>
  );
}

export default CvDetailsPage;