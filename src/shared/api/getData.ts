"use server";

import { TUser } from "@/shared/api/types/user";
import { TCompany } from "@/shared/api/types/companies";
import { TResume } from "@/shared/api/types/resume";
import { TStatus } from "@/shared/api/types/statuses";
import { TComment } from "@/shared/api/types/comments";
import { apiGet, TApiListResponse, TApiSuccessResponse } from "./common/api";
import { filterFalsyFields } from "../lib/object_manipulations/filterFalsyFields";
import { TCandidateFull, TCandidateShort } from "./types/match";
import { TVacancy, TVacancyShort } from "./types/vacancies";
import { TTariff } from "./types/tariffs";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "../constants/constants";

/* USER */

/*----Needs to be redone with real data.--- */

export const getUser = async (): Promise<TUser | null> => {
  try {
    //temp
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME);
    if (!token) throw new Error("token not found");

    //fetch user
    return {
      id: 1,
      name: "Гость",
      email: "user@mail.com",
      profile_image: "",
    };
  } catch {
    return null;
  }
};

/*******COMPANY*******/
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

/******RESUME******/
export const getResumeList = async (filters: Record<string, string> = {}) => {
  try {
    const filterString = new URLSearchParams(
      filterFalsyFields(filters)
    ).toString();
    const response = await apiGet<TApiListResponse<TResume>>(
      "/cv?" + filterString
    );
    return {
      data: response.data,
      total: response.total,
      currentPage: response.page,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить резервный список. Пожалуйста, попробуйте позже."
    );
  }
};

export const getResumeById = async (id: number | string): Promise<TResume> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TResume>>(`/cv/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить резюме. Пожалуйста, попробуйте позже."
    );
  }
};

/******VACANCY******/
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
    // return SVacancyList.parse(response.data);
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
    return response.data;
    // return SVacancy.parse(response.data);
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

/******CANDIDATE MATCH******/

export const getBasicCandidatesByStatus = async (
  vacId: number | string,
  statusId: number | string
): Promise<TCandidateShort[]> => {
  try {
    const response = await apiGet<TApiListResponse<TCandidateShort>>(
      `/match/candidates?vacancy_id=${vacId}&status_id=${statusId}`
    );
    return response.data.toSorted((a, b) => a.id - b.id);
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
    console.error(error);
    throw new Error(
      "Не удалось загрузить информацию о кандидате. Пожалуйста, попробуйте позже."
    );
  }
};

/******TARIFFS******/
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

/******STATUSES******/
export const getStatuses = async () => {
  try {
    const response = await apiGet<TApiListResponse<TStatus>>(`/status`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить статусы. Пожалуйста, попробуйте позже."
    );
  }
};

/*******COMMENTS FOR MATCH******/
export const getMatchCommentList = async (
  matchId: number | string,
  page: number
) => {
  try {
    const response = await apiGet<TApiListResponse<TComment>>(
      `/match/${matchId}/comment?page=${page}`
    );
    return {
      data: response.data,
      total: response.total,
      currentPage: response.page,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить комментарии к мэтчу. Пожалуйста, попробуйте позже."
    );
  }
};
