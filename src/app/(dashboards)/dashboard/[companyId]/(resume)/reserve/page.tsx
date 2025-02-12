import { getResumeList } from "@/actions/getData";
import AddEntityModal from "@/components/modals/AddEntityModal";
import ReserveFilter from "@/components/ReserveFilter";
import ReserveList from "@/components/ReserveList";
import { FC } from "react";

type TProps = {
  searchParams: Promise<{ [key: string]: string }>
}

const ReservePage: FC<TProps> = async ({ searchParams }) => {
  const filters = (await searchParams)
  const resumeList = await getResumeList(filters)
  console.log(resumeList)
  return (
    <div className="flex flex-col gap-10 justify-between  @3xl:flex-row">
      <div className="@3xl:w-[250px] flex flex-col gap-10">
        <AddEntityModal entityType="resume" className="max-w-[250px]" />
        <ReserveFilter />
      </div>
      <ReserveList resumeList={resumeList} />
    </div>
  );
}

export default ReservePage;