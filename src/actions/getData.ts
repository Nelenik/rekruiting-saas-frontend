'use server';

import {
  EMatchStatus,
  TApiListResponse,
  TApiSuccessResponse,
  TCandidateShort,
  TVacancy,
  TVacancyShort,
} from '@/shared/types';

import { apiGet } from './getRecords';

export const getVacanciesList = async (): Promise<TVacancyShort[]> => {
  try {
    const response = await apiGet<TApiListResponse<TVacancyShort>>('/vacancy');

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Не удалось загрузить вакансии. Пожалуйста, попробуйте позже.'
    );
  }
};

export const getVacancy = async (id: number | string): Promise<TVacancy> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TVacancy>>(
      `/vacancy/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Не удалось загрузить вакансию. Пожалуйста, попробуйте позже.'
    );
  }
};

export const getBasicCandidatesByStatus = async (
  vacId: number,
  status: EMatchStatus
): Promise<TCandidateShort[]> => {
  try {
    const response = await apiGet<TApiListResponse<TCandidateShort>>(
      `/match/candidates?vacancy_id=${vacId}&status=${status}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Не удалось загрузить кандидатов. Пожалуйста, попробуйте позже.'
    );
  }
};
