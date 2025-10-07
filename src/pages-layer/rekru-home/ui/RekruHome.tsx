import { cn } from "@/shared/lib/utils";
import { Hero } from "./Hero";
import { MobileMenu } from "@/widgets/rekru-nav";
import { SearchBar } from "@/features/search-bar/ui/SearchBar";

type TProps = {

}
export const RekruHome = ({ }: TProps) => {
  return (
    <>
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[10]",
        ' md-lg:hidden md-lg:invisible'
      )}>
        <div className="rekru-container flex items-center justify-end gap-20 ">
          <MobileMenu />
        </div>
      </section>
      <Hero />
      <section className="py-10">
        <div className="rekru-container p-10">
          <SearchBar />
        </div>
      </section>
    </>
  );
}