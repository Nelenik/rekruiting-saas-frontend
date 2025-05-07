import { IDashboardRoute } from "@/shared/config/rekrutaiSidebarConfig";
import { cn } from "@/shared/lib/utils";
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn";
import { Collapsible, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ISidebarItemProps {
  linkConfig: IDashboardRoute
  className?: string
  onLinkClick?: () => void
}


// component of a simple sidebar link, without submenu
export const SidebarLink: FC<ISidebarItemProps> = ({ linkConfig, className, onLinkClick }) => {
  const { routeName, href, icon } = linkConfig
  return (
    <NavPanelBtn asChild className={cn("gap-3 justify-start", className)}>
      <Link className="w-full " href={href} onClick={onLinkClick}>
        {icon && icon}
        <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{routeName}</span>
      </Link>
    </NavPanelBtn>
  );
}

// sidebar group with submenu 
export const SidebarItem: FC<ISidebarItemProps> = ({ linkConfig, onLinkClick }) => {

  const { routeName, icon, subMenu } = linkConfig
  //If the linkConfig does not have a submenu property, it is a simple link (not a group), so return the link element.
  if (!subMenu) {
    return <SidebarLink linkConfig={linkConfig} onLinkClick={onLinkClick} />
  }

  //Otherwise, return a collapsible element with nested links
  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <NavPanelBtn className="w-full justify-start">
          {icon && icon}
          <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{routeName}</span>
          <ChevronDown className="ml-auto" />
        </NavPanelBtn>
      </CollapsibleTrigger>
      <CollapsibleContent className=" overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
        <ul className={cn(
          "space-y-0 pl-5 relative",
          "before:content-[''] before:absolute before:h-3/4 before:w-px before:left-4 before:bg-sidebar-foreground/60 before:top-2/4 before:-translate-y-2/4"
        )}>
          {subMenu && subMenu.map((elem) => (
            <li key={elem.href}>
              <SidebarLink linkConfig={elem} className="px-2" onLinkClick={onLinkClick} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
