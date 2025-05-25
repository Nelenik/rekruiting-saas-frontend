'use client'
import { cn } from "@/shared/lib/utils";
import { ReactNode, useCallback, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../shadcn/sheet";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import NavPanelBtn from "../buttons/NavPanelBtn";

type TProps = {
  className?: string,
  content: (props: { closeMenu: () => void }) => ReactNode
}
/**
 * `BurgerMenu` is a responsive component that renders a left-side sliding menu
 * using the `Sheet` UI pattern from the `shadcn` library.
 *
 * It is typically used to display a collapsible navigation menu, especially on smaller screens.
 * The menu opens when the `SheetTrigger` (a burger icon) is clicked, and renders the passed `children`
 * inside the `SheetContent`.
 *
 * The component also includes a translucent overlay behind the menu when it is open.
 *
 * @param className - Optional class name applied to the trigger button for custom styling.
 * @param children - The content to display inside the opened sheet (usually navigation items).
 *
 * @example
 * <BurgerMenu className="lg:hidden">
 *   <Nav />
 * </BurgerMenu>
 */
export const BurgerMenu = ({
  className,
  content
}: TProps) => {

  const [open, setOpen] = useState<boolean>(false)
  const closeMenu = useCallback(() => { setOpen(false) }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          className
        )}
        asChild
      >
        <NavPanelBtn
          className="w-9 h-9 p-0 "
        >
          <PanelLeftOpen stroke="white" />
        </NavPanelBtn>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className={cn(
          'flex flex-col w-[min(100dvw,400px)] py-3',
          'bg-sidebar border-none'
        )}
        overlayStyles="bg-sidebar/10"
      >
        <SheetClose asChild>
          <NavPanelBtn className="mb-6 ml-auto w-9 h-9 p-0 " >
            <PanelRightOpen stroke="white" />
          </NavPanelBtn>
        </SheetClose>
        <SheetTitle className="visually-hidden">
          Бургер меню
        </SheetTitle>
        <SheetDescription className="visually-hidden">
          Бургер меню
        </SheetDescription>
        {content({ closeMenu })}
      </SheetContent>
    </Sheet>
  )
}
