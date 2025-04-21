'use client'

import Link from "next/link";
import LogoImg from '@/assets/logo-short.png';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { TUser } from "@/shared/api/types/user";
import { createSidebarConfig } from "@/shared/config/sidebarConfig";
import { useParams } from "next/navigation";
import { SidebarGroup, SidebarItem } from "./SidebarItems";
import useSidebarControl from "@/shared/model/hooks/useSidebarControl";
import SideBarBtn from "@/shared/ui/buttons/SideBarBtn";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import Image from "next/image";
import { SignOutForm } from "@/features/auth";

interface ISidebarProps {
  userData: TUser
  className?: string
}

export const Sidebar = ({ userData, className }: ISidebarProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';
  const sidebarConfig = createSidebarConfig(companyId)

  const { sidebarRef, handleToggle, isSidebarOpen } = useSidebarControl({ initial: true })

  const { name: userName, email: userEmail } = userData

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
      <SideBarBtn
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
      </SideBarBtn>
      <nav className={cn(
        "mt-6 w-full",

      )}>
        <ul className="space-y-0">
          {sidebarConfig.map((el) => {
            return (
              <li key={el.routeName}>
                {el.subMenu ?
                  <SidebarGroup linkConfig={el} />
                  : <SidebarItem linkConfig={el} />}
              </li>
            )
          })}
        </ul>
      </nav>
      <div
        className={cn(
          "mt-auto flex gap-3 items-center min-h-[46px] self-start translate-x-1",
          isSidebarOpen && 'translate-x-3 transition-transform duration-75'
        )}
      >

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <div className="hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">
          <p className="scroll-m-20 text-sm font-semibold tracking-tight mb-0.5 max-w-44 text-muted-foreground">
            {userName}
          </p>
          <a
            href={`mailto:${userEmail}`}
            className="text-sm text-muted-foreground"
          >
            {userEmail}
          </a>
          <SignOutForm
            variant={'link'}
            className="text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
