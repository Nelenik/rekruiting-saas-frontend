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
  _: TMutationState,
  body: FormData
) => {
  console.log("update");

  const result = updateEntity(`/vacancy/${vacancyId}`, body);
  // revalidatePath("/dashboard/[companyId]/vacancies/*");
  return result;
};

const updateEntity = async (url: string, body: FormData) => {
  console.log(Object.fromEntries(body));
  try {
    const response = await apiPut<boolean | TBadRequest>(url, body);
    console.log("update.resp", response);
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
  // return {
  //   sent: true,
  //   error: null,
  // };
};
