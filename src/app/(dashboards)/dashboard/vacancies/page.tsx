import DataProcessingVector from '@/assets/data-processing.svg?rc'

// Next.js will invalidate the cache when a
// request comes in, at most once every 30 seconds.
export const revalidate = 30

const VacanciesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-xl text-center font-semibold leading-8 w-[min(100%,400px)]">Чтобы просмотреть подробности о вакансии, пожалуйста выберите вакансию из списка
      </p>
      <DataProcessingVector />
    </div>
  );
}

export default VacanciesPage;