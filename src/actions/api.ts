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

/**
 * 
GET /api/v1/company - список компаний
GET /api/v1/company/123 - Компания по ид
GET /api/v1/cv - список резюме
GET /api/v1/cv/123 - резюме по ид
GET /api/v1/match/123 - мэтч по ид
PUT /api/v1/match/123 - редактирование статуса и баллов мэтча

 */
