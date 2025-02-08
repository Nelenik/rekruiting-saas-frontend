"use server";
import { revalidatePath } from "next/cache";
import { TMutationState } from "./types";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "@/shared/helpers";
import { apiPut } from "./api";
import { mockMatchInfo } from "./mockData";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState,
  body: FormData
) => {
  const result = await updateEntity(`/vacancy/${vacancyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies/*", "layout");
  }
  return result;
};

export const updateCompany = async (
  companyId: number | string,
  _: TMutationState,
  body: FormData
) => {
  console.log("compayId", companyId);
  console.log(Object.fromEntries(body));
  const result = await updateEntity(`/company/${companyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/companies/*", "layout");
  }
  return result;
};

export const updateCV = async (
  cvId: number | string,
  _: TMutationState,
  body: FormData
) => updateEntity(`cv/${cvId}`, body);

//Full entity update (PUT request)
const updateEntity = async (url: string, body: FormData) => {
  console.log(Object.fromEntries(body));
  try {
    const response = await apiPut<boolean | TBadRequest>(url, body);
    console.log("update resp", response);
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

export const updateMatch = async (_: TMutationState, body: FormData) => {
  console.log(Object.fromEntries(body));
  return {
    sent: true,
    error: null,
    payload: body,
  };
};
