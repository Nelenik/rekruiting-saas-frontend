import {
  getObjectFromSearchParams,
  updateQueryString,
} from "@/shared/lib/updateQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, useCallback } from "react";

export const useQueryFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(
    () => (searchParams ? getObjectFromSearchParams(searchParams) : {}),
    [searchParams]
  );

  const [filters, setFilters] = useState(initialFilters);

  //reset filters when the pathname changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, pathname]);

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
  const updateFilter = useCallback(
    (filterValues: Record<string, string | string[]>) => {
      setFilters((prev) => ({ ...prev, ...filterValues }));
    },
    []
  );

  //Get query string without router navigation
  const getUpdatedQueryString = useCallback(
    (newFilters: Record<string, string | string[]>) => {
      const newQS = updateQueryString(searchParams, newFilters);
      return newQS;
    },
    [searchParams]
  );

  return { filters, updateFilter, getUpdatedQueryString };
};
