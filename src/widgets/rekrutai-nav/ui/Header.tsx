'use client';
import Link from 'next/link';
import { createRekrutaiNavConfig } from "@/shared/config/rekrutaiNavConfig";
import { useParams } from "next/navigation";
import { cn } from '@/shared/lib/utils';
import LogoImg from '@/assets/logo-short.png';
import Image from "next/image";
import { SidebarItem } from './SidebarItem';
import { useSession } from '@/features/auth';
import { UserMenuContent } from './UserMenuContent';
import { UserMenu } from '@/shared/ui/navigation/UserMenu';
import { BurgerMenu } from '@/shared/ui/navigation/BurgerMenu';

interface IHeaderProps {
  className?: string
}

export const Header = ({ className }: IHeaderProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = params?.companyId || '';
  const sidebarConfig = createRekrutaiNavConfig(companyId)

  const { user } = useSession()

  return (
    <header
      className={cn(
        'flex justify-between items-center px-6 py-2 bg-sidebar text-sidebar-foreground fixed top-0 left-0 w-full z-[50] shadow-sm',
        className
      )}
    >
      <BurgerMenu
        content={
          ({ closeMenu }) => {
            return (
              <nav>
                <ul className="@container space-y-0 text-sidebar-foreground">
                  {sidebarConfig.map((el) => {
                    return (
                      <li key={el.routeName}>
                        <SidebarItem linkConfig={el} onLinkClick={() => {
                          setTimeout(closeMenu, 300)
                        }} />
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )
          }
        }
      />
      <Link href={'/'} className={cn('')}>
        <Image
          src={LogoImg}
          className={cn(
            'w-[35px] h-[35px]',
            ' sm:w-[44px] sm:h-[44px]'
          )}
          alt="RekrutAi logo"
          width={44}
          height={44}
          priority
        />
      </Link>

      <UserMenu user={user} >
        <UserMenuContent user={user} />
      </UserMenu>
    </header>
  );
};


// export const Header = ({ className }: IHeaderProps) => {
//   const params = useParams<{ companyId: string }>();
//   const companyId = params?.companyId || '';
//   const sidebarConfig = useMemo(() => createSidebarConfig(companyId), [companyId])

//   const { user } = useSession()

//   const {
//     controlledRef,
//     handleClose,
//     handleOpen,
//     isOpen,
//   } = useControlledOpen({ initial: false, closeOutside: true })

//   return (
//     <header
//       className={cn(
//         'flex justify-between items-center px-6 py-2 bg-sidebar text-sidebar-foreground fixed top-0 left-0 w-full z-[50] shadow-sm',
//         className
//       )}
//     >
//       <NavPanelBtn onClick={handleOpen} size={'icon'}>
//         <PanelLeftOpen stroke="white" />
//       </NavPanelBtn>
//       <Link href={'/'} className={cn('')}>
//         <Image
//           src={LogoImg}
//           className={cn(
//             'w-[35px] h-[35px]',
//             ' sm:w-[44px] sm:h-[44px]'
//           )}
//           alt="RekrutAi logo"
//           width={44}
//           height={44}
//           priority
//         />
//       </Link>
//       <nav ref={controlledRef} className={cn(
//         "fixed left-0 top-0 w-[min(100dvw,400px)] h-dvh px-6 py-3 flex flex-col bg-sidebar text-sidebar-foreground z-[900] -translate-x-[150%] transition-transform duration-300 delay-75 @container",
//         isOpen && 'translate-x-[unset]'
//       )}>
//         <NavPanelBtn onClick={handleClose} size={'icon'} className="mb-6 ml-auto [&_svg]:w-5 [&_svg]:h-5" >
//           <PanelRightOpen stroke="white" />
//         </NavPanelBtn>
//         <ul className="space-y-0">
//           {sidebarConfig.map((el) => {
//             return (
//               <li key={el.routeName}>
//                 <SidebarItem linkConfig={el} onLinkClick={handleClose} />
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//       <UserMenu user={user} >
//         <UserMenuContent user={user} />
//       </UserMenu>
//     </header>
//   );
// };

