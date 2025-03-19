'use client'
import FilterField from "./filters_elmts/FilterField";
import FormItem from "../app_forms/form_elmts/FormItem";
import { Input } from "../ui/input";

const ReserveFilter = () => {
  return (
    <div className="flex flex-wrap @3xl:flex-col gap-6">
      <FilterField paramName="position" render={({ value, onChange }) => (
        <FormItem labelText="Специализация">
          <Input value={value} onChange={onChange} placeholder="Специализация" className="" />
        </FormItem>
      )} />
      <FilterField paramName="salary_from" render={({ value, onChange }) => (
        <FormItem labelText="Зарплата от">
          <Input value={value} onChange={onChange} placeholder="Зарплата от" className="" />
        </FormItem>
      )} />
      <FilterField paramName="salary_to" render={({ value, onChange }) => (
        <FormItem labelText="Зарплата до">
          <Input value={value} onChange={onChange} placeholder="Зарплата до" className="" />
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