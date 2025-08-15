import { useCallback, useEffect } from "react";
import { YandexMetrikaHitOptions, YandexMetrikaMethod } from "./types";
import { usePathname } from "next/navigation";

const enabled =
  typeof window !== "undefined" && process.env.NODE_ENV === "production";

declare const ym: (
  id: number,
  method: YandexMetrikaMethod,
  ...params: unknown[]
) => void;

export const useYandexMetrika = (id: number) => {
  const pathname = usePathname();
  const hit = useCallback(
    (url?: string, options?: YandexMetrikaHitOptions) => {
      if (enabled) {
        ym(id, "hit", url, options);
      }
    },
    [id]
  );

  useEffect(() => {
    if (pathname) {
      hit(pathname);
    }
  }, [hit, pathname]);
};
