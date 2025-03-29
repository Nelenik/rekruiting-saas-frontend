import ReserveInfo from "@/components/pages/reserveInfo/ReserveInfo";

const CvDetailsPage = async ({ params }: { params: Promise<{ cvId: string }> }) => {
  const { cvId } = await params;
  return (
    <div>
      <ReserveInfo cvId={Number(cvId)} />
    </div>
  );
}

export default CvDetailsPage;