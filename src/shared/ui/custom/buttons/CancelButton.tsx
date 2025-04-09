import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { Button, ButtonProps } from "../../shadcn/button";

export const CancelButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      variant='ghost'
      className={cn("hover:bg-transparent hover:opacity-60 h-max aspect-square rounded-full p-0.5", className)}
      {...props}
    >
      <X className="stroke-destructive" />
    </Button>
  );
}
