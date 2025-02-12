'use client'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../../ui/input";
import { ChangeEvent, FC, HTMLAttributes, InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import { updateQueryString } from "@/shared/helpers/updateQueryString";

type TFormElems = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type TProps = {
  paramName: string,
  render: (props: InputHTMLAttributes<TFormElems>) => ReactNode
}

/**
 * `FilterInput` is a reusable component for filtering data using a query parameter in the URL.
 * It updates the URL query string when the input value changes.
 *
 * @component
 * @param {string} paramName - The name of the query parameter to update.
 * @param {(props: { value: string; onChange: (e: ChangeEvent<TFormElems>) => void }) => JSX.Element} render - A render prop that provides input state and change handler.
 *
 * @example
 * ```tsx
 * <FilterInput
 *   paramName="search"
 *   render={({ value, onChange }) => (
 *     <input type="text" value={value} onChange={onChange} placeholder="Search..." />
 *   )}
 * />
 * ```
 *
 * ⚠️ **This component should be used inside a client component.**
 * Ensure that it is placed inside a component marked with `"use client"` to avoid hydration errors.
 */



const FilterInput: FC<TProps> = ({
  paramName,
  render
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState('')

  //use ref for debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: ChangeEvent<TFormElems>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    setValue(e.target.value)

    debounceRef.current = setTimeout(() => {
      const newQS = updateQueryString(searchParams, paramName, e.target.value)
      router.push(`${pathname}?${newQS}`)
    }, 300)
  }

  return <>{render({ value, onChange: handleChange })}</>
}

export default FilterInput;