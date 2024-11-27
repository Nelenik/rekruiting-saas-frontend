'use client'

import Link from "next/link";
import LogoSvg from '@/assets/icons/logo.svg?rc';
import { Menu } from 'lucide-react'
import SideBarBtn from "@/components/Buttons/SideBarBtn";
import { cn } from "@/lib/utils";
import useSidebarControl from "@/hooks/useSidebarControl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

export interface SidebarRoutes {
  routeName: string,
  href: string,
  icon: ReactNode
}

interface ISidebarProps {
  routes: SidebarRoutes[]
}

const Sidebar = ({ routes = [] }: ISidebarProps) => {
  const { sidebarRef, handleOpen, isSidebarOpen, showText } = useSidebarControl()
  const searchParams = useSearchParams()

  //temporar
  const userName = 'Петров Дмитрий'
  const userEmail = 'test@gmail.com'

  return (
    <div ref={sidebarRef} className={cn("flex flex-col items-center px-4 py-6  bg-sidebar text-sidebar-foreground")}>
      <Link href={'/'} className={cn("mb-3 self-start", isSidebarOpen && 'translate-x-3 transition-transform duration-75')}>
        <LogoSvg width={50} height={50} />
      </Link>
      <SideBarBtn onClick={handleOpen} size={'icon'} className={cn(isSidebarOpen && "rotate-90 self-end", `transition-transform duration-300 mb-8 justify-center `)}>
        <Menu stroke="white" />
      </SideBarBtn>
      <nav className={cn(
        "mt-6 transition-all ease-in-out duration-300 mb-20",
        isSidebarOpen ? "w-56" : "w-12"
      )}>
        <ul className="space-y-0">
          {routes.map((el) => {
            console.log(el.href)
            const href = el.href.endsWith('admin') ? el.href : `${el.href}?${searchParams.toString()}`
            return (
              <li key={el.routeName}>
                <SideBarBtn asChild className="gap-3">
                  <Link className="w-full" href={href}>
                    {el.icon}
                    {/* <HomeIcon className="[&>*]:fill-sidebar-foreground" />  */}

                    {showText && <span className="ml-2">{el.routeName}</span>}
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
        {showText && <div>
          <p className="scroll-m-20 text-sm font-semibold tracking-tight mb-0.5 max-w-44 text-muted-foreground">
            {userName}
          </p>
          <a href={`mailto:${userEmail}`} className="text-sm text-muted-foreground">{userEmail}</a>
        </div>}
      </div>
    </div>
  );
}

export default Sidebar;