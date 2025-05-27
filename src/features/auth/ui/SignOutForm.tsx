import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { signout } from "../api/auth-actions";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type TProps = ButtonProps & {
  redirectTo?: string,
  className?: string,
  children?: React.ReactNode

}
/**
* SignOutForm component is a form that triggers the sign-out action.
* It uses a button to submit the form, which calls the signout function
* with an optional redirect URL.
* @param {TProps} props - The properties for the SignOutForm component.
* @param {string} props.redirectTo - The URL to redirect to after signing out. Defaults to '/'.
* @param {string} props.className - Additional CSS classes to apply to the button.
* @param {React.ReactNode} props.children - The content to display inside the button.
* @returns {JSX.Element} A form element containing a button that triggers the sign-out action.
* @example
* ```tsx
* <SignOutForm redirectTo="/login" className="my-custom-class">
*   Выйти
* </SignOutForm>
*  
 */
export const SignOutForm = ({
  className,
  redirectTo = '/',
  children,
  ...props }: TProps) => {
  const signoutWithNext = signout.bind(null, redirectTo);
  return (
    <form action={signoutWithNext}>
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