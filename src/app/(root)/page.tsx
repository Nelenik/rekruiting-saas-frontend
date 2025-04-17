import Image from "next/image";
import logoImg from '@/assets/logo.webp';
import Link from "next/link";
import { StartPageButton } from "@/shared/ui/buttons/StartPageButtons";
import { cn } from "@/shared/lib/utils";
import { AuthTabs } from "@/pages-layer/start-page";
import { Features } from "@/pages-layer/start-page";



export default function Home() {
  return (
    <>
      <header className="absolute top-0 left-0 w-full">
        <div className="max-w-[1200px] px-6 mx-auto flex items-center justify-between py-3 sm:py-6 gap-12">

          <Image
            src={logoImg}
            alt="RekrutAi logo"
            className="w-40"
          />
          <StartPageButton asChild>
            <Link href={'/dashboard'} >
              Dashboard
            </Link>
          </StartPageButton>
        </div>
      </header>
      <main className="h-dvh flex flex-col md-lg:flex-row">
        <div className={cn(
          " pt-28 pb-20 flex",
          "md-lg:w-[50%] md-lg:pt-40 md-lg:pb-0"
        )}>
          <div className={cn(
            "w-full flex justify-center",
            "md-lg:max-w-[600px] px-6 md-lg:ml-auto "
          )}>
            <AuthTabs />
          </div>
        </div>
        <div className={cn(
          "bg-hero bg-center bg-cover pt-20 pb-20 flex text-stone-50",
          "md-lg:w-[50%] md-lg:pt-40 md-lg:pb-0"
        )}>
          <div className={cn(
            "w-full flex justify-center",
            "md-lg:max-w-[600px] px-6 md-lg:mr-auto"
          )}>
            <Features />
          </div>
        </div>

      </main>
    </>
  );
}
