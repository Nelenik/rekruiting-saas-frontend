import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";
import LogoFullImg from '@/assets/logo-short.png'
import QrSample from '@/assets/qr-sample.png'
import { Separator } from "@/shared/ui/shadcn/separator";

type TProps = {
  className?: string;
}
export const Footer = ({ className }: TProps) => {
  return (
    <footer className={cn("py-12 bg-sidebar", className)}>
      <div className={cn("rekru-container", "flex gap-8 ")}>
        <div>
          <div className="flex flex-col gap-10">
            <Link href={'/vacancies'}>
              <Image
                src={LogoFullImg}
                alt="Rekru.ru logo"
                width={64}
                height={64}
                className="w-16 self-center"
              />
            </Link>
            <div className="flex flex-col gap-5 ">
              <h3 className="text-lg font-semibold text-sidebar-foreground">Мобильное приложение</h3>
              <Image
                src={QrSample}
                alt="QR code"
                width={160}
                height={160}
                className="w-40 aspect-square"
              />
            </div>
          </div>
        </div>
        <div></div>

      </div>
    </footer>
  );
}