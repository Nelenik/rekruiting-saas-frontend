import { TNavConfig } from "@/shared/config/types";
import { cn } from "@/shared/lib/utils";
import { DarkMenuLink } from "@/shared/ui/navigation/DarkMenuLink";

type Props = {
  routes: TNavConfig[]
  className?: string;
  onLinkClick?: () => void
}
export const NavList = ({
  routes,
  className,
  onLinkClick = () => { },
}: Props) => {
  return (
    <ul
      className={cn(
        " text-sidebar-foreground",
        className
      )}
    >
      {routes.map(route => (
        <li key={route.routeName}>
          <DarkMenuLink
            href={route.href}
            className="w-full justify-start"
            onLinkClick={onLinkClick}
          >
            {route.icon && route.icon}
            <span className="ml-2">{route.routeName}</span>
          </DarkMenuLink>
        </li>)
      )}
    </ul>
  );
}