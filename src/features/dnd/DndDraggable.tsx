'use client'
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";

type TProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean,
  id: string,
  type: string
}

/**
 * DndDraggable is a reusable drag-and-drop component that wraps content with drag functionality.
 * It provides a drag handle and transforms the wrapped content during drag operations.
 * 
 * @component
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to be made draggable
 * @param {string | number} props.id - Unique identifier for the draggable element
 * @param {string} props.type - Type identifier for the draggable content
 * @param {boolean} [props.asChild=false] - When true, renders as a Slot component instead of a div
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * 
 * @example
 * ```tsx
 * <DndDraggable id="item-1" type="card">
 *   <div>Draggable Content</div>
 * </DndDraggable>
 * ```
 * 
 * @remarks
 * - Uses the `useDraggable` hook for drag functionality
 * - Provides a vertical grip handle button for dragging
 * - Applies transform translations during drag operations
 * - Can be rendered as a div or as a Slot component using the asChild prop
 * 
 */

export const DndDraggable: FC<TProps> = ({ children, id, type, asChild = false, className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: type,

    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn('relative grow-0', className)}
      ref={setNodeRef}
      style={style}
      {...props}
    >
      <Button variant={'ghost'} {...attributes} {...listeners} className="absolute left-1 top-2 z-10 p-1 h-max cursor-grab">
        <GripVertical className="stroke-muted-foreground" />
      </Button >
      {children}
    </Comp>
  );
}
