"use server";

import { parseFormData } from "@/lib/utils/parseFormData";
import { API_URL } from "@/shared/config";

export const apiGet = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(API_URL + url, {
    method: "GET",
    cache: "force-cache",
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
    body: JSON.stringify(parsedFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const apiPut = async <T = unknown>(
  url: string,
  body: FormData
): Promise<T> => {
  // Parse a `FormData` object into a structured JavaScript object
  const parsedFormData = parseFormData(body);

  const response = await fetch(API_URL + url, {
    method: "PUT",
    body: JSON.stringify(parsedFormData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
