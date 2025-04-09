import { useCompanies } from "@/shared/providers/CompaniesProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { extractNewPath } from "../lib/extractNewPath";

export const useCompanySwitcher = () => {
  const pathname = usePathname();

  //get companies from companies provider
  const { companiesList, activeCompany, findCompany, isFetching } =
    useCompanies();

  const router = useRouter();

  //delay for fetching list on search
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  const handleInput = (value: string) => {
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      findCompany({ name: value });
    }, 300);
  };

  const handleSelect = (value: string) =>
    router.push(
      extractNewPath(String(activeCompany?.id), value, pathname as string)
    );

  return {
    companiesList,
    activeCompany,
    isFetching,
    handleInput,
    handleSelect,
  };
};
