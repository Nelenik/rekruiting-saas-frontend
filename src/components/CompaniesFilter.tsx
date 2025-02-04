'use client'

import FilterField from "./app_forms/form_elmts/FilterField";
import { Input } from "./ui/input";

const CompaniesFilter = () => {
  return (
    <FilterField paramName="search" render={({ value, onChange }) => (
      <Input value={value} onChange={onChange} placeholder="Поиск по компании" className="w-[min(100%,_400px)]" />
    )} />
  );
}

export default CompaniesFilter;