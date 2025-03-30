"use server";

import { revalidatePath } from "next/cache";

import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "@/shared/helpers";

import { apiPost } from "./api";
import { TMutationState } from "./types";
import { DEFAULT_MATCH_STATUSES } from "@/shared/dictionaries/constants";
import convertToFormData from "@/lib/utils/convertToFormData";
import { TStatus } from "@/shared/types/statuses";
import { TComment } from "@/shared/types/comments";

export const storeCompany = async (_: TMutationState, body: FormData) => {
  const result = await storeEntity("/company", body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]", "layout");
  }
  return result;
};

export const storeCv = async (_: TMutationState, body: FormData) => {
  const result = await storeEntity("/cv", body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/reserve", "page");
  }
  return result;
};

export const storeVacancy = async (_: TMutationState, body: FormData) => {
  const newVacancyStatuses = DEFAULT_MATCH_STATUSES.map((el) =>
    storeStatus(null, convertToFormData(el))
  );

  //Create default statuses for the vacancy. If unsuccessful, return the vacancy body to avoid resetting the form.
  const statuses = await Promise.all(newVacancyStatuses);
  const hasError = statuses.some((result) => result.error);
  if (hasError) {
    return {
      sent: true,
      error: getSyntheticError("Ошибка при создании статусов для вакансии"),
      payload: body,
    };
  }

  // If successful, append status IDs to the form data and save vacancy. The status_id = 1 (Скрининг) is temporarily unchangeable, as all the generated matches are linked to it
  body.append("matchStatuses[]", `1`);

  statuses.forEach((item) => {
    if (item.payload && "id" in item.payload) {
      body.append("matchStatuses[]", `${item.payload.id}`);
    }
  });

  const result = await storeEntity("/vacancy", body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
    revalidatePath("/dashboard/[companyId]/vacancies/[vacancyId]", "layout");
    revalidatePath("/dashboard/[companyId]/vacancy-info/[vacancyId]", "page");
  }
  return result;
};

export const storeStatus = async (
  _: TMutationState | null,
  body: FormData
): Promise<TMutationState<TStatus>> => {
  const result = await storeEntity<TStatus>("/status", body, true);
  return result;
};

export const storeMatchComment = async (
  matchId: string | number,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await storeEntity<TComment>(`/match/${matchId}/comment`, body);
  return result;
};

/* STORE ENTITY */

const storeEntity = async <T = unknown>(
  url: string,
  body: FormData,
  enableResData: boolean = false
) => {
  try {
    type TGoodRequest = {
      success: boolean;
      data: T;
    };
    const response = await apiPost<TGoodRequest | TBadRequest>(url, body);
    console.log("storeEntity respons", response);

    if (response && "errorType" in response) {
      //Returns in payload previously entered data to prevent form reset.
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
      };
    }
    if (response && enableResData) {
      return {
        sent: true,
        payload: response.data as T,
        error: null,
      };
    }

    return {
      sent: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    console.log("works error", error);
    return {
      sent: true,
      error: getSyntheticError("Ошибка сохранения", 500),
      payload: body,
    };
  }

  // return {
  //   sent: true,
  //   error: null,
  // };
};
