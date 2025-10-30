import { NothingYet } from "@/shared/ui/NothingYet";
import { FilterBasePopover } from "@/widgets/rekru-vacancy-filter/ui/FilterBasePopover";

export default async function JobsiteProfilePage() {
  return (
    <>
      <section className="pt-2 pb-6 md-lg:py-8">
        <NothingYet />

        <div className="flex justify-center">

          <FilterBasePopover
            triggerText="Open"
          />
        </div>
      </section>

    </>
  );
}
