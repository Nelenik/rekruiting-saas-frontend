"use server";

import { revalidatePath } from "next/cache";

import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "@/shared/helpers";

import { apiPost } from "./api";
import { TMutationState } from "./types";

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
  for (let i = 1; i <= 5; i++) {
    body.append("matchStatuses[]", `${i}`);
  }

  const result = await storeEntity("/vacancy", body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
  }
  return result;
};

const storeEntity = async (url: string, body: FormData) => {
  try {
    const response = await apiPost<boolean | TBadRequest>(url, body);
    if (response && typeof response === "object" && response.errorType) {
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      sent: true,
      error: getSyntheticError("Ошибка сохранения", 500),
      payload: body,
    };
  }

  return {
    sent: true,
    error: null,
  };
};
