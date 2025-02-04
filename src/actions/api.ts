"use server";

import { API_URL } from "@/shared/config";

export const apiGet = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(API_URL + url, {
    cache: "force-cache",
    method: "GET",
  });

  return response.json();
};

export const apiPost = async <T = unknown>(
  url: string,
  body: FormData
): Promise<T> => {
  const response = await fetch(API_URL + url, {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(body)),
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
  const response = await fetch(API_URL + url, {
    method: "PUT",
    body: JSON.stringify(Object.fromEntries(body)),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
