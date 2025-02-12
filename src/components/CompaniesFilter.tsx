'use client'

import FilterField from "./app_forms/form_elmts/FilterField";
import { Input } from "./ui/input";

const CompaniesFilter = () => {
  return (
    <FilterField paramName="name" render={({ value, onChange }) => (
      <Input value={value} onChange={onChange} placeholder="Поиск по компании" className="w-[clamp(200px,35%,400px)]" />
    )} />
  );
}

export default CompaniesFilter;