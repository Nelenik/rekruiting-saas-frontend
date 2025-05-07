'use client'

import Link from "next/link";
import LogoImg from '@/assets/logo-short.png';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { createSidebarConfig } from "@/shared/config/rekrutaiSidebarConfig";
import { useParams } from "next/navigation";
import useSidebarControl from "@/shared/model/hooks/useSidebarControl";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { SidebarItem } from "./SidebarItem";
import { UserMenuContent } from "./UserMenuContent";
import { useSession } from "@/features/auth";
import { UserMenu } from "@/shared/ui/navigation/UserMenu";
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn";

interface ISidebarProps {
  className?: string
}

export const Sidebar = ({ className }: ISidebarProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';

  const sidebarConfig = createSidebarConfig(companyId)

  const { sidebarRef, handleToggle, isSidebarOpen } = useSidebarControl({ initial: true })

  //get user info for the user menu component
  const { user } = useSession()

  return (
    <div ref={sidebarRef}
      className={
        cn(
          "flex flex-col shrink-0 items-center px-4 py-6  bg-sidebar text-sidebar-foreground transition-[width] ease-in-out duration-400 @container",
          isSidebarOpen ? "w-[14rem]" : "w-[85px]",
          className)
      }
    >
      <Link
        href={'/'}
        className={cn(
          "mb-3 self-start",
          isSidebarOpen && 'translate-x-3 transition-transform duration-75'
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
        onClick={handleToggle}
        size={'icon'}
        className={cn(
          isSidebarOpen && "self-end",
          `transition-transform duration-300 mb-8 justify-center `
        )}>
        {
          isSidebarOpen
            ? <PanelRightOpen stroke="white" />
            : <PanelLeftOpen stroke="white" />
        }
      </NavPanelBtn>
      <nav className={cn(
        "mt-6 w-full",

      )}>
        <ul className="space-y-0">
          {sidebarConfig.map((el) => {
            return (
              <li key={el.routeName}>
                <SidebarItem linkConfig={el} />
              </li>
            )
          })}
        </ul>
      </nav>
      <div
        className={cn(
          "mt-auto flex gap-3 items-start min-h-[46px] self-start translate-x-1",
          isSidebarOpen && 'translate-x-3 transition-transform duration-75'
        )}
      >

        <UserMenu user={user} mode={isSidebarOpen ? 'shown' : 'hidden'}>
          <UserMenuContent user={user} />
        </UserMenu>

      </div>
    </div>
  );
}
