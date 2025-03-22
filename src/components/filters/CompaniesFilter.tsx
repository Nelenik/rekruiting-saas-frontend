'use client'

import { Input } from "../ui/input";
import Filters from "./filters_elmts/Filters";

const CompaniesFilter = () => {
  return (
    <Filters
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

export default CompaniesFilter;
