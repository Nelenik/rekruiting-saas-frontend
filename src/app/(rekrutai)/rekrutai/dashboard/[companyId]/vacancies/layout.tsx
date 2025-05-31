import { VacanciesProvider } from "@/entities/vacancy";
import { getVacanciesList } from "@/shared/api/actions";
import { FC, PropsWithChildren } from "react";


// Next.js will invalidate the cache when a
// request comes in, at most once every 30 seconds.
export const revalidate = 30

interface IVacancyiesLayoutProp extends PropsWithChildren {
  params: Promise<{ companyId: string }>
}

const VacanciesLayout: FC<IVacancyiesLayoutProp> = async ({ children, params }) => {
  const { companyId } = await params
  const vacancies = await getVacanciesList({ companyId });

  return (
    <VacanciesProvider vacancies={vacancies}>
      {children}
    </VacanciesProvider>
  );
}

export default VacanciesLayout;