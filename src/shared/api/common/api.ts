"use server";

import { parseFormData } from "@/shared/lib/object_manipulations/parseFormData";
import { API_URL } from "../../constants/constants";

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

export const apiGet = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(API_URL + url, {
    method: "GET",
    cache: "no-store",
    // cache: "force-cache",
  });

  return response.json();
};

export const apiPost = async <T = unknown>(
  url: string,
  body: FormData
): Promise<T> => {
  // Parse a `FormData` object into a structured JavaScript object
  const parsedFormData = parseFormData(body);

  const response = await fetch(API_URL + url, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(parsedFormData),
    headers: {
      "Content-Type": "application/json",
    },
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
  body: FormData
): Promise<T> => {
  // Parse a `FormData` object into a structured JavaScript object
  const parsedFormData = parseFormData(body);

  const response = await fetch(API_URL + url, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify(parsedFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  //added this control because on 500 status data is withou "success" field
  if (response.status === 500) {
    return { success: false, ...data };
  }
  return data;
};
