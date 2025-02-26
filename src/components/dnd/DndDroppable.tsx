'use client'
import { useDroppable } from "@dnd-kit/core";
import { FC, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils";

type TProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  asChild?: boolean,
  type: string
}

/**

* A droppable area component that accepts draggable and sortable elements.
* Used in conjunction with DndDraggable and DndSortable components.

* @component
* @param {Object} props - Component properties
* @param {string | number} props.id - Unique identifier for the droppable area
* @param {boolean} [props.asChild=false] - When true, renders as a Slot component instead of a div
* @param {string} props.type - Type identifier for the droppable area to control what can be dropped
* @param {ReactNode} props.children - Content to be rendered within the droppable area
* @param {string} [props.className] - Additional CSS classes to apply to the container

* @example
* ```tsx
*  <DndDroppable id="drop-zone" type="card">
*  <div>Drop items here</div>
*  </DndDroppable>
* ```
* @remarks
* - Uses the useDroppable hook from DND Kit
* - Can be rendered as a div or as a Slot component using the asChild prop
* - Type matching ensures only compatible items can be dropped
*/

const DndDroppable: FC<TProps> = ({ id, asChild = false, type, children, className, ...props }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: type
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

export default DndDroppable;