'use client'
import { fetchJson } from "@/shared/api/common/fetchJson";
import { THhCheckboxGroupItem } from "../../api/types";
import { MultilevelCheckbox } from "./MultilevelCheckbox";
import { TCheckboxItem } from "./types";
import { mapToCheckboxItems } from "../../lib/utils";

type Props = {
  items: TCheckboxItem[]
}
export const Test = ({ items }: Props) => {
  return (
    <div>
      <MultilevelCheckbox
        name='roles[]'
        items={items}
        onLoadChildren={async (item) => {
          if (!item.childrenUrl) return []
          const res = await fetchJson<THhCheckboxGroupItem[]>(item.childrenUrl)
          return mapToCheckboxItems(res)
        }}
      />
    </div>
  );
}