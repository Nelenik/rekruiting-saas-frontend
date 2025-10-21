export type TMultilevelCheckbox<T = TCheckboxItem> = {
  /**
   * The name attribute for the hidden form inputs.
   * Used when submitting the form to identify selected values.
   */
  name: string;
  /**
   * Array of hierarchical items to display as checkboxes.
   * Each item should have at minimum an `id` and `label` property.
   */
  items: T[];
  /**
   * Default selected IDs when using uncontrolled mode.
   * @default []
   */
  defaultValue?: string[];
  /**
   * Controlled selected IDs. When provided, the component becomes controlled.
   * Use with `onChange` to manage selection state externally.
   */
  value?: string[];
  /**
   * Callback fired when selection changes.
   * @param selectedIds - Array of selected item IDs
   */
  onChange?: (selectedIds: string[]) => void;
  /**
   * <<< COMING SOON >>>
   * Async function to load child items on demand.
   * Useful for large hierarchies where loading all data initially is impractical.
   * @param parentId - The ID of the parent item whose children should be loaded
   * @returns Promise resolving to array of child items
   * @default async () => []
   */
  onLoadChildren?: (item: T) => Promise<TCheckboxItem[]>;
  /**
   * Whether to include parent nodes in the selection output.
   * When true, selecting children will also include the parent ID.
   * @default false
   */
  includeParent?: boolean;
  // className?: string;
  styles?: {
    className?: string;
    checkboxesWrapClassName?: string;
    checkboxLabelClassName?: string;
    checkboxInputClassName?: string;
    collapsibleTriggerClassName?: string;
    collapsibleContentClassName?: string;
  };
};

export type TLazyCheckboxItem = {
  id: string;
  label: string;
  childrenUrl?: string; //url for lazy loading
};

export type TStaticCheckboxItem = {
  id: string;
  label: string;
  children?: TCheckboxItem[]; // Уже загруженные дети
};

export type TCheckboxItem = TStaticCheckboxItem | TLazyCheckboxItem;

// Type guards
export const isLazyItem = (item: TCheckboxItem): item is TLazyCheckboxItem => {
  return "childrenUrl" in item;
};
