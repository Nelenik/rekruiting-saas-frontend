'use client';
import { createRekrutaiNavConfig } from "@/shared/config/rekrutaiNavConfig";
import { useParams } from "next/navigation";
import { cn } from '@/shared/lib/utils';
import { SidebarItem } from './SidebarItem';
import { SignOutForm, useSession } from '@/features/auth';
import { BurgerMenu } from '@/shared/ui/navigation/BurgerMenu';
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area';
import { UserAvatar } from '@/shared/ui/navigation/UserAvatar';
import { Separator } from '@/shared/ui/shadcn/separator';
import { Logo } from '@/shared/ui/navigation/Logo';
import LogoImg from '@/assets/logo-short.png';

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';
  const sidebarConfig = createRekrutaiNavConfig(companyId)

  const { user } = useSession()

  return (
    <header
      className={cn(
        'flex justify-between items-center px-6 py-1 bg-sidebar text-sidebar-foreground fixed top-0 left-0 w-full z-[50] shadow-sm',
        className
      )}
    >
      <BurgerMenu
        className='ring-1 ring-sidebar-foreground'
        content={
          ({ closeMenu }) => {
            return (
              <ScrollArea className="h-dvh" type="auto">
                <nav className='w-[97%]'>
                  <section
                    className={cn(
                      "flex items-start gap-3 w-full px-2 py-3 mb-6"
                    )}
                  >
                    <UserAvatar
                      userName={user.email}
                      profileImage={user.profile_image}
                    />
                    <p className={cn('flex flex-col gap-0.5', "scroll-m-20 text-md font-semibold tracking-tight max-w-44 text-sidebar-foreground")}>
                      {user.name}
                      <a
                        href={`mailto:${user.email}`}
                        className={cn(
                          "text-sm text-sidebar-foreground",
                          "hover:underline hover:underline-offset-2"
                        )}
                      >
                        {user.email}
                      </a>
                    </p>
                  </section>
                  <Separator className="self-center mb-1 h-[0.3px] bg-sidebar-foreground" />

                  {/* Sidebar links */}
                  <ul className="mb-8 space-y-0 text-sidebar-foreground">
                    {sidebarConfig.map((el) => {
                      return (
                        <li key={el.routeName}>
                          <SidebarItem linkConfig={el} onLinkClick={() => {
                            //setTimeout is used to prevent a flash caused by the old menu state being briefly visible during navigation.
                            setTimeout(closeMenu, 300)
                          }} />
                        </li>
                      );
                    })}
                  </ul>

                  <Separator className="self-center mb-1 h-[0.3px] bg-sidebar-foreground" />
                  <Separator className="self-center mb-1 h-[0.3px] bg-sidebar-foreground" />
                  <SignOutForm
                    variant={'ghost'}
                    className={cn(
                      "w-full text-sidebar-foreground justify-start",
                      "hover:bg-accent/10 hover:text-sidebar-foreground",
                    )}
                  />
                </nav>
              </ScrollArea>
            )
          }
        }
      />
      <Logo
        width={44}
        height={44}
        alt="RekrutAi logo"
        href="/"
        image={LogoImg}
        className={cn(
          'm-auto shrink-0 ',

        )}
      />
    </header>
  );
};



