'use client';
import Link from 'next/link';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { TUser } from "@/shared/api/types/user";
import { createSidebarConfig } from "@/shared/config/sidebarConfig";
import { SidebarGroup, SidebarItem } from "../../sidebar/ui/SidebarItems";
import { useParams } from "next/navigation";
import { cn } from '@/shared/lib/utils';
import useSidebarControl from '@/shared/model/hooks/useSidebarControl';
import SideBarBtn from '@/shared/ui/buttons/SideBarBtn';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import LogoImg from '@/assets/logo-short.png';
import Image from "next/image";
import { SignOutForm } from '@/features/auth';

interface IHeaderProps {
  userData: TUser
  className?: string
}

export const Header = ({ userData, className }: IHeaderProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';
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
        <Image
          src={LogoImg}
          alt="RekrutAi logo"
          width={50}
          height={50}
          priority
        />
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
      <div className={cn('flex gap-2')}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <SignOutForm
          variant={'link'}
          className="text-muted-foreground"
        />
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

