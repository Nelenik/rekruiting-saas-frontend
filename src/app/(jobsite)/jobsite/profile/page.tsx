import { GoBackLink } from "@/shared/ui/GoBackLink";
import { NothingYet } from "@/shared/ui/NothingYet";
import { MobileMenu } from "@/widgets/rekru-nav";

export default async function JobsiteProfilePage() {
  return (
    <>
      <div className="rekru-container pb-8 flex items-center justify-between gap-20 md-lg:hidden md-lg:invisible">
        <GoBackLink
          className='p-0'
          text='Назад'
        />
        <MobileMenu />
      </div>
      <NothingYet />
    </>
  );
}
