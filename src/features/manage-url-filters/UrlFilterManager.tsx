'use client'

import { updateQueryString } from "@/shared/lib/updateQueryString";
import { cn } from "@/shared/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

type TProps = {
  className?: string
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

export const UrlFilterManager: FC<TProps> = ({
  className,
  render
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => searchParams ? Object.fromEntries(searchParams.entries()) : {}, [searchParams])

  const [filters, setFilters] = useState(initialFilters);

  //reset filters when the pathname changes
  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters, pathname])

  // Debounce to update url
  useEffect(() => {

    //If the filters didn't change, stop the effect, added to avoid side effects when is used intercepting modal
    if (JSON.stringify(filters) === JSON.stringify(initialFilters)) {
      return;
    }

    const handler = setTimeout(() => {
      if (searchParams) {
        const newQS = updateQueryString(searchParams, filters);
        router.replace(`${pathname}?${newQS}`, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [filters, initialFilters, pathname, router, searchParams]);

  //Update filter function
  const updateFilter = useCallback((filterValues: Record<string, string>) => {
    setFilters((prev) => ({ ...prev, ...filterValues }));
  }, []);

  return (
    <div className={cn(className)}>
      {render({
        updateFilter,
        filters,
      })}
    </div>
  );
}
