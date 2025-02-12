import { ReadonlyURLSearchParams } from "next/navigation";

export function updateQueryString(
  currentSearchParams: ReadonlyURLSearchParams,
  paramName?: string,
  value?: string | number
) {
  const qs = new URLSearchParams(currentSearchParams);

  if (paramName) {
    if (value) {
      qs.set(paramName, decodeURIComponent(String(value)));
    } else {
      qs.delete(paramName);
    }
  }

  const pageValue = qs.get("page");
  qs.delete("page");

  const newQs = new URLSearchParams();
  if (pageValue) {
    newQs.set("page", pageValue);
  }

  for (const [key, val] of qs.entries()) {
    newQs.set(key, val);
  }

  return newQs.toString();
}
