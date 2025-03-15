"use server";
import { revalidatePath } from "next/cache";
import { TMutationState } from "./types";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "@/shared/helpers";
import { apiPut } from "./api";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await updateEntity(`/vacancy/${vacancyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
    revalidatePath("/dashboard/[companyId]/vacancy-info/[vacancyId]", "page");
  }
  return result;
};

export const updateCompany = async (
  companyId: number | string,
  _: TMutationState,
  body: FormData
) => {
  const result = await updateEntity(`/company/${companyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]", "page");
  }
  return result;
};

export const updateCV = async (
  cvId: number | string,
  _: TMutationState,
  body: FormData
) => {
  const result = await updateEntity(`/cv/${cvId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/reserve", "page");
  }
  return result;
};

export const updateMatch = async (
  matchId: number | string,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await updateEntity(`/match/${matchId}`, body);
  if (!result.error) {
    revalidatePath(
      "/dashboard/[companyId]/candidate-info/[candidateId]",
      "page"
    );
  }
  return result;
};

export const updateStatus = async (
  statusId: string | number,
  body: FormData
) => {
  const result = await updateEntity(`/status/${statusId}`, body);
  return result;
};

//Full entity update (PUT request)
const updateEntity = async (url: string, body: FormData) => {
  try {
    const response = await apiPut<boolean | TBadRequest>(url, body);
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
