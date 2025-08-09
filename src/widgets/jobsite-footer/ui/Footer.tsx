import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";
import LogoFullImg from '@/assets/rekru-logo-full.svg'
import { Separator } from "@/shared/ui/shadcn/separator";

type TProps = {
  className?: string;
}
export const Footer = ({ className }: TProps) => {
  return (
    <footer className={cn("py-6 shadow-[0px_-1px_8px_0px_rgba(0,_0,_0,_0.1)] shadow-sidebar-foreground/50", className)}>
      <div className={cn("jobsite-container", "flex gap-14 ")}>
        <Image
          src={LogoFullImg}
          alt="Rekru.ru logo"
          width={198}
          height={177}
          className="w-20 self-center"
        />

        <Separator
          orientation="vertical"
          className="shadow-[5px_0px_5px_-3px_rgba(0,_0,_0,_0.1)] shadow-sidebar-foreground/50 h-auto"
        />

        <ul className="flex flex-col gap-1 self-center text-sidebar-foreground ">
          <li>
            <Link href={"/pages/About"}>
              О нас
            </Link>

          </li>
          <li>
            <Link href={"/pages/Contacts"}>
              Контакты
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}