'use client'
import { cn } from "@/shared/lib/utils";
import { JOB_SUGGESTIONS } from "../lib/dictionary";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { useRef } from "react";
import { Search } from "lucide-react";

import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField";
type TProps = {
  className?: string
  onConfirm?: (value: string) => void
  onChange?: (value: string) => void
  initialValue?: string
  inputStyles?: string
}
export const SearchBar = ({
  className,
  onConfirm = () => { },
  onChange = () => { },
  initialValue,
  inputStyles
}: TProps) => {

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={cn('flex items-center gap-2 md:gap-5', '@container/search', className)}>
      <AutocompleteField
        defaultValue={initialValue}
        suggestionList={JOB_SUGGESTIONS}
        className={cn("px-5 py-3 rounded-lg placeholder:text-base [&:not(.ring-destructive)]:focus-visible:ring-accent2", inputStyles)}
        placeholder="Поиск вакансии"
        ref={ref}
        onEnterConfirm={(value, e) => {
          e.preventDefault();
          onConfirm(value)
        }}
        onChange={onChange}
      />

      <RekruCTA
        onClick={() => { onConfirm(ref.current?.value || '') }}
        type="submit"
        view="dark"
        className="text-lg px-3 @3xl/search:w-max @3xl/search:min-w-[234px]"
      >
        <Search className="@3xl/search:hidden" />
        <span className="hidden @3xl/search:inline">Найти вакансию</span>
      </RekruCTA>
    </div>
  );
}