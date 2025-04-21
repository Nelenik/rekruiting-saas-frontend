"use server";
import { revalidatePath } from "next/cache";
import { mutateAction } from "./common/mutate";
import { TMutationState } from "./common/types";
import { parseFormData } from "../lib/object_manipulations/parseFormData";

export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState | null,
  body: FormData
) => {
  const result = await mutateAction(`/vacancy/${vacancyId}`, body, {
    method: "PUT",
  });
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
  const result = await mutateAction(`/company/${companyId}`, body, {
    method: "PUT",
  });
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
  console.log("updatevacancy");
  const result = await mutateAction(`/cv/${cvId}`, body, { method: "PUT" });
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
  const result = await mutateAction(`/match/${matchId}`, body, {
    method: "PUT",
  });
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
  const result = await mutateAction(`/status/${statusId}`, body, {
    method: "PUT",
  });
  if (!result.error) {
    return { ...result, payload: parseFormData(body) };
  }
  return result;
};
