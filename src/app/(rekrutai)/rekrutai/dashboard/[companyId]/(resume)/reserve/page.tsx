import { AddEntity } from "@/features/mutate-entity";
import { CvList } from "@/widgets/cv-list";
import { ReserveFilter } from "@/widgets/filter-reserve";
import { FC } from "react";

type TProps = {
  searchParams: Promise<{ [key: string]: string }>
}

const ReservePage: FC<TProps> = async () => {

  return (
    <div className="flex flex-col gap-10 justify-between  @3xl:flex-row">
      <div className="@3xl:w-[250px] shrink-0 flex flex-col gap-10">
        <AddEntity entityType="cv" className="max-w-[250px]" />
        <ReserveFilter />
      </div>
      <CvList />
    </div>
  );
}

export default ReservePage;