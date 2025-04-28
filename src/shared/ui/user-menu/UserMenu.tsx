'use client'
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { UserAvatar } from "./UserAvatar";
import { TUser } from "@/shared/api/types";
import { ReactNode } from "react";

type TProps = {
  user: TUser,
  mode?: 'shown' | 'hidden',
  children: ReactNode
}


export const UserMenu = ({
  mode = 'hidden',
  user,
  children
}: TProps) => {

  if (mode === 'shown') {
    return (
      <>
        <UserAvatar
          userName={user.name}
          profileImage={user.profile_image}
        />
        {children}
      </>
    )
  }
  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar
          userName={user.name}
          profileImage={user.profile_image}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-[min(85vw,_250px)] bg-sidebar'
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}