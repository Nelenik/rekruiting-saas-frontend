import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "../shadcn/button";

export const StartPageButton = ({ className, children, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-gradient-to-tr from-blue-900 from-0% via-blue-700 via-50% to-blue-400 to-100% rounded-full",
        "hover:ring-blue-200 ring-offset-2 ring ring-transparent transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
// bg-gradient-to-tr from-blue-800 to-sky-300