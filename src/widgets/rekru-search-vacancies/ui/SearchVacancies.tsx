'use client';
import { QueryFilterManager } from "@/features/manage-url-filters";
import { SearchBar } from "@/features/search-bar";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";

type TProps = {
  className?: string
}
export const SearchVacancies = ({
  className
}: TProps) => {
  return (
    <QueryFilterManager

      render={({ filters, updateFilter }) => (
        <div className={cn(
          'relative',
          className
        )}>
          <Search
            className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-4 stroke-accent2"
          />
          <SearchBar
            inputStyles="sm:pl-12"
            initialValue={filters['search'] as string || ''}
            onConfirm={(value: string) => {
              updateFilter({ 'search': value })
            }}
            onChange={(value) => {
              if (value.length === 0) {
                updateFilter({ 'search': '' })
              }
            }}
          />
        </div>
      )}
    />
  );
}