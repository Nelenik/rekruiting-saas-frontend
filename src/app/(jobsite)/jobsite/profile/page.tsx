import { NothingYet } from "@/shared/ui/NothingYet";
import { RekruVacancyFilter } from "@/widgets/rekru-vacancy-filter/ui/RekruVacancyFilter";

export default async function JobsiteProfilePage() {
  return (
    <>
      <section className="pt-2 pb-6 md-lg:py-8">
        <NothingYet />

        <div className="flex justify-center">

          <RekruVacancyFilter />
        </div>
      </section>

    </>
  );
}
