'use client'
import { UserPreview } from "@/entities/profile";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { LogOut, Plus } from "lucide-react";
import Link from "next/link";

import profileSampleImg from '@/assets/profile-sample.png'
import { cn } from "@/shared/lib/utils";
import { useMemo } from "react";
import { createJobsiteProfileNavConfig } from "@/shared/config/jobsiteNavConfig";
import { NavList } from "@/shared/ui/navigation/NavList";
import { SignOutForm } from "@/features/auth";

const userSample = {
  id: 1,
  name: 'Феодосия Абрассимова',
  email: 'feodosia.abra@yandex.ru',
  profile_image: profileSampleImg.src
}

type TProps = {
  className?: string
}
export const RekruProfileMenu = ({ className }: TProps) => {
  const profileRoutes = useMemo(() => createJobsiteProfileNavConfig(), [])
  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className="flex flex-col gap-5">
        <Link
          href='/profile'
        >
          <UserPreview user={userSample} className="w-56" />
        </Link>
        <RekruCTA>
          <Plus />
          Добавить вакансию
        </RekruCTA>
      </div>
      <NavList
        routes={profileRoutes}
        theme="dark"
        className='flex flex-col gap-4'
      />
      <SignOutForm
        variant={'ghost'}
        className={cn(" text-sidebar-foreground p-0 transition-all", "hover:bg-transparent hover:text-primary hover:scale-105")}
      >
        <LogOut className="w-5 h-20" />
        Выйти из аккаунта
      </SignOutForm>
    </div>
  );
}