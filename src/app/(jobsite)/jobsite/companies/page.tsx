import { cn } from "@/shared/lib/utils";
import { GoBackLink } from "@/shared/ui/navigation/GoBackLink";
import { NothingYet } from "@/shared/ui/NothingYet";
import { MobileMenu } from "@/widgets/rekru-nav";

export default async function JobsiteStartupsPage() {
  return (
    <>
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[100]",
        ' md-lg:hidden md-lg:invisible'
      )}>
        <div className="rekru-container flex items-center justify-between gap-20 ">
          <GoBackLink
            className='p-0'
            text='Назад'
          />
          <MobileMenu />
        </div>
      </section>
      <section className="pt-2 pb-6 md-lg:py-8">
        <NothingYet />
      </section>

    </>

  );
}
