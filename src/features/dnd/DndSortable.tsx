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
 * `DndSortable` is a reusable component that enables sortable drag-and-drop functionality
 * using the DnD Kit. It wraps any content and makes it sortable within a list or group.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Content to be made sortable.
 * @param {string|number} props.sortableId - Unique identifier for the sortable element.
 * @param {Record<string, unknown>} [props.dndData] - Optional custom data to associate with the draggable item.
 * @param {boolean} [props.asChild=false] - If true, renders as a Slot component instead of a <div>.
 * @param {boolean} [props.enableGrip=false] - If true, renders a grip handle for dragging; otherwise, the whole item is draggable.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {any} [props.rest] - All other standard HTML div attributes.
 *
 * @example
 * ```tsx
 * <DndSortable sortableId="item-1">
 *   <div>Sortable Content</div>
 * </DndSortable>
 * ```
 *
 * @remarks
 * - Integrates with `useSortable` from DnD Kit to provide sorting behavior.
 * - Applies transform styles during drag operations for smooth motion.
 * - If `enableGrip` is `true`, only the grip handle is draggable.
 * - When `enableGrip` is enabled, you can style the parent with Tailwind’s `group` class
 *   to show additional hover effects or tooltips.
 * - The `asChild` prop allows replacing the root `div` with a custom component like `Slot`.
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
