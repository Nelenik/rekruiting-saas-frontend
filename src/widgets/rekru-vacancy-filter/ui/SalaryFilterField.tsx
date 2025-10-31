'use client'

import { Input } from "@/shared/ui/shadcn/input";
import { FilterBase } from "./FilterBase";
import { useEffect, useState } from "react";

type TProps = {
  defaultValues?: Record<string, string>
  updateCb?: (newValues: Record<string, string>) => void
}

const initValues = { salary_from: '', salary_to: '' }

export const SalaryFilterField = ({
  updateCb = () => { },
  defaultValues = {}
}: TProps) => {
  const [salaryFields, setSalaryFields] = useState(defaultValues)

  useEffect(() => {
    setSalaryFields(prev => ({ ...prev, ...defaultValues }))
  }, [defaultValues])

  const { salary_from, salary_to } = salaryFields

  return (
    <FilterBase
      triggerText="Доход"
      onSave={() => updateCb({ salary_from, salary_to })}
      onCancel={() => updateCb(initValues)}
    >
      <Input
        value={salary_from}
        onChange={(e) => {
          setSalaryFields(prev => ({ ...prev, salary_from: e.target.value }))
        }}
        placeholder="От"
      />

      <Input
        value={salary_to}
        onChange={(e) => {
          setSalaryFields(prev => ({ ...prev, salary_to: e.target.value }))
        }}
        placeholder="До"
      />

    </FilterBase>
  );
}