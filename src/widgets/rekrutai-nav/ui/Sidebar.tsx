'use client'

import Link from "next/link";
import LogoImg from '@/assets/logo-short.png';
import { LogOut, PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { createRekrutaiNavConfig } from "@/shared/config/rekrutaiNavConfig";
import { useParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { SidebarItem } from "./SidebarItem";
// import { UserMenuContent } from "./UserMenuContent";
import { SignOutForm, useSession } from "@/features/auth";
// import { UserMenu } from "@/shared/ui/navigation/UserMenu";
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn";
import { CollapsibleSidebar } from "@/shared/ui/navigation/CollapsibleSidebar";
import { Separator } from "@/shared/ui/shadcn/separator";
import { UserAvatar } from "@/entities/profile";
import { ScrollArea, ScrollBar } from "@/shared/ui/shadcn/scroll-area";

interface ISidebarProps {
  className?: string
}

export const Sidebar = ({ className }: ISidebarProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';

  const sidebarConfig = createRekrutaiNavConfig(companyId)

  //get user info for the user menu component
  const { user } = useSession()
  return (
    <CollapsibleSidebar
      className={cn(
        'flex flex-col shrink-0  px-3 pt-6 pb-4 bg-sidebar text-sidebar-foreground sidebar-rekrutai',
        className
      )}
      render={({ isSidebarOpen, toggle }) => (
        <>
          <Link
            href={'/'}
            className={cn(
              "mb-3 self-start inline-block h-[62px]",
            )}
          >
            <Image
              src={LogoImg}
              alt="RekrutAi logo"
              width={50}
              height={50}
              priority
              className="w-auto"
            />
          </Link>
          <NavPanelBtn
            onClick={toggle}
            size={'icon'}
            className={cn(
              `transition-transform duration-300 mb-8 shrink-0 self-center `,
              isSidebarOpen && "self-end",
            )}>
            {
              isSidebarOpen
                ? <PanelRightOpen stroke="white" />
                : <PanelLeftOpen stroke="white" />
            }
          </NavPanelBtn>
          <ScrollArea className="min-w-[unset] " type="auto">

            <nav className={cn(
              "w-full ",

            )}>
              <ul className="space-y-0">
                {sidebarConfig.map((el) => {
                  return (
                    <li key={el.routeName}>
                      <SidebarItem isSidebarOpen={isSidebarOpen} linkConfig={el} />
                    </li>
                  )
                })}
              </ul>
            </nav>
            <ScrollBar className="w-[2px]" />
          </ScrollArea>
          {/* User section */}

          <section
            className={cn(
              "flex items-start gap-3 w-full px-2 pb-3 pt-8 mt-auto"
            )}
          >
            <UserAvatar
              userName={user.email}
              profileImage={user.profile_image}
              className="w-[35px] h-[35px] md:w-[44px] md:h-[44px]"
            />
            {isSidebarOpen && <p className={cn('flex flex-col gap-0.5', "scroll-m-20 text-md font-semibold tracking-tight max-w-44 text-sidebar-foreground")}>
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
            </p>}
          </section>
          <Separator className="self-center mb-0.5 h-[0.3px] bg-sidebar-foreground" />
          <Separator className="self-center mb-0.5 h-[0.3px] bg-sidebar-foreground" />

          <SignOutForm
            variant={'ghost'}
            className={cn(
              "w-full text-sidebar-foreground justify-start",
              "hover:bg-accent/10 hover:text-sidebar-foreground",
            )}
          >
            <LogOut />
            {isSidebarOpen && 'Выйти'}
          </SignOutForm>

        </>
      )}

    />
  )
}

