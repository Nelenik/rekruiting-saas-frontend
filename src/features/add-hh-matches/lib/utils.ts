import { TCheckboxItem } from "../ui/multilevel-checkbox/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapToCheckboxItems = (raw: any[]): TCheckboxItem[] => {
  return raw.map(
    (item): TCheckboxItem => ({
      id: String(item.id),
      label: item.name,
      ...(item.url && { childrenUrl: item.url }),
    })
  );
};
