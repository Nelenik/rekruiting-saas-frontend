'use client'
import { cn } from "@/shared/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { UserAvatar } from "./UserAvatar";
import { TUser } from "@/shared/api/types";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type TProps = {
  user: Pick<TUser, 'name' | 'profile_image'>,
  mode?: 'shown' | 'hidden',
  children: ReactNode,
  className?: string
}

/**
 * A user menu component that displays a user's avatar and optionally wraps the children in a popover.
 * 
 * @component
 * @param {TProps} props - The props for the UserMenu component.
 * @param {TUser} props.user - The user object containing `name` and `profile_image`.
 * @param {'shown' | 'hidden'} [props.mode='hidden'] - Controls how the menu is displayed:
 * - `'shown'`: Renders the avatar and children directly (without popover).
 * - `'hidden'`: Wraps the avatar with a popover that reveals the children when triggered.
 * @param {ReactNode} props.children - The content to display in the menu (e.g. links, actions).
 * 
 * @example
 * <UserMenu user={user} mode="hidden">
 *   <div>Profile</div>
 *   <div>Logout</div>
 * </UserMenu>
 */
export const UserMenu = ({
  mode = 'hidden',
  user,
  children,
  className
}: TProps) => {

  const isShown = mode === 'shown'
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex gap-4 items-end",
          '[&_.avatar]:hover:ring-1 [&_.avatar]:hover:ring-white',
          '[&_svg]:hover:animate-bounce',
          className
        )}
      >
        <UserAvatar
          className="avatar"
          userName={user.name}
          profileImage={user.profile_image}
        />
        {
          isShown &&
          <p
            className={cn(
              'flex gap-4 items-center self-center',
              "text-left break-words max-w-[120px] text-muted-foreground"
            )}
          >
            {user.name}
            <ChevronDown className="self-center " width={16} height={16} />
          </p>
        }

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