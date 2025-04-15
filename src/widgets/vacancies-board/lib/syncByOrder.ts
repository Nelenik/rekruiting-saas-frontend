export const syncByOrder = <T extends { id: number }>(
  array: T[],
  order: number[]
) =>
  array.toSorted((a: T, b: T) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    return indexA - indexB;
  });
