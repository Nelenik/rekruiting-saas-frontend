export type TMultipleCheckbox<T = TCheckboxItem> = {
  // name for FormData , f.e "categories[]"
  name: string;
  items: T[];
  //selected default id
  defaultValue?: string[];
  // controlled value
  value?: string[];
  // cb on checkbox change
  onChange?: (selectedIds: string[]) => void;
  onLoadChildren?: (item: T) => Promise<TCheckboxItem[]>;
  includeParent?: boolean;
  className?: string;
};

export type TCheckboxItem = {
  id: string;
  label: string;
  staticChildren?: TCheckboxItem[]; //static children
  childrenUrl?: string; //url for lazy loading
};
