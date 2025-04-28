'use client'
import { DndContext, DndContextProps, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ReactNode } from "react";

type TProps = DndContextProps & {
  boardId: string,
  children: ReactNode,
  renderOverlay: () => ReactNode

}
export const DndBoard = ({ boardId, children, renderOverlay, ...props }: TProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );
  return (
    <DndContext
      sensors={sensors}
      {...props}
      id={boardId}
    >
      {/* board content */}
      {children}

      {/* overlay with render  */}
      <DragOverlay>
        {renderOverlay()}
      </DragOverlay>

    </DndContext>
  );

}