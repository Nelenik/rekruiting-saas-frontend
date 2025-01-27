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
import { IUser } from "@/shared/types/user";

interface IHeaderProps {
  routes: IDashboardRoute[]
  userData: IUser
  className?: string
}

const Header = ({ routes = [], userData, className }: IHeaderProps) => {

  const {
    sidebarRef,
    handleClose,
    handleOpen,
    isSidebarOpen,
  } = useSidebarControl({ initial: false, closeOutside: true })

  const { name: userName, email: userEmail } = userData

  return (
    <header
      className={
        cn("flex justify-between items-center px-6 py-2 bg-sidebar text-sidebar-foreground relative", className)
      }
    >
      <SideBarBtn onClick={handleOpen} size={'icon'} >
        <PanelLeftOpen stroke="white" />
      </SideBarBtn>
      <Link href={'/'} className={cn("")}>
        <LogoSvg width={50} height={50} />
      </Link>
      <nav ref={sidebarRef} className={cn(
        "fixed left-0 top-0 w-[min(100dvw,400px)] h-dvh px-6 py-3 flex flex-col bg-sidebar text-sidebar-foreground z-[900] -translate-x-[150%] transition-transform duration-300 delay-75",
        isSidebarOpen && 'translate-x-[unset]'
      )}>
        <SideBarBtn onClick={handleClose} size={'icon'} className="mb-6 ml-auto [&_svg]:w-5 [&_svg]:h-5" >
          <PanelRightOpen stroke="white" />
        </SideBarBtn>
        <ul className="space-y-0">
          {routes.map((el) => {
            return (
              <li key={el.routeName}>
                <SideBarBtn asChild className="gap-3 justify-start" onClick={handleClose}>
                  <Link className="w-full " href={el.href}>
                    {el.icon}
                    <span className="ml-2">{el.routeName}</span>
                  </Link>
                </SideBarBtn>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className={cn("")}>

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
    </header>
  );
}

export default Header;