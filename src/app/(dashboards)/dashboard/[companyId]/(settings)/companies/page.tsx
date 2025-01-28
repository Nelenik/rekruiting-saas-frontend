import { getTariffs } from "@/actions/getData";
import { AddCompanyModal } from "@/components/modals/AddCompanyModal";

const CompaniesPage = async () => {
  const tariffs = await getTariffs();
  return (
    <div>Companies page

      <AddCompanyModal tariffs={tariffs} />
    </div>
  );
}

export default CompaniesPage;