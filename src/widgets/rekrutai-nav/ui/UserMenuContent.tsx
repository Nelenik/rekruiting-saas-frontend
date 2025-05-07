import { SignOutForm } from "@/features/auth";
import { TUser } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/shadcn/separator";

type TProps = {
  user: Pick<TUser, 'name' | 'email'>
}
export const UserMenuContent = ({ user }: TProps) => {
  return (
    <div className=" flex flex-col gap-2">

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
      <SignOutForm
        variant={'ghost'}
        className={cn(
          "w-full text-muted-foreground justify-start",
          "hover:bg-accent/10 hover:text-sidebar-foreground"
        )}
      />
    </div>
  );
}