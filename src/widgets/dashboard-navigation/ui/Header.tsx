'use client';
import Link from 'next/link';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { createSidebarConfig } from "@/shared/config/sidebarConfig";
import { useParams } from "next/navigation";
import { cn } from '@/shared/lib/utils';
import useSidebarControl from '@/shared/model/hooks/useSidebarControl';
import SideBarBtn from '@/widgets/dashboard-navigation/ui/SideBarBtn';
import LogoImg from '@/assets/logo-short.png';
import Image from "next/image";
import { SidebarItem } from './SidebarItem';
import { useSession } from '@/features/auth';
import { UserMenuContent } from './UserMenuContent';
import { UserMenu } from '@/shared/ui/user-menu/UserMenu';

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';
  const sidebarConfig = createSidebarConfig(companyId)

  const { user } = useSession()

  const {
    sidebarRef,
    handleClose,
    handleOpen,
    isSidebarOpen,
  } = useSidebarControl({ initial: false, closeOutside: true })

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
          className={cn(
            'w-[35px] h-[35px]',
            ' sm:w-[50px] sm:h-[50px]'
          )}
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
                <SidebarItem linkConfig={el} onLinkClick={handleClose} />
              </li>
            );
          })}
        </ul>
      </nav>
      <UserMenu user={user} >
        <UserMenuContent user={user} />
      </UserMenu>
    </header>
  );
};

