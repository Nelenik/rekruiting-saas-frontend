'use client'
import { ReactNode, useCallback, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../shadcn/sheet"
import { cn } from "@/shared/lib/utils"

type TProps = {
  children: {
    trigger: ReactNode
    closeButton: ReactNode
  }
  content: (props: { closeMenu: () => void }) => ReactNode,
  side?: 'top' | 'left' | 'bottom' | 'right',
  menuSheetStyles?: string
  overlayStyles?: string
}

/**
 * `BurgerBase` is a wrapper component for a burger (drawer) menu.
 *
 * It uses the shadcn/ui `Sheet` primitive under the hood and provides:
 * - Custom trigger and close button slots
 * - A render function for menu content with access to a `closeMenu` callback
 * - Configurable placement (`side`) and styling
 *
 * Example usage:
 *
 * ```tsx
 * <BurgerBase
 *   trigger={<button>☰</button>}
 *   closeButton={<XIcon />}
 *   content={({ closeMenu }) => (
 *     <nav>
 *       <a onClick={closeMenu}>Home</a>
 *       <a onClick={closeMenu}>About</a>
 *     </nav>
 *   )}
 * />
 * ```
 */

export const BurgerBase = ({
  children,
  content,
  side = 'left',
  menuSheetStyles,
  overlayStyles
}: TProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const closeMenu = useCallback(() => {
    console.log('closing')
    setOpen(false)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        asChild
      >
        {children.trigger}
      </SheetTrigger>
      <SheetContent
        side={side}
        className={cn(

          menuSheetStyles
        )}
        overlayStyles={overlayStyles}
      >
        <SheetClose asChild>
          {children.closeButton}
        </SheetClose>
        <SheetTitle className="sr-only">
          Бургер меню
        </SheetTitle>
        <SheetDescription className="sr-only">
          Бургер меню
        </SheetDescription>
        {content({ closeMenu })}
      </SheetContent>
    </Sheet>
  )
}