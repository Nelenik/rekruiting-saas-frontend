import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import LogoImg from '@/assets/logo-short.png';
import Image from "next/image";

type TProps = {
  width: number,
  height: number,
  className?: string
}
export const Logo = ({
  width, height, className
}: TProps) => {
  return (
    <Link
      href={'/'}
      className={cn(
        className
      )}
    >
      <Image
        src={LogoImg}
        className={cn(
          'inline-block',
          'w-full'
        )}
        alt="RekrutAi logo"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}