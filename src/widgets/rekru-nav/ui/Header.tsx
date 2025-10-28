'use client'
import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import { NavList } from "@/shared/ui/navigation/NavList";
import { Logo } from "@/shared/ui/navigation/Logo";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";

import LogoImg from '@/assets/rekru-logo.webp';
import profileSampleImg from '@/assets/profile-sample.png'
import { useMemo } from "react";
import { createJobsitePublicNavConfig } from "@/shared/config/jobsiteNavConfig";
import { UserAvatar } from "@/entities/profile";



const userSample = {
  id: 1,
  name: 'Феодосия Абрассимова',
  email: 'feodosia.abra@yandex.ru',
  profile_image: profileSampleImg.src
}

type TProps = {
  className?: string
}
/**
 * 
 * Header component for the job site navigation.
 * It includes a logo, navigation links, and a user menu.
 * @param param0 
 * @returns 
 */
export const Header = ({
  className
}: TProps) => {
  const publicRoutes = useMemo(() => createJobsitePublicNavConfig(), [])

  return (

    <header
      className={cn(
        'py-4 hidden invisible ',
        'md-lg:block md-lg:visible',
        className
      )}
    >
      <div
        className={cn(
          'rekru-container relative',
          'flex justify-between items-center gap-8'
        )}
      >

        {/* Logo */}
        {/* Logo is always shown */}
        <Logo
          width={352}
          height={123}
          alt="Rekruru - jobsite logo"
          href="/"
          image={LogoImg}
          className={cn(
            'm-auto shrink-0',
            'md:w-[182px] md:h-[64px] md:m-0'
          )}
        />

        {/* show nav on screen from md screen = 768px */}
        <nav
          className={cn(
            'hidden invisible max-w-[450px] grow mx-auto',
            // show on md screen
            'md:flex md:visible '
          )}>
          <NavList
            routes={publicRoutes}
            className={cn(
              'flex gap-6 lg:gap-10 items-center w-full justify-center',
            )}
            theme='light'
            navLinkStyles="py-2"
          />
        </nav>

        <div className="flex gap-6 items-center">
          <RekruCTA view="dark">
            <Plus />
            Добавить вакансию
          </RekruCTA>

          <Link
            href='/profile'
          >
            <UserAvatar
              userName={userSample.name}
              profileImage={userSample.profile_image}
              className='w-10 h-10'
            />
          </Link>
        </div>
      </div>
    </header >
  );
}