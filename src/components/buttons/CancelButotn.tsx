import { X } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

const CancelButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      variant='ghost'
      className={cn("hover:bg-transparent hover:opacity-60 h-max aspect-square rounded-full ring-1 ring-destructive p-0.5", className)}
      {...props}
    >
      <X className="stroke-destructive" />
    </Button>
  );
}

export default CancelButton;