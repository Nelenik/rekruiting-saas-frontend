import { getBasicVacancies } from "@/actions/getData";
import VacanciesAside from "@/components/NavBlocks/VacanciesAside";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REkrutAI|Вакансии",
};


const VacanciesLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const vacancies = await getBasicVacancies()
  return (
    <div className="flex gap-10 flex-col w-full lg:gap-5 lg:flex-row">
      <VacanciesAside basicVacancies={vacancies} />
      <div className=" h-px bg-gray-400 w-2/3 self-center lg:hidden"></div>
      <div className="w-full lg:w-[calc(100%-240px-20px)]">
        {children}
      </div>
    </div>
  );
}

export default VacanciesLayout;