"use server";
import { revalidatePath } from "next/cache";
import { updateEntity } from "./common/mutate";
import { TMutationState } from "./common/types";
import { parseFormData } from "../lib/object_manipulations/parseFormData";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await updateEntity(`/vacancy/${vacancyId}`, body);
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
    revalidatePath("/dashboard/[companyId]/vacancies/[vacancyId]", "layout");
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
  _: TMutationState | null,
  body: FormData
) => {
  const result = await updateEntity(`/status/${statusId}`, body);
  if (!result.error) {
    return { ...result, payload: parseFormData(body) };
  }
  return result;
};
