import { Active, Over } from "@dnd-kit/core";

/**
 * Determines whether a drag event is valid based on the drop target.
 *
 * @param {Active} active - The currently dragged item.
 * @param {Over | null} over - The drop target, or `null` if no target is present.
 * @returns {boolean} `true` if the drag event is valid, otherwise `false`.
 */

export const isValidDragEvent = (
  active: Active,
  over: Over | null
): boolean => {
  return !!over && !!over.data.current && over.id !== active.id;
};

export const findItemStatus = <T extends { id: string | number }[]>(
  groups: Record<string, T>,
  itemId: string
) => {
  return Object.keys(groups).find((status) =>
    groups[status].some((vac) => String(vac.id) === itemId)
  );
};
