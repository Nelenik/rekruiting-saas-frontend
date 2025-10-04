import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "../shadcn/button";
import { ReactNode } from "react";
import { cva } from "class-variance-authority";

const rekruCTAVariants = cva(
  'w-max py-2.5 flex rounded-lg text-primary-foreground transition-all',
  {
    variants: {
      view: {
        primary: 'bg-primary hover:opacity-85',
        dark: 'bg-accent2 hover:bg-primary',
        stroke: 'bg-transparent border border-accent2/40 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
      },

    },

  }
)


type TProps = {
  className?: string,
  view?: "primary" | "dark" | "stroke",
  children: ReactNode
} & ButtonProps
export const RekruCTA = ({ className, view = "primary", children, ...props }: TProps) => {
  return (
    <Button className={cn(rekruCTAVariants({ view: view }), className)} {...props}>
      {children}
    </Button>
  );
}