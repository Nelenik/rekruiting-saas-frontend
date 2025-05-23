'use client'
import { cn } from "@/shared/lib/utils";
import { BurgerMenu } from "@/shared/ui/navigation/BurgerMenu";
import { Nav } from "./Nav";
import { UserMenu } from "@/shared/ui/navigation/UserMenu";
import { Logo } from "@/shared/ui/navigation/Logo";
import { UserMenuContent } from "./UserMenuContent";


type TProps = {
  className?: string
}

export const Header = ({
  className
}: TProps) => {
  return (
    <header
      className={cn(
        'py-3 bg-sidebar',
        'md:py-5',
        className
      )}
    >
      <div
        className={cn(
          'jobsite-container',
          'flex justify-between items-center'
        )}
      >

        {/* burger menu is shown from 0 to 768px */}
        <BurgerMenu
          className={cn(
            'md:hidden md:invisible'
          )}
          content={
            ({ closeMenu }) => (
              <Nav
                className={cn(
                  'flex flex-col [&_a]:justify-center [&_a]:w-full'
                )}
                onLinkClick={() => setTimeout(closeMenu, 300)}
              />
            )
          }
        />

        <Logo
          width={44}
          height={44}
          className={cn(
            'w-[39px] aspect-[2/1] shrink-0',
            'md:w-[48px] '
          )}
        />

        {/* show nav on screen from md screen = 768px */}
        <Nav
          className={cn(
            'hidden invisible w-[55%]] grow-0 [&_a]:max-w-[120px]',
            // show on md screen
            'md:flex md:gap-4 md:visible '
          )}
        />

        <UserMenu
          user={{ name: 'Соискатель' }}
          mode="shown"
          className="[&_p]:hidden [&_p]:md-lg:flex"
        >
          <UserMenuContent />
        </UserMenu>
      </div>
    </header >
  );
}