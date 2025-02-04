"use server";

import {
  EMatchStatus,
  TApiListResponse,
  TApiSuccessResponse,
  TCandidateShort,
  TTariff,
  TVacancy,
  TVacancyShort,
} from "@/shared/types";

import { apiGet } from "./api";
import { IUser } from "@/shared/types/user";
import { mockCompanies, mockResume } from "./mockData";
import { filterFalsyFields } from "@/lib/utils/filterFalsyFields";
import { TCompany } from "@/shared/types/companies";

/*--------Mock data---------- */
export const getUser = async (): Promise<IUser> => {
  return {
    id: 1,
    name: "Иванов Иван",
    email: "test@mail.com",
  };
};

export const getCompaniesList = async (
  filters: Record<string, string> = {}
): Promise<TCompany[]> => {
  const filterString = filters
    ? new URLSearchParams(filterFalsyFields(filters)).toString()
    : "";

  console.log(filterString);
  return mockCompanies;
  // return [];
};

export const getResumeList = async () => {
  return mockResume;
};

/*--------------------- */

export const getVacanciesList = async ({
  companyId,
}: { companyId?: number | string } = {}): Promise<TVacancyShort[]> => {
  try {
    const qs = new URLSearchParams();
    if (companyId) {
      qs.append("company", String(companyId));
    }
    const response = await apiGet<TApiListResponse<TVacancyShort>>(
      "/vacancy?" + qs.toString()
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить вакансии. Пожалуйста, попробуйте позже."
    );
  }
};

// export const getVacanciesList = async (): Promise<TVacancyShort[]> => {
//   try {
//     const response = await apiGet<TApiListResponse<TVacancyShort>>("/vacancy");

//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       "Не удалось загрузить вакансии. Пожалуйста, попробуйте позже."
//     );
//   }
// };

export const getVacancy = async (id: number | string): Promise<TVacancy> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TVacancy>>(
      `/vacancy/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить вакансию. Пожалуйста, попробуйте позже."
    );
  }
};

export const getVacancyPositions = async (): Promise<string[]> => {
  try {
    const response = await apiGet<TApiListResponse<string>>(
      "/vacancy/positions"
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить позиции. Пожалуйста, попробуйте позже."
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
      "Не удалось загрузить кандидатов. Пожалуйста, попробуйте позже."
    );
  }
};

export const getTariffs = async (): Promise<TTariff[]> => {
  try {
    const response = await apiGet<TApiListResponse<TTariff>>("/tariffs");

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить тарифы. Пожалуйста, попробуйте позже."
    );
  }
};
