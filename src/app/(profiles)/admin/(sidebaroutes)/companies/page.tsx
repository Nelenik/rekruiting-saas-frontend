import Link from "next/link";

const CompaniesPage = () => {
  return (
    <div>
      this is companies Page
      <br />
      <Link href={{ pathname: '/admin/company', query: { companyId: '123' } }}>link to company</Link>
    </div>
  );
}

export default CompaniesPage;