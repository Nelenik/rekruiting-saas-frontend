'use client'
import { SignOutForm } from "@/features/auth";
import { TUser } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/shadcn/separator";
import { NavList } from "./NavList";
import { useNavConfig } from "../model/NavigationConfigProvider";

type TProps = {
  user?: Pick<TUser, 'email' | 'name'>
}
export const UserMenuContent = ({
  user = { name: 'Соискатель', email: 'user-apply@test.ru' }
}: TProps) => {

  const { profileRoutes } = useNavConfig()

  return (
    <div className=" flex flex-col gap-2 text-muted-foreground">
      <div>
        <p className="scroll-m-20 text-md font-semibold tracking-tight mb-0.5 max-w-44 text-muted-foreground">
          {user.name}
        </p>
        <a
          href={`mailto:${user.email}`}
          className={cn(
            "text-sm text-muted-foreground",
            "hover:underline hover:underline-offset-2"
          )}
        >
          {user.email}
        </a>
      </div>
      <Separator className="bg-sidebar-foreground" />
      <NavList
        routes={profileRoutes}
        className={cn(
          'text-sidebar-foreground',
          'flex flex-col [&_a]:justify-start [&_a]:w-full'
        )}
      />
      <Separator className="bg-sidebar-foreground" />
      <Separator className="bg-sidebar-foreground" />
      <SignOutForm
        variant={'ghost'}
        className={cn(
          "w-full  justify-start",
          'text-muted-foreground',
          "hover:bg-accent/10 hover:text-sidebar-foreground",
        )}
      />
    </div>
  );
}