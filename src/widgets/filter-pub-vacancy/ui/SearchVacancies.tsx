'use client';
import { UrlFilterManager } from "@/features/manage-url-filters";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/shadcn/input";
import { Search, X } from "lucide-react";

type TProps = {
  className?: string
}
export const SearchVacancies = ({
  className
}: TProps) => {
  return (
    <UrlFilterManager
      className={cn(
        'relative',
        className
      )}
      render={({ filters, updateFilter }) => (
        <>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={28}
          />
          <Input
            value={filters['search'] || ''}
            onChange={(e) => {
              updateFilter({ 'search': e.target.value })
            }}
            placeholder="Поиск вакансий"
            className="w-full px-12 py-6" />

          <button
            type="button"
            aria-label="Очистить поиск"
            disabled={!filters['search']}
            className={cn(
              "absolute right-0 top-0 z-10 h-full aspect-square inline-block cursor-pointer",
            )}
            onClick={() => updateFilter({ 'search': '' })}
          >
            <X
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              size={28}
            />
          </button>
        </>
      )}
    />
  );
}