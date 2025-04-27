import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { signout } from "../api/auth-actions";

type TProps = ButtonProps & {
  className?: string,

}

export const SignOutForm = ({ className,
  ...props }: TProps) => {
  return (
    <form action={signout}>
      <Button
        // variant={'outline'}
        className={className}
        {...props}
      >
        Выйти
      </Button>
    </form>
  );
}