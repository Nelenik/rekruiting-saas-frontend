/**
 * Sorts an array of objects based on a given order of IDs and appends any items not in the order at the end.
 *
 * @param items - An array of objects, where each object must have an `id` property of type `number` or `string`.
 * @param idOrder - An array of `number` or `string` values representing the desired order of item IDs.
 *
 * @returns A new array where the objects are sorted according to the order in `idOrder`.
 * Items whose IDs do not appear in `idOrder` are appended to the end of the array in their original order.
 *
 * @example
 * const items = [
 *   { id: 1, name: "Item 1" },
 *   { id: 2, name: "Item 2" },
 *   { id: 3, name: "Item 3" }
 * ];
 * const idOrder = [2, 1];
 *
 * const sortedItems = sortItemsByIdOrder(items, idOrder);
 * console.log(sortedItems);
 * // Output: [{ id: 2, name: "Item 2" }, { id: 1, name: "Item 1" }, { id: 3, name: "Item 3" }]
 */
export const sortItemssByIdOrder = <T extends { id: number | string }>(
  items: T[],
  idOrder: (number | string)[]
) => {
  const sortedObj = idOrder
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);

  const remainingObj = items.filter((item) => !idOrder.includes(item.id));
  return [...sortedObj, ...remainingObj];
};
