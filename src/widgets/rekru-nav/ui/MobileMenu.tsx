import { cn } from "@/shared/lib/utils";
import { BurgerMenu } from "@/shared/ui/navigation/BurgerMenu";
import { NavList } from "../../../shared/ui/navigation/NavList";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { publicRoutes, profileRoutes } = useNavConfig()
  return (
    <BurgerMenu
      className={cn(
        'ring-1 ring-sidebar-foreground',
        className
      )}
      content={
        ({ closeMenu }) => (
          <ScrollArea className="h-dvh" type="auto">
            <nav className={cn(
              ' w-[97%]'
            )}>

              {/* PROFILE NAV, TEMP DISCONNECTED */}
              {/* <NavList
                routes={profileRoutes}
                className={cn(
                  'text-sidebar-foreground',
                  'flex flex-col mb-6 [&_a]:justify-start [&_a]:w-full'
                )}
                onLinkClick={() => setTimeout(closeMenu, 300)}
              />
              <Separator className="bg-sidebar-foreground h-[0.3px]" /> */}

              <NavList
                routes={publicRoutes}
                className={cn(
                  'flex flex-col mb-6 [&_a]:justify-start [&_a]:w-full',
                  'text-sidebar-foreground',
                )}
                onLinkClick={() => setTimeout(closeMenu, 300)}
              />
              <Separator className="bg-sidebar-foreground mb-0.5 h-[0.3px]" />
              <Separator className="bg-sidebar-foreground mb-0.5 h-[0.3px]" />
              <SignOutForm
                variant={'ghost'}
                className={cn(
                  "w-full text-sidebar-foreground justify-start",
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