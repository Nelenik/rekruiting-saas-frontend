"use server";

import { cookies } from "next/headers";

export const getTenat = async () => {
  const cookieStore = await cookies();
  const tenat = cookieStore.get("origin-host")?.value;
  return tenat || "";
};
