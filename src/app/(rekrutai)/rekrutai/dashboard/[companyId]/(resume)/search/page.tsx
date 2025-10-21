// import { THhRoleGroup } from "@/features/add-hh-matches/api/types";
import { mapHhRolesToCheckboxItems } from "@/features/add-hh-matches/lib/utils";
import { Test } from "@/shared/ui/form-elements/multilevel-checkbox/test";
// import { fetchJson } from "@/shared/api/common/fetchJson";

const SearchPage = async () => {
  // const specialization = await fetchJson<THhRoleGroup[]>('/data/roles.json')
  const specializationPromise = await fetch('https://api.hh.ru/professional_roles', {
    next: {
      revalidate: 3600
    }
  })
  const specialization = await specializationPromise.json()
  const normalizedGroups = mapHhRolesToCheckboxItems(specialization.categories)
  return (
    <div>Search page
      <div>
        <Test items={normalizedGroups} />
      </div>
    </div>
  );
}

export default SearchPage;