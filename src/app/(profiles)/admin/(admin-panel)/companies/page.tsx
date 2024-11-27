import Link from "next/link";

const CompaniesPage = () => {
  return (
    <div>
      На этой странице список компаний-клиентов
      <br />
      <br />
      <Link href={{ pathname: '/admin/company', query: { companyId: '123' } }} className="text-green-600 text-xl">Тестовая ссылка на компанию</Link>
    </div>
  );
}

export default CompaniesPage;