'use client'

import { UrlFilterManager } from "@/features/manage-url-filters";
import { Input } from "@/shared/ui/shadcn/input";


export const CompaniesFilter = () => {
  return (
    <UrlFilterManager
      render={({ filters, updateFilter }) => (
        <Input
          value={filters['name'] || ''}
          onChange={(e) => {
            updateFilter({ 'name': e.target.value })
          }}
          placeholder="Поиск по компании"
          className="w-[clamp(200px,35%,400px)]" />
      )}
    />
  )
}

