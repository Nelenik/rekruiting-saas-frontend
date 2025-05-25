import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { signout } from "../api/auth-actions";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type TProps = ButtonProps & {
  className?: string,
  children?: React.ReactNode

}

export const SignOutForm = ({ className, children,
  ...props }: TProps) => {
  return (
    <form action={signout}>
      <Button
        // variant={'outline'}
        className={cn(
          'flex items-center gap-2',
          className
        )}
        {...props}
      >
        {children || (
          <>
            <LogOut />
            Выйти
          </>
        )}
      </Button>
    </form>
  );
}