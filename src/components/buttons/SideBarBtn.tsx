import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";

const SideBarBtn = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant={"ghost"} {...props} className={cn(' hover:bg-accent/10 hover:text-sidebar-foreground', className,)}>
      {children}
    </Button>
  );
}

export default SideBarBtn;