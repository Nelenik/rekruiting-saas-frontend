'use client'

import Link from "next/link";
import LogoSvg from '@/assets/icons/logo.svg?rc';
import { Menu } from 'lucide-react'
import SideBarBtn from "./Buttons/SideBarBtn";
import HomeIcon from '@/assets/icons/home.svg?rc'
import VacansyIcon from '@/assets/icons/user-money.svg?rc'
import ReportIcon from '@/assets/icons/file.svg?rc'
import SettingIcon from '@/assets/icons/time-settings.svg?rc'
import { cn } from "@/lib/utils";
import useSidebarControl from "@/hooks/sidebar-hook";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Sidebar = () => {
  const { sidebarRef, handleOpen, isSidebarOpen, showText } = useSidebarControl()

  return (
    <div ref={sidebarRef} className="fixed flex flex-col items-start left-0 top-0 bottom-0 px-4 py-7 bg-sidebar text-sidebar-foreground ">
      <Link href={'/'} className="mb-3">
        <LogoSvg width={50} height={50} />
      </Link>
      <SideBarBtn onClick={handleOpen} size={'icon'} className={`${isSidebarOpen && "rotate-90"} transition-transform duration-300 mb-8 justify-center`}>
        <Menu stroke="white" />
      </SideBarBtn>
      <nav className={cn(
        "mt-6 transition-all ease-in-out duration-300 mb-auto",
        isSidebarOpen ? "w-32" : "w-12"
      )}>
        <ul className="space-y-0">
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1'}>
                <HomeIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Главная</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/vacancies'}>
                <VacansyIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Вакансии</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/reports'}>
                <ReportIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Отчеты</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/settings'}>
                <SettingIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Настройки</span>}
              </Link>
            </SideBarBtn>
          </li>
        </ul>
      </nav>
      <Avatar className="self-center">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Sidebar;