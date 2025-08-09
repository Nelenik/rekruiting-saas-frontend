"use server";

import { filterFalsyFields } from "@/shared/lib/object_manipulations/filterFalsyFields";
import {
  apiGet,
  apiMutate,
  TApiListResponse,
  TApiSuccessResponse,
  TMutationState,
} from "../common/api";
import { TCompany, TFilterCompanies } from "../types";
import { revalidatePath } from "next/cache";
import { parseFormData } from "../common/utils";

/**
 * getCompaniesList - Fetches a list of companies with optional filters.
 * @param filters -Filters to apply when fetching the list of companies.
 * The filters should be in the format of an object where keys are filter names and values are filter values.
 * @returns A promise that resolves to an object containing the list of companies, total count, and current page.
 * @throws An error if the request fails or if the list cannot be retrieved.
 */
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
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить список компаний. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 *  getCompany - Fetches a single company by its ID.
 * @param id - company ID to fetch.
 * The ID can be a number or a string, depending on how the API is designed.
 * @returns A promise that resolves to the company data.
 * @throws An error if the request fails or if the company cannot be found.
 */

export const getCompany = async (id: number | string): Promise<TCompany> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TCompany>>(
      `/company/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить компанию. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 *  Store a new company.
 * @param _   - unused parameter, can be used for state management if needed
 * @param body  - FormData object containing the company data to be stored.
 * @returns   A promise that resolves to the result of the mutation action.
 */
export const storeCompany = async (_: TMutationState, data: FormData) => {
  const result = await apiMutate("/company", {
    body: parseFormData(data),
  });
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]", "layout");
    revalidatePath("/dashboard");
  }
  return result;
};

/**
 *  updateCompany - Updates an existing company with new data.
 * This function sends a PUT request to the API to update the company information.
 * @param companyId - The ID of the company to update.
 * @param _ - Unused parameter, can be used for state management if needed.
 * @param data  - FormData object containing the updated company data.
 * @returns   A promise that resolves to the result of the mutation action.
 */
export const updateCompany = async (
  companyId: number | string,
  _: TMutationState,
  data: FormData
) => {
  const result = await apiMutate(`/company/${companyId}`, {
    body: parseFormData(data),
    method: "PUT",
  });
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]", "page");
  }
  return result;
};

/**
 *
 * @returns Companies list for public vacancies filter
 */
export const getFilterCompanies = async (): Promise<TFilterCompanies[]> => {
  try {
    const response = await apiGet<TApiListResponse<TFilterCompanies>>(
      "/company/stat",
      {
        withAuth: false,
        cache: "force-cache",
        next: { revalidate: 900 },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
