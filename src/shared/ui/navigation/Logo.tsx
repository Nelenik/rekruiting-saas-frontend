import { cn } from "@/shared/lib/utils";
import Link from "next/link";

import Image, { StaticImageData } from "next/image";

type TProps = {
  width: number,
  height: number,
  alt?: string,
  className?: string,
  href?: string,
  image: StaticImageData
}
export const Logo = ({
  width, height, className, href = '/', alt = '', image
}: TProps) => {
  return (
    <Link
      href={href}
      className={cn(
        className
      )}
    >
      <Image
        src={image}
        className={cn(
          'inline-block',
          'w-full'
        )}
        alt={alt}
        width={width}
        height={height}
      />
    </Link>
  );
}