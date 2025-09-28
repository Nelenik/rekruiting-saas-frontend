'use client'
import { cn } from "@/shared/lib/utils";
import { NavList } from "../../../shared/ui/navigation/NavList";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";
import { createJobsitePublicNavConfig } from "@/shared/config/jobsiteNavConfig";
import { BurgerBase } from "@/shared/ui/navigation/BurgerBase";
import { RekruProfileMenu } from "./RekruProfileMenu";
import { Separator } from "@/shared/ui/shadcn/separator";
import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { X } from "lucide-react";
import React from "react";

type TProps = {
  className?: string;
}

/**
 * 
 * @param param0 
 * @returns Trigger button view for rekru mobile menu
 */
interface BurgerButtonProps extends ButtonProps {
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const BurgerButton = ({ className, ...props }: BurgerButtonProps) => {
  return (
    <Button {...props} variant={'ghost'} className={cn("w-12 h-12 p-3.5 flex flex-col gap-1 items-end ring ring-secondary", 'hover:bg-secondary transition-colors', className)}>
      <span className="w-full h-0.5 rounded-full bg-secondary-foreground"></span>
      <span className="w-3/4 h-0.5 rounded-full bg-secondary-foreground"></span>
      <span className="w-full h-0.5 rounded-full bg-secondary-foreground"></span>
    </Button>
  )
}

export const MobileMenu = ({
  className
}: TProps) => {
  const publicRoutes = createJobsitePublicNavConfig()
  return (
    <BurgerBase
      // render prop
      content={
        ({ closeMenu }) => {
          return (
            <ScrollArea className="h-dvh" type="auto">
              <nav className={cn(
                'flex flex-col gap-5'
              )}>

                <RekruProfileMenu
                  onLinkClick={() => setTimeout(closeMenu, 300)}
                  theme="light"
                />

                <Separator />

                <NavList
                  routes={publicRoutes}
                  className={cn(
                    'flex flex-col gap-2.5'
                  )}
                  onLinkClick={() => setTimeout(closeMenu, 300)}
                  theme="light"
                />
              </nav>
            </ScrollArea>
          )
        }
      }
      side="right"
      menuSheetStyles='p-5'
      overlayStyles='bg-secondary/40'
    >
      {/* named slots */}
      {{
        trigger: <BurgerButton className={className} />,
        closeButton: <Button variant={'ghost'} className="mb-5 hover:bg-secondary"><X /></Button>,
      }}
    </BurgerBase>
  );
}