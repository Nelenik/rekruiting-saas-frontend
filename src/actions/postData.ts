'use server';

import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from '@/shared/helpers';

import { apiPost } from './api';
import { TMutationState } from './types';

export const storeCompany = async (_: TMutationState, body: FormData) =>
  storeEntity('/company', body);

export const storeCv = async (_: TMutationState, body: FormData) =>
  storeEntity('/cv', body);

export const storeVacancy = async (_: TMutationState, body: FormData) =>
  storeEntity('/vacancy', body);

const storeEntity = async (url: string, body: FormData) => {
  console.log({ body });
  try {
    const response = await apiPost<boolean | TBadRequest>(url, body);

    if (response && typeof response === 'object' && response.errorType) {
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      sent: true,
      error: getSyntheticError('Ошибка сохранения', 500),
    };
  }

  return {
    sent: true,
    error: null,
  };
};
