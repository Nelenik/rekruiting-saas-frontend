'use client'

import { ReactNode, useCallback, useState } from "react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../shadcn/sheet"
import { X } from "lucide-react"

type TProps = {
  children: {
    trigger: ReactNode
    title: ReactNode
    description: ReactNode
  }
  renderContent: (props: { closeSheetModal: () => void }) => ReactNode
}

/**
 * A highly reusable and flexible modal component built on top of the Sheet component.
 * This component leverages the **render props** pattern to dynamically render content
 * and supports **named slots** for trigger, title, and description elements.
 * 
 * @template TProps - The type of props passed to the component.
 *
 * @param props - Component properties.
 * @param props.children - An object containing named slots for the modal's trigger, title, and description.
 *   - `trigger`: The element that triggers the opening of the modal (e.g., a button).
 *   - `title`: The title displayed at the top of the modal.
 *   - `description`: The visually hidden description for accessibility purposes.
 * @param props.renderContent - A function that uses the **render props** pattern to dynamically render the modal's content.
 *   - Receives an object with a `closeSheetModal` function to programmatically close the modal.
 *
 * ## Patterns Used:
 * - **Render Props**: The `renderContent` prop allows dynamic rendering of the modal's content. The parent component controls the modal's content and behavior (like closing it), making the component reusable in different contexts.
 * - **Named Slots**: The `children` prop is structured as an object with named properties (`trigger`, `title`, `description`), which act as "slots" for specific parts of the modal. This pattern enhances readability and maintainability.
 *
 * ## Accessibility:
 * - The `SheetDescription` is visually hidden but remains accessible to screen readers,
 *   ensuring compliance with accessibility standards.
 *
 * ## Usage Example:
 * ```tsx
 * <SheetModal
 *   children={{
 *     trigger: <button>Open Modal</button>,
 *     title: 'Edit Profile',
 *     description: 'This modal allows you to edit your profile information.'
 *   }}
 *   renderContent={({ closeSheetModal }) => (
 *     <div>
 *       <p>Modal Content Goes Here</p>
 *       <button onClick={closeSheetModal}>Close</button>
 *     </div>
 *   )}
 * />
 * ```
 *
 * @returns A JSX element representing a modal dialog with customizable trigger, title, description, and content.
 */

export const SheetModal = ({
  children,
  renderContent
}: TProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const closeSheetModal = useCallback(() => setOpen(false), [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children.trigger}
      </SheetTrigger>
      <SheetContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col sm:max-w-none overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <SheetTitle className="text-3xl">
          {children.title}
        </SheetTitle>

        <SheetDescription className="visually-hidden">
          {children.description}
        </SheetDescription>

        {renderContent({ closeSheetModal })}

      </SheetContent>
    </Sheet>
  )
}