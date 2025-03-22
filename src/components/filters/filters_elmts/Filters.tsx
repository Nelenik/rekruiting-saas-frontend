'use client'

import { cn } from "@/lib/utils";
import { updateQueryString } from "@/shared/helpers/updateQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

type TProps = {
  className?: string
  render: (props: {
    updateFilter: (filterValues: Record<string, string>) => void
    filters: Record<string, string>
  }) => ReactNode
}

const Filters: FC<TProps> = ({
  className,
  render
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])

  const [filters, setFilters] = useState(initialFilters);

  // Debounce to update url
  useEffect(() => {

    const handler = setTimeout(() => {
      const newQS = updateQueryString(searchParams, filters);
      console.log('qs', newQS)
      router.push(`${pathname}?${newQS}`);
    }, 300);

    return () => clearTimeout(handler);
  }, [filters, pathname, router, searchParams]);

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

export default Filters;