import { THhRoleGroup } from "../api/types";
import { TCheckboxItem } from "../../../shared/ui/form-elements/multilevel-checkbox/types";

export const mapHhRolesToCheckboxItems = (
  raw: THhRoleGroup[],
): TCheckboxItem[] => {
  return raw.map((group: THhRoleGroup) => ({
    id: String(group.id),
    label: group.name,
    children: group.roles.map((role) => ({
      id: String(role.id),
      label: role.name,
    })),
  }));
};
