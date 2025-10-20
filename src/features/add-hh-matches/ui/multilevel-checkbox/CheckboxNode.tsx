'use client'

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from "react";
import { useCheckbox } from "./CheckboxProvider";
import { TCheckboxItem } from "./types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/shadcn/collapsible";
import { Input } from "@/shared/ui/shadcn/input";

import { ChevronUp, ChevronDown } from "lucide-react";
import SvgLoader2 from '@/assets/icons/spinner2.svg?rc'

type TProps = {
  item: TCheckboxItem
}

export const CheckboxNode = memo(function CheckboxNode({
  item
}: TProps) {

  const {
    selectedIds,
    onSelectionChange,
    onLoadChildren,
    includeParent
  } = useCheckbox()


  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<TCheckboxItem[]>(item.staticChildren || []);

  const hasChildren = !!item.childrenUrl || !!item.staticChildren?.length;
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Memoize child IDs
  const childIds = children.map(c => c.id)
  // Calculate selection states
  const allChildrenSelected = childIds.length > 0 && childIds.every(id => selectedIds.has(id));
  const someChildrenSelected = childIds.some(id => selectedIds.has(id));

  //Calculate parentIsSelected for choise logic
  const parentIsSelected = useMemo(() => {
    const virtualId = `__virtual__${item.id}`
    return includeParent
      ? selectedIds.has(item.id)
      : selectedIds.has(virtualId)
  }, [includeParent, item.id, selectedIds])

  // Calculate isParentChecked for the parent checkbox in the UI
  const isParentChecked = useMemo(() => {
    if (!hasChildren) return selectedIds.has(item.id)
    if (children.length) return allChildrenSelected && someChildrenSelected
    return parentIsSelected
  }, [allChildrenSelected, children.length, hasChildren, item.id, parentIsSelected, selectedIds, someChildrenSelected])

  // Load children with error handling
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["multilevel_checkbox", item.id + item.childrenUrl],
    queryFn: () => onLoadChildren(item),
    enabled: !!item.childrenUrl && isOpen,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update children when data loads
  useEffect(() => {
    if (isSuccess && data) {
      setChildren(data)
    };
  }, [isSuccess, data]);

  // Auto-select children when parent is checked (only once on load)
  // this ref is used to avoid exceed callstack 
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (parentIsSelected && children.length && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const newSelected = new Set(selectedIds)
      children.forEach(c => newSelected.add(c.id));
      onSelectionChange(newSelected)
    }
  }, [children, parentIsSelected, onSelectionChange, selectedIds])

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = hasChildren && someChildrenSelected && !allChildrenSelected;
    }
  }, [someChildrenSelected, allChildrenSelected, hasChildren]);

  // обработчик клика
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelected = new Set(selectedIds);

    const virtualId = `__virtual__${item.id}`

    // Toggle children
    children.forEach(c => {
      if (checked) newSelected.add(c.id);
      else newSelected.delete(c.id);
    });

    if ((hasChildren && includeParent) || !hasChildren) {
      if (checked) newSelected.add(item.id);
      else newSelected.delete(item.id);
    } else if (hasChildren && !includeParent) {
      if (checked) newSelected.add(virtualId);
      else newSelected.delete(virtualId)
    }

    onSelectionChange(newSelected);
  };


  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        className="flex "
      >
        {hasChildren && <CollapsibleTrigger
          className="shrink-0 py-3 flex items-center gap-2 text-base text-secondary-foreground"
        >
          {isOpen
            ? <ChevronUp />
            : <ChevronDown />}

        </CollapsibleTrigger>}
        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            value={item.id}
            checked={isParentChecked}
            onChange={handleChange}
            ref={checkboxRef}
            className="inline w-5 h-5 accent-primary"
          />
          <span>{item.label}</span>
        </label>
      </div>
      {hasChildren && <CollapsibleContent>
        {isLoading && <SvgLoader2 />}
        {children.map(child => (
          <CheckboxNode
            key={child.id}
            item={child}
          />
        ))}
      </CollapsibleContent>}
    </Collapsible>)
})