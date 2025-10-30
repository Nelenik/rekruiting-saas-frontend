'use client'

import { FC, ReactNode } from "react";
import { useQueryFilters } from "../model/useQueryFilters";

type TProps = {
  render: (props: {
    updateFilter: (filterValues: Record<string, string>) => void
    filters: Record<string, string>
  }) => ReactNode
}

/**
 * A client-side component that manages URL-based filters using the Next.js `useSearchParams` hook.
 * It provides a render prop to expose the current filters and a function to update them.
 *
 * When the filters change, the component debounces updates to the URL query string.
 * If the route changes, the filters are reset to match the new URL query params.
 *
 * @component
 *
 * @param {string} [className] - Optional class name to apply to the outer container.
 * @param {(props: { updateFilter: (filterValues: Record<string, string>) => void; filters: Record<string, string> }) => ReactNode} render - A render function that receives the `filters` state and an `updateFilter` function to update them.
 *
 * @example
 * ```tsx
 * <Filters
 *   className="mb-4"
 *   render={({ filters, updateFilter }) => (
 *     <button onClick={() => updateFilter({ status: "active" })}>Set Active Filter</button>
 *   )}
 * />
 * ```
 */

export const QueryFilterManager: FC<TProps> = ({
  render
}) => {

  const { filters, updateFilter } = useQueryFilters()

  return (
    <>
      {render({
        updateFilter,
        filters,
      })}
    </>
  );
}
