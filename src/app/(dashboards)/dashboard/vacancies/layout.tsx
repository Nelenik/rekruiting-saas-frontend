import { getBasicVacancies } from "@/actions/getData";
import VacanciesAside from "@/components/Asides/VacanciesAside";


const VacanciesLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const vacancies = await getBasicVacancies()
  console.log(vacancies)
  return (
    <div className="flex gap-5 flex-col w-full lg:flex-row">
      <VacanciesAside />
      <div className="w-full lg:w-[calc(100%-240px-20px)]">
        {children}
      </div>
    </div>
  );
}

export default VacanciesLayout;