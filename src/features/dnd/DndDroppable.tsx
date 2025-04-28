'use client'
import { useDroppable } from "@dnd-kit/core";
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/shared/lib/utils";

type TProps = HTMLAttributes<HTMLDivElement> & {
  droppableId: string | number,
  asChild?: boolean,
  dndData?: Record<string, unknown>,
}

/**

* A droppable area component that accepts draggable and sortable elements.
* Used in conjunction with DndDraggable and DndSortable components.

 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string|number} props.droppableId - Unique identifier for the droppable area.
 * @param {Record<string, unknown>} [props.dndData] - Optional custom data to associate with the droppable area.
 * @param {boolean} [props.asChild=false] - If true, renders as a Slot component instead of a <div>.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {ReactNode} props.children - Content to be rendered inside the droppable area.
 * @param {HTMLAttributes<HTMLDivElement>} [props.rest] - All other standard HTML div attributes.
 *
 * @example
 * ```tsx
 * <DndDroppable droppableId="drop-zone">
 *   <div>Drop items here</div>
 * </DndDroppable>
 * ```
* @remarks
* - Uses the useDroppable hook from DND Kit
* - Can be rendered as a div or as a Slot component using the asChild prop
* - Type matching ensures only compatible items can be dropped
*/

export const DndDroppable: FC<TProps> = ({ droppableId, asChild = false, dndData, children, className, ...props }) => {
  const { setNodeRef } = useDroppable({
    id: droppableId,
    data: {
      ...dndData
    }
  })

  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={setNodeRef}
      className={cn(className)}
      {...props}
    >
      {children}
    </Comp>
  );
}