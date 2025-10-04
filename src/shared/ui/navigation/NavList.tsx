'use client'
import { TNavConfig } from "@/shared/config/types";
import { cn } from "@/shared/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navListVariants = cva(
  'w-max inline-block font-base text-center group/icon underline underline-offset-8 decoration-transparent decoration-2 transition-all',
  {
    variants: {
      theme: {
        light: 'text-accent2  hover:font-medium hover:decoration-accent2',
        dark: 'text-sidebar-foreground hover:decoration-white',
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
        class: 'font-medium decoration-accent2'
      },
      {
        theme: 'dark',
        active: true,
        class: 'decoration-white'
      }
    ]
  }
)

type TProps = {
  routes: TNavConfig[]
  className?: string;
  onLinkClick?: () => void
  theme?: 'light' | 'dark'
  navLinkStyles?: string
}


export const NavList = ({
  routes,
  className,
  onLinkClick = () => { },
  theme,
  navLinkStyles
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
                navLinkStyles
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