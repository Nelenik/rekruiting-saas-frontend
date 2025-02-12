'use client'
import FilterField from "./app_forms/form_elmts/FilterField";
import FormItem from "./app_forms/form_elmts/FormItem";
import { Input } from "./ui/input";

const ReserveFilter = () => {
  return (
    <div className="flex flex-wrap @3xl:flex-col gap-6">
      <FilterField paramName="spec" render={({ value, onChange }) => (
        <FormItem labelText="Специализация">
          <Input value={value} onChange={onChange} placeholder="Специализация" className="" />
        </FormItem>
      )} />
      <FilterField paramName="salary" render={({ value, onChange }) => (
        <FormItem labelText="Зарплата">
          <Input value={value} onChange={onChange} placeholder="Зарплата" className="" />
        </FormItem>
      )} />
      <FilterField paramName="location" render={({ value, onChange }) => (
        <FormItem labelText="География">
          <Input value={value} onChange={onChange} placeholder="География" className="" />
        </FormItem>
      )} />
    </div>
  );
}

export default ReserveFilter;