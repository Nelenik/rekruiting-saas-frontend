import { Active, Over } from "@dnd-kit/core";

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
