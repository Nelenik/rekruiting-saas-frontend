'use server';

import { API_URL } from '@/shared/config';

export const apiGet = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(API_URL + url, {
    method: 'GET',
  });

  return response.json();
};
