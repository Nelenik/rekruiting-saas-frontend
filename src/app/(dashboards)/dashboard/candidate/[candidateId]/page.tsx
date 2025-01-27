import Resume from "@/components/Pages/Resume";


const ResumePage = async ({ params }: { params: Promise<{ resumeId: string }> }) => {
  const { resumeId } = await params;
  console.log('resume id', resumeId);
  return (
    <div>
      <Resume />
    </div>
  );
}

export default ResumePage;