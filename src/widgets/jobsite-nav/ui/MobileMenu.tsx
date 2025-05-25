import { cn } from "@/shared/lib/utils";
import { BurgerMenu } from "@/shared/ui/navigation/BurgerMenu";
import { NavList } from "./NavList";
import { SignOutForm } from "@/features/auth";
import { useNavConfig } from "../model/NavigationConfigProvider";
import { Separator } from "@/shared/ui/shadcn/separator";
import { ScrollArea } from "@/shared/ui/shadcn/scroll-area";

type TProps = {
  className?: string;
}
export const MobileMenu = ({
  className
}: TProps) => {
  const { publicRoutes, profileRoutes } = useNavConfig()
  return (
    <BurgerMenu
      className={cn(
        'ring-1 ring-sidebar-foreground',
        className
      )}
      content={
        ({ closeMenu }) => (
          <ScrollArea className="h-dvh">
            <nav className={cn(
              'flex flex-col gap-2 w-[97%]'
            )}>
              <NavList
                routes={profileRoutes}
                className={cn(
                  'text-sidebar-foreground',
                  'flex flex-col mb-8 [&_a]:justify-start [&_a]:w-full'
                )}
                onLinkClick={() => setTimeout(closeMenu, 300)}
              />
              <Separator className="bg-sidebar-foreground" />

              <NavList
                routes={publicRoutes}
                className={cn(
                  'flex flex-col mb-8 [&_a]:justify-start [&_a]:w-full',
                  'text-sidebar-foreground',
                )}
                onLinkClick={() => setTimeout(closeMenu, 300)}
              />
              <Separator className="bg-sidebar-foreground" />
              <Separator className="bg-sidebar-foreground" />
              <SignOutForm
                variant={'ghost'}
                className={cn(
                  "w-full text-muted-foreground justify-start",
                  "hover:bg-accent/10 hover:text-sidebar-foreground"
                )}
              />
            </nav>
          </ScrollArea>
        )
      }
    />
  );
}