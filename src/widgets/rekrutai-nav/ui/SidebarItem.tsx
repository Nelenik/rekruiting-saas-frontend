import { TNavConfig } from "@/shared/config/types";
import { cn } from "@/shared/lib/utils";
import NavPanelBtn from "@/shared/ui/buttons/NavPanelBtn";
import { DarkMenuLink } from "@/shared/ui/navigation/DarkMenuLink";
import { Collapsible, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

type TProps = {
  linkConfig: TNavConfig
  className?: string
  onLinkClick?: () => void
}

/**
 * SidebarItem component renders a single navigation item in the sidebar.
 * It can either be a simple link or a collapsible group with sub-links.
 */
export const SidebarItem: FC<TProps> = ({ linkConfig, onLinkClick }) => {

  const { routeName, icon, href, subMenu } = linkConfig
  //If the linkConfig does not have a submenu property, it is a simple link (not a group), so return the link element.
  if (!subMenu) {
    return (
      <DarkMenuLink
        href={href}
        onLinkClick={onLinkClick}
      >
        {icon && icon}
        <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{routeName}</span>
      </DarkMenuLink>
    )
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
            <SidebarItem key={elem.href} linkConfig={elem} onLinkClick={onLinkClick} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
