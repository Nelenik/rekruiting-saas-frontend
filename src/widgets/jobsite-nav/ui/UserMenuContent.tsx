'use client'
import { TUser } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn";
import { Separator } from "@/shared/ui/shadcn/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  user?: Pick<TUser, 'email' | 'name'>
}
export const UserMenuContent = ({
  user = { name: 'Соискатель', email: 'user-apply@test.ru' }
}: TProps) => {
  const pathname = usePathname()
  const isProfile = pathname.includes('profile')
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
      <Separator />
      {!isProfile && <NavPanelBtn
        asChild
        className="justify-start"
      >
        <Link
          href={'/profile'}
        >Личный кабинет</Link>
      </NavPanelBtn>}
    </div>
  );
}