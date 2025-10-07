'use client'
import { cn } from "@/shared/lib/utils";
import { AutocompleteField } from "@/shared/ui/form-elements/AutocompleteField";
import { JOB_SUGGESTIONS } from "../lib/dictionary";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type TProps = {
  className?: string
}
export const SearchBar = ({
  className
}: TProps) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null)

  const handleConfirm = (value: string) => {
    if (!value) return
    router.push(`/vacancies?search=${encodeURIComponent(value)}`);
  }
  return (
    <div className={cn('flex items-center gap-5', className)}>
      <AutocompleteField
        suggestionsList={JOB_SUGGESTIONS}
        className="px-5 py-3 rounded-lg placeholder:text-base [&:not(.ring-destructive)]:focus-visible:ring-accent2"
        placeholder="Поиск вакансии"
        ref={ref}
        onEnterConfirm={(value, e) => {
          e.preventDefault();
          console.log('onEnter')
          handleConfirm(value)
        }}
      />
      <RekruCTA
        onClick={() => { handleConfirm(ref.current?.value || '') }}
        type="submit"
        view="dark"
        className="text-lg min-w-[234px]"
      >
        Найти вакансию
      </RekruCTA>
    </div>
  );
}