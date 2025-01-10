import Resume from "@/components/Pages/Resume";

const ResumePage = ({ params }: { params: { [key: string]: string } }) => {
  console.log(params);
  return (
    <div>
      <Resume />
    </div>
  );
}

export default ResumePage;