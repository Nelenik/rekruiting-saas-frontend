'use client'
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";

type TProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean,
  sortableId: string | number,
  dndData?: Record<string, unknown>,
  enableGrip?: boolean
}

/**
 * DndSortable is a reusable component that enables sortable drag-and-drop functionality.
 * It wraps content with sorting capabilities and provides a drag handle for reordering.
 * 
 * @component
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to be made sortable
 * @param {string|number} props.sortableId - Unique identifier for the sortable element
 * @param {string} props.type - Type identifier for the sortable content
 * @param {boolean} [props.asChild=false] - When true, renders as a Slot component instead of a div
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @param {boolean} [props.enableGrip] - Enable grip for sortable element, by default setted for false
 * 
 * @example
 * ```tsx
 * <DndSortable id="item-1" type="list-item">
 *   <div>Sortable Content</div>
 * </DndSortable>
 * ```
 * 
 * @remarks
 * - Uses the `useSortable` hook from DND Kit for sorting functionality
 * - Provides a vertical grip handle button for dragging and reordering
 * - Applies transform translations during sort operations
 * - Can be rendered as a div or as a Slot component using the asChild prop
 * - Typically used within a container that manages the sorting logic and order
 */

export const DndSortable: FC<TProps> = ({
  children,
  sortableId,
  dndData,
  asChild = false,
  enableGrip = false,
  className,
  ...props
}) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: sortableId,
    data: {
      ...dndData

    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      {...(!enableGrip && attributes)}
      {...(!enableGrip && listeners)}
      className={cn(
        isDragging && "opacity-50",
        'relative grow-0',
        'group',
        className
      )}
      ref={setNodeRef}
      style={style}
      {...props}
    >
      {enableGrip
        && <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className={cn(
            "absolute left-1 top-2 z-[10] p-1 h-max cursor-grab tooltip bg-input/50",

          )}
          data-tooltip="Drag"
        >
          <GripVertical className="stroke-muted-foreground" />
        </Button >}
      {children}
    </Comp>
  );
}
