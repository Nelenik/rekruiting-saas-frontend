'use client'
import { cn } from "@/shared/lib/utils";
import { UserMenu } from "@/shared/ui/navigation/UserMenu";
// import { Logo } from "@/shared/ui/navigation/Logo";
import { UserMenuContent } from "./UserMenuContent";
import { MobileMenu } from "./MobileMenu";
import { useNavConfig } from "../model/NavigationConfigProvider";
import { NavList } from "./NavList";
import { Logo } from "@/shared/ui/navigation/Logo";


type TProps = {
  className?: string
}
/**
 * 
 * Header component for the job site navigation.
 * It includes a logo, navigation links, and a user menu.
 * @param param0 
 * @returns 
 */
export const Header = ({
  className
}: TProps) => {
  const { publicRoutes } = useNavConfig()

  return (

    <header
      className={cn(
        'py-3 bg-sidebar ',
        'md:py-5',
        className
      )}
    >
      <div
        className={cn(
          'jobsite-container relative',
          'flex justify-between items-center'
        )}
      >

        {/* mobile menu is shown under 768px */}
        <MobileMenu
          className="md:hidden md:invisible"
        />

        <Logo
          width={44}
          height={44}
          href="/vacancies"
          className={cn(
            'w-[39px] aspect-[2/1] shrink-0',
            'md:w-[48px] mr:auto'
          )}
        />

        {/* show nav on screen from md screen = 768px */}
        <nav
          className={cn(
            'hidden invisible w-[55%] grow-0 ',
            // show on md screen
            'md:flex md:visible '
          )}>
          <NavList
            routes={publicRoutes}
            className={cn(
              'flex gap-4 items-center w-full justify-center',
              'text-sidebar-foreground',
              '[&_a]:max-w-[120px]'
            )}
          />
        </nav>

        {/* user menu is shown from 768px and up */}
        <UserMenu
          user={{ name: 'Соискатель' }}
          mode="shown"
          className={cn(
            "hidden invisible",
            "md:visible md:flex",
            "[&_p]:hidden [&_p]:md-lg:flex"
          )}
        >
          <UserMenuContent />
        </UserMenu>
      </div>
    </header >
  );
}