'use client'
import { cn } from "@/shared/lib/utils"
import { useControlledOpen } from "@/shared/model/hooks/useControlledOpen"

type RenderProps = {
  isSidebarOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

type TProps = {
  className?: string
  /**
   * Render function that receives the sidebar state and toggle handler.
   * Use this to customize the sidebar's inner content.
   */
  render: (props: RenderProps) => React.ReactNode
  /** Width of the sidebar when open (e.g., "14rem", "244px"). Default is "244px" */
  openWidth?: string
  /** Width of the sidebar when closed (e.g., "85px"). Default is "85px" */
  closedWidth?: string
}

/**
 * A collapsible sidebar component that supports open/closed state,
 * customizable widths, and flexible rendering via a render prop.
 * 
 * Example usage:
 * 
 * ```tsx
 * <CollapsibleSidebar
 *   openWidth="250px"
 *   closedWidth="80px"
 *   render={({ isSidebarOpen, toggle }) => (
 *     <div>
 *       <button onClick={toggle}>Toggle</button>
 *       {isSidebarOpen && <p>Sidebar content</p>}
 *     </div>
 *   )}
 * />
 * ```
 */
export const CollapsibleSidebar = ({
  className,
  render,
  openWidth = '244px',
  closedWidth = '85px',
}: TProps) => {
  const {
    controlledRef,
    handleToggle,
    handleOpen,
    handleClose,
    isOpen
  } = useControlledOpen({ initial: true })

  const sidebarWidth = { width: isOpen ? openWidth : closedWidth }
  return (
    <aside
      ref={controlledRef}
      style={sidebarWidth}
      className={cn(
        'transition-[width] ease-in-out duration-400 @container',
        sidebarWidth,
        className
      )}
    >
      {
        render({
          isSidebarOpen: isOpen,
          toggle: handleToggle,
          open: handleOpen,
          close: handleClose
        })
      }
    </aside>
  );
}