'use server';

import {
  EMatchStatus,
  TApiListResponse,
  TApiSuccessResponse,
  TCandidateShort,
  TTariff,
  TVacancy,
  TVacancyShort,
} from '@/shared/types';

import { apiGet } from './api';

export const getVacanciesList = async ({
  companyId,
}: { companyId?: number } = {}): Promise<TVacancyShort[]> => {
  try {
    const qs = new URLSearchParams();
    if (companyId) {
      qs.append('company', String(companyId));
    }
    const response = await apiGet<TApiListResponse<TVacancyShort>>(
      '/vacancy?' + qs.toString()
    );

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

export const getVacancyPositions = async (): Promise<string[]> => {
  try {
    const response = await apiGet<TApiListResponse<string>>(
      '/vacancy/positions'
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Не удалось загрузить позиции. Пожалуйста, попробуйте позже.'
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

export const getTariffs = async (): Promise<TTariff[]> => {
  try {
    const response = await apiGet<TApiListResponse<TTariff>>('/tariffs');

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Не удалось загрузить тарифы. Пожалуйста, попробуйте позже.'
    );
  }
};
