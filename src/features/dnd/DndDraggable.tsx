'use client'
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";

type TProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean,
  draggableId: string | number,
  dndData?: Record<string, unknown>,
}

/**
 * `DndDraggable` is a reusable drag-and-drop component that makes its children draggable
 * using the DnD Kit. It includes a drag handle and applies transformation styles during dragging.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string|number} props.draggableId - Unique identifier for the draggable element.
 * @param {Record<string, unknown>} [props.dndData] - Optional custom data to associate with the draggable item.
 * @param {boolean} [props.asChild=false] - If true, renders as a Slot component instead of a <div>.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {ReactNode} props.children - Content to be rendered and made draggable.
 * @param {HTMLAttributes<HTMLDivElement>} [props.rest] - All other standard HTML div attributes.
 *
 * @example
 * ```tsx
 * <DndDraggable draggableId="item-1">
 *   <div>Draggable Content</div>
 * </DndDraggable>
 * ```
 *
 * @remarks
 * - Uses the `useDraggable` hook from DnD Kit.
 * - A grip handle (button) is rendered inside the component for initiating drag.
 * - Applies `transform` styles to reflect drag movement.
 * - Can be rendered as a regular `<div>` or custom wrapper using the `asChild` prop.
 */

export const DndDraggable: FC<TProps> = ({ children, draggableId, dndData, asChild = false, className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
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
