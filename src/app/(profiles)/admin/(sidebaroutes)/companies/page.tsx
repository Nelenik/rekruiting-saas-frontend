import Link from "next/link";

const CompaniesPage = () => {
  return (
    <div>
      this is companies Page
      <br />
      <Link href={'/admin/company/vacancies'}>link to company</Link>
    </div>
  );
}

export default CompaniesPage;