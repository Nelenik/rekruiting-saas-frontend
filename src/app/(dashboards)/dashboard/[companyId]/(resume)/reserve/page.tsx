import AddEntityModal from "@/components/modals/AddEntityModal";
import ReserveFilter from "@/components/filters/ReserveFilter";
import ReserveList from "@/components/pages/reserve/elmts/ReserveList";
import { FC } from "react";

type TProps = {
  searchParams: Promise<{ [key: string]: string }>
}

const ReservePage: FC<TProps> = async () => {

  return (
    <div className="flex flex-col gap-10 justify-between  @3xl:flex-row">
      <div className="@3xl:w-[250px] shrink-0 flex flex-col gap-10">
        <AddEntityModal entityType="resume" className="max-w-[250px]" />
        <ReserveFilter />
      </div>
      <ReserveList />
    </div>
  );
}

export default ReservePage;