import SideBarBtn from "@/components/uttons/SideBarBtn";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { IDashboardRoute } from "@/shared/types/navigation";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ISidebarItemProps {
  linkConfig: IDashboardRoute
  className?: string
}


// component of a simple sidebar link, without submenu
export const SidebarItem: FC<ISidebarItemProps> = ({ linkConfig, className }) => {
  const { routeName, href, icon } = linkConfig
  return (
    <SideBarBtn asChild className={cn("gap-3 justify-start", className)}>
      <Link className="w-full " href={href}>
        {icon && icon}
        <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{routeName}</span>
      </Link>
    </SideBarBtn>
  );
}

// sidebar group with submenu 
export const SidebarGroup: FC<ISidebarItemProps> = ({ linkConfig }) => {
  const { routeName, icon, subMenu } = linkConfig
  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <SideBarBtn className="w-full justify-start">
          {icon && icon}
          <span className="ml-2 hidden opacity-0 @[150px]:inline @[100px]:opacity-100 transition-opacity duration-200">{routeName}</span>
          <ChevronDown className="ml-auto" />
        </SideBarBtn>
      </CollapsibleTrigger>
      <CollapsibleContent className=" overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
        <ul className="space-y-0 pl-5 relative before:content-[''] before:absolute before:h-3/4 before:w-px before:left-4 before:bg-sidebar-foreground/60 before:top-2/4 before:-translate-y-2/4">
          {subMenu && subMenu.map((elem) => (
            <li key={elem.href}>
              <SidebarItem linkConfig={elem} className="px-2" />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
