'use client'

import Link from "next/link";
import LogoSvg from '@/assets/icons/logo.svg?rc';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import SideBarBtn from "@/components/Buttons/SideBarBtn";
import { cn } from "@/lib/utils";
import useSidebarControl from "@/hooks/useSidebarControl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { IDashboardRoute } from "@/types/types";

interface ISidebarProps {
  routes: IDashboardRoute[],
  className?: string
}

const Sidebar = ({ routes = [], className }: ISidebarProps) => {

  const { sidebarRef, handleToggle, isSidebarOpen } = useSidebarControl({ initial: true })

  //temporar
  const userName = 'Петров Дмитрий'
  const userEmail = 'test@gmail.com'

  return (
    <div ref={sidebarRef}
      className={
        cn(
          "flex flex-col shrink-0 items-center px-4 py-6  bg-sidebar text-sidebar-foreground transition-[width] ease-in-out duration-400 @container",
          isSidebarOpen ? "w-[14rem]" : "w-[85px]",
          className)
      }
    >
      <Link href={'/'} className={cn("mb-3 self-start", isSidebarOpen && 'translate-x-3 transition-transform duration-75')}>
        <LogoSvg width={50} height={50} />
      </Link>
      <SideBarBtn onClick={handleToggle} size={'icon'} className={cn(isSidebarOpen && "self-end", `transition-transform duration-300 mb-8 justify-center `)}>
        {isSidebarOpen ? <PanelRightOpen stroke="white" /> : <PanelLeftOpen stroke="white" />}
        {/* <Menu stroke="white" /> */}
      </SideBarBtn>
      <nav className={cn(
        "mt-6 w-full",

      )}>
        <ul className="space-y-0">
          {routes.map((el) => {
            return (
              <li key={el.routeName}>
                <SideBarBtn asChild className="gap-3 justify-start">
                  <Link className="w-full " href={el.href}>
                    {el.icon}
                    <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{el.routeName}</span>
                  </Link>
                </SideBarBtn>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className={cn("mt-auto flex gap-3 items-center min-h-[46px] self-start translate-x-1", isSidebarOpen && 'translate-x-3 transition-transform duration-75')}>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <div className="hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">
          <p className="scroll-m-20 text-sm font-semibold tracking-tight mb-0.5 max-w-44 text-muted-foreground">
            {userName}
          </p>
          <a href={`mailto:${userEmail}`} className="text-sm text-muted-foreground">{userEmail}</a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;