'use client'
import { TNavConfig } from "@/shared/config/types";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navListVariants = cva(
  'w-max inline-block font-semibold text-center',
  {
    variants: {
      theme: {
        light: 'text-secondary-foreground border-b-2 border-transparent hover:text-primary hover:border-primary',
        dark: 'group/icon inline-block text-sm underline underline-offset-4 decoration-transparent decoration-2 transition-all hover:decoration-white hover:scale-105',
      },
      active: {
        false: null,
        true: '',
      }
    },
    compoundVariants: [
      {
        theme: 'light',
        active: true,
        class: 'text-primary border-primary'
      },
      {
        theme: 'dark',
        active: true,
        class: 'decoration-white scale-110'
      }
    ]
  }
)

type TProps = {
  routes: TNavConfig[]
  className?: string;
  onLinkClick?: () => void
  theme?: 'light' | 'dark'
  navLinkClassName?: string
}


export const NavList = ({
  routes,
  className,
  onLinkClick = () => { },
  theme,
  navLinkClassName
}: TProps) => {
  const pathname = usePathname()
  return (
    <ul
      className={cn(
        className
      )}
    >
      {routes.map(route => {
        const isActive = pathname === route.href
        return (
          <li key={route.routeName}>
            <Link
              className={cn(
                navListVariants({ theme, active: isActive }),
                navLinkClassName
              )
              }
              href={route.href}
              onClick={onLinkClick}
            >
              {route.icon && route.icon}
              {route.routeName}
            </Link>
          </li>)
      }
      )}
    </ul>
  );
}