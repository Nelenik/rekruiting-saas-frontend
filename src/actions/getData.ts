"use server";

import {
  EMatchStatus,
  TApiListResponse,
  TApiSuccessResponse,
  TCandidateFull,
  TCandidateShort,
  TMatchStatus,
  TTariff,
  TVacancy,
  TVacancyShort,
} from "@/shared/types";

import { apiGet } from "./api";
import { IUser } from "@/shared/types/user";
import { mockCandidateShort, mockMatchInfo } from "./mockData";
import { filterFalsyFields } from "@/lib/utils/filterFalsyFields";
import { TCompany } from "@/shared/types/companies";
import { TResume } from "@/shared/types/resume";
import { z } from "zod";
import {
  SVacancy,
  SVacancyList,
  SVacancyShort,
} from "@/shared/schemas/vacancies";
import { wait } from "@/lib/utils/wait";

/* USER */
/*----Needs to be redone with real data.--- */
export const getUser = async (): Promise<IUser> => {
  return {
    id: 1,
    name: "Демьянов Илья",
    email: "test@mail.com",
  };
};

/* COMPANY */
export const getCompaniesList = async (
  filters: Record<string, string> = {}
) => {
  try {
    const filterString = new URLSearchParams(
      filterFalsyFields(filters)
    ).toString();
    const response = await apiGet<TApiListResponse<TCompany>>(
      "/company?" + filterString
    );
    return {
      data: response.data,
      total: response.total,
      currentPage: response.page,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить список компаний. Пожалуйста, попробуйте позже."
    );
  }
};

export const getCompany = async (id: number | string) => {
  try {
    const response = await apiGet<TApiSuccessResponse<TCompany>>(
      `/company/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить компанию. Пожалуйста, попробуйте позже."
    );
  }
};

/* RESUME */
export const getResumeList = async (filters: Record<string, string> = {}) => {
  try {
    const filterString = new URLSearchParams(
      filterFalsyFields(filters)
    ).toString();
    const response = await apiGet<TApiListResponse<TResume>>(
      "/cv?" + filterString
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить список компаний. Пожалуйста, попробуйте позже."
    );
  }
};

/*VACANCY */
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

    return SVacancyList.parse(response.data);
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить вакансии. Пожалуйста, попробуйте позже."
    );
  }
};

export const getVacancy = async (id: number | string): Promise<TVacancy> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TVacancy>>(
      `/vacancy/${id}`
    );

    return SVacancy.parse(response.data);
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

/* CANDIDATE MATCH */

export const getMatchStatuses = async () => {
  try {
    const response = await apiGet<TApiListResponse<TMatchStatus>>(
      `/match/statuses`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Не удалось загрузить статусы мэтчей. Пожалуйста, попробуйте позже."
    );
  }
};

export const getBasicCandidatesByStatus = async (
  vacId: number | string,
  status: string
): Promise<TCandidateShort[]> => {
  // return wait(9000).then(() => mockCandidateShort[status] || []);
  try {
    const response = await apiGet<TApiListResponse<TCandidateShort>>(
      `/match/candidates?vacancy_id=${vacId}&status=${status}`
    );
    console.log("candidate", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить кандидатов. Пожалуйста, попробуйте позже."
    );
  }
};

export const getCandidateFull = async (matchId: number) => {
  // return mockMatchInfo;
  try {
    const response = await apiGet<TApiSuccessResponse<TCandidateFull>>(
      `/match/${matchId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      "Не удалось загрузить информацию о кандидате. Пожалуйста, попробуйте позже."
    );
  }
};

/* TARIFFS */
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
