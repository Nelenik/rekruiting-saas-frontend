import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/shadcn/button";

const NavPanelBtn = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant={"ghost"} {...props} className={cn(' hover:bg-accent/10 hover:text-sidebar-foreground text-ellipsis overflow-hidden', className,)}>
      {children}
    </Button>
  );
}

export default NavPanelBtn;