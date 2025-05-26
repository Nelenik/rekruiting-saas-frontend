"use server";

import { mutateAction } from "@/shared/api/common/mutate";
import { TMutationState } from "@/shared/api/common/types";
import { AUTH_COOKIE_NAME } from "@/shared/api/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TAuthData = {
  token: string;
};

const setCookie = async (token: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, //a week
  });
};

export const signin = async (
  redirectTo: string | null,
  _: TMutationState,
  body: FormData
) => {
  const response = await mutateAction<TAuthData>("/auth/sign-in", {
    body,
    withAuth: false,
    enableResponseData: true,
  });
  if (response.sent && !response.error) {
    const { payload } = response;
    const token = payload?.token;
    if (token) {
      await setCookie(token);
      return redirect(redirectTo ?? "/dashboard");
    }
  }
  return response;
};

export const signout = async () => {
  (await cookies()).delete(AUTH_COOKIE_NAME);
  return redirect("/");
};
