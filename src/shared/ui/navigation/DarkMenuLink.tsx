import NavPanelBtn from "../buttons/NavPanelBtn"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"

type TProps = {
  href: string
  children?: React.ReactNode
  className?: string
  onLinkClick?: () => void
}
export const DarkMenuLink = ({
  href,
  children,
  className,
  onLinkClick = () => { },
}: TProps) => {

  return (
    <NavPanelBtn asChild className={cn("gap-3 justify-start text-in", className)}>
      <Link className="w-full" href={href} onClick={onLinkClick}>
        {children}

      </Link>
    </NavPanelBtn>
  );
}