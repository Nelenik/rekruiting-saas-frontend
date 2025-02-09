'use client'
import VacancyBoardCard from '@/components/cards/VacancyBoardCard';
import { useVacancies, VacanciesProvider } from '@/providers/VacanciesProvider';



const VacanciesPage = () => {
  const vacancies = useVacancies()
  return (
    <div className="flex flex-col items-center justify-center h-full">
      Vacancies board
      <ul className='w-full grid grid-cols-3 gap-4'>
        {vacancies.map(vacancy => (
          <li key={vacancy.id}>
            <VacancyBoardCard id={vacancy.id} name={vacancy.name} location={vacancy.location} salary_from={vacancy.salary_from} salary_to={vacancy.salary_to} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VacanciesPage;