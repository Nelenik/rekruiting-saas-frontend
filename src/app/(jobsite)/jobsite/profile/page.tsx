import { AutocompleteField } from "@/shared/ui/form-elements/autocomplete-field/AutocompleteField";
import { NothingYet } from "@/shared/ui/NothingYet";

export default async function JobsiteProfilePage() {
  return (
    <>
      <section className="pt-2 pb-6 md-lg:py-8">
        <NothingYet />

        <div className="w-2/3 mx-auto">

          <AutocompleteField
            suggestionList={['apple', 'applauds', 'banana', 'carrot']}
            placeholder="suggests"
          />
        </div>
      </section>

    </>
  );
}
