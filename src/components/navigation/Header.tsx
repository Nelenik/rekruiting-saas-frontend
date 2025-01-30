'use client';
import Link from 'next/link';
import LogoSvg from '@/assets/icons/logo.svg?rc';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import SideBarBtn from "@/components/buttons/SideBarBtn";
import { cn } from "@/lib/utils";
import useSidebarControl from "@/hooks/useSidebarControl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { IUser } from "@/shared/types/user";
import { createSidebarConfig } from "@/shared/config/sidebarConfig";
import { SidebarGroup, SidebarItem } from "./nav_elmts/SidebarItems";
import { useParams } from "next/navigation";

interface IHeaderProps {
  userData: IUser
  className?: string
}

const Header = ({ userData, className }: IHeaderProps) => {
  const { companyId } = useParams<{ companyId: string }>()
  const sidebarConfig = createSidebarConfig(companyId)

  const {
    sidebarRef,
    handleClose,
    handleOpen,
    isSidebarOpen,
  } = useSidebarControl({ initial: false, closeOutside: true })

  const { name: userName, email: userEmail } = userData

  return (
    <header
      className={cn(
        'flex justify-between items-center px-6 py-2 bg-sidebar text-sidebar-foreground relative',
        className
      )}
    >
      <SideBarBtn onClick={handleOpen} size={'icon'}>
        <PanelLeftOpen stroke="white" />
      </SideBarBtn>
      <Link href={'/'} className={cn('')}>
        <LogoSvg width={50} height={50} />
      </Link>
      <nav ref={sidebarRef} className={cn(
        "fixed left-0 top-0 w-[min(100dvw,400px)] h-dvh px-6 py-3 flex flex-col bg-sidebar text-sidebar-foreground z-[900] -translate-x-[150%] transition-transform duration-300 delay-75 @container",
        isSidebarOpen && 'translate-x-[unset]'
      )}>
        <SideBarBtn onClick={handleClose} size={'icon'} className="mb-6 ml-auto [&_svg]:w-5 [&_svg]:h-5" >
          <PanelRightOpen stroke="white" />
        </SideBarBtn>
        <ul className="space-y-0">
          {sidebarConfig.map((el) => {
            return (
              <li key={el.routeName}>
                {el.subMenu ?
                  <SidebarGroup linkConfig={el} />
                  : <SidebarItem linkConfig={el} />}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={cn('')}>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
