"use server";

import { getUser } from "@/shared/api/getData";
import { TSession } from "@/shared/api/types";

export const getSession = async (): Promise<TSession> => {
  const user = await getUser();
  if (!user) {
    return {
      isAuthorized: false,
    };
  }
  return {
    isAuthorized: true,
    user,
  };
};
