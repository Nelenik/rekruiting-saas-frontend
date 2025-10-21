'use client'
import { MultilevelCheckbox } from "./MultilevelCheckbox";
import { TCheckboxItem } from "./types";

type Props = {
  items: TCheckboxItem[]
}
export const Test = ({ items }: Props) => {
  return (
    <div>
      <MultilevelCheckbox
        name='roles[]'
        items={items}
      />
    </div>
  );
}