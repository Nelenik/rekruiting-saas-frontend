import { THhRoleGroup } from "../api/types";
import { TCheckboxItem } from "../../../shared/ui/form-elements/multilevel-checkbox/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapHhRolesToCheckboxItems = (
  raw: THhRoleGroup[]
): TCheckboxItem[] => {
  return raw.map((item: THhRoleGroup) => ({
    id: item.id,
    label: item.name,
    children: item.roles.map((item) => ({ id: item.id, label: item.name })),
  }));
};
