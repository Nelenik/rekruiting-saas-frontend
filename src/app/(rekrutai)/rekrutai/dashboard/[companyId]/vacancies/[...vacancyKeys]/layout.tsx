import { VacanciesAside } from "@/widgets/vacancies-aside";
import { FC, PropsWithChildren } from "react";

const VacancyMatchLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex gap-10 flex-col w-full lg:gap-5 lg:flex-row">
      <VacanciesAside />
      <div className=" h-px bg-gray-400 w-2/3 self-center lg:hidden" />

      <div className="w-full lg:w-[calc(100%-240px-20px)]">{children}</div>
    </div>
  );
}

export default VacancyMatchLayout;