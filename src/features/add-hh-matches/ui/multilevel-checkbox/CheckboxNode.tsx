'use client'

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
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

  // загрузка детей
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["multilevel_checkbox", item.id + item.childrenUrl],
    queryFn: () => onLoadChildren(item),
    enabled: !!item.childrenUrl && isOpen,
  });

  useEffect(() => {
    if (isSuccess) setChildren(data);
  }, [isSuccess, data]);

  // вычисляем состояния на основе selectedIds
  const childIds = children.map(c => c.id);
  const allChildrenSelected = childIds.length > 0 && childIds.every(id => selectedIds.has(id));
  const someChildrenSelected = childIds.some(id => selectedIds.has(id));

  const isChecked = hasChildren
    ? allChildrenSelected
    : selectedIds.has(item.id);

  // indeterminate для промежуточного состояния
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = hasChildren && someChildrenSelected && !allChildrenSelected;
    }
  }, [someChildrenSelected, allChildrenSelected, hasChildren]);

  // обработчик клика
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    console.log('checked', checked)
    const newSelected = new Set(selectedIds);

    const toggleIds = (items: TCheckboxItem[]) => {
      for (const checkboxItem of items) {
        if (checked) newSelected.add(checkboxItem.id);
        else newSelected.delete(checkboxItem.id);
        // if (checkboxItem.staticChildren) toggleIds(checkboxItem.staticChildren);
      }
    };

    if (hasChildren) {
      if (includeParent && checked) newSelected.add(item.id);
      if (includeParent && !checked) newSelected.delete(item.id);
      toggleIds(children);
    } else {
      if (checked) newSelected.add(item.id);
      else newSelected.delete(item.id);
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
            checked={isChecked}
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