"use server";

import { parseFormData } from "@/shared/lib/object_manipulations/parseFormData";
import { API_URL, AUTH_COOKIE_NAME } from "../constants";
import { cookies } from "next/headers";

export type TApiSuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type TApiListResponse<T> = {
  success?: boolean;
  data: T[];
  take?: number;
  page?: number;
  total?: number;
};

//Get access token from the cookies and form authorization header for secure
const getAuthHeader = async (): Promise<HeadersInit> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(AUTH_COOKIE_NAME);
  return token ? { Authorization: `Bearer ${token.value}` } : {};
};

export const apiGet = async <T = unknown>(
  url: string,
  withAuth = true
): Promise<T> => {
  const headers: HeadersInit = withAuth ? await getAuthHeader() : {};
  const response = await fetch(API_URL + url, {
    method: "GET",
    cache: "no-store",
    headers,
    // cache: "force-cache",
  });

  if (!response.ok) {
    const error = new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`
    );
    error.name = "APIError";
    error.cause = response.status;
    throw error;
  }
  return response.json();
};

export const apiPost = async <T = unknown>(
  url: string,
  body: FormData,
  withAuth = true
): Promise<T> => {
  // Parse a `FormData` object into a structured JavaScript object
  const parsedFormData = parseFormData(body);

  const headers = {
    "Content-Type": "application/json",
    ...(withAuth && (await getAuthHeader())),
  };

  const response = await fetch(API_URL + url, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(parsedFormData),
    headers,
  });
  const data = await response.json();
  //added this control because on 500 status data is withou "success" field
  if (response.status === 500) {
    return { success: false, ...data };
  }
  return data;
};

export const apiPut = async <T = unknown>(
  url: string,
  body: FormData,
  withAuth = true
): Promise<T> => {
  // Parse a `FormData` object into a structured JavaScript object
  const parsedFormData = parseFormData(body);

  const headers = {
    "Content-Type": "application/json",
    ...(withAuth && (await getAuthHeader())),
  };

  const response = await fetch(API_URL + url, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(parsedFormData),
    headers,
  });
  const data = await response.json();

  //added this control because on 500 status data is withou "success" field
  if (response.status === 500) {
    return { success: false, ...data };
  }
  return data;
};
