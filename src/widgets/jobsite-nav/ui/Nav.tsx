import { cn } from "@/shared/lib/utils"
import { createJobsiteNavConfig } from "../config/jobsiteNavConfig"
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn"
import Link from "next/link"

type TProps = {
  className?: string
  onLinkClick?: () => void
}
/**
 * `Nav` is a navigation component that renders a list of navigation links
 * based on the configuration returned by `createJobsiteNavConfig()`.
 *
 * Each navigation item is wrapped in a `NavPanelBtn` component and rendered as a link.
 * The list is styled with a default text color and can be customized via the `className` prop.
 *
 * @param className - Optional class name string applied to the root `<ul>` element for custom styling.
 *
 * @returns A JSX element representing the navigation list.
 *
 * @example
 * <Nav className="flex gap-6" />
 */
export const Nav = ({
  className,
  onLinkClick = () => { },

}: TProps) => {
  const routes = createJobsiteNavConfig()
  return (
    <ul
      className={cn(
        " text-sidebar-foreground",
        className
      )}
    >
      {routes.map(route => (
        <li key={route.routeName}>
          <NavPanelBtn asChild className={cn(
            'w-full justify-start',
            "inline-block"
          )}>
            <Link
              href={route.href}
              onClick={onLinkClick}
            >
              {route.routeName}
            </Link>
          </NavPanelBtn>
        </li>
      ))}
    </ul>
  )
}