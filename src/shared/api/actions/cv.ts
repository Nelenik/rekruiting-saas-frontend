"use server";

import { filterFalsyFields } from "@/shared/lib/object_manipulations/filterFalsyFields";
import {
  apiGet,
  apiMutate,
  TApiListResponse,
  TApiSuccessResponse,
  TMutationState,
} from "../common/api";
import { TResume } from "../types";
import { revalidatePath } from "next/cache";
import { parseFormData } from "../common/utils";
import { getSyntheticError } from "../common/errors";

/**
 * Fetches a list of resumes from the server, applying optional filters.
 *
 * Filters are cleaned of falsy values and converted into a query string.
 * If the request succeeds, returns the list of resumes along with pagination info.
 * If it fails, throws an error with a user-friendly message.
 *
 * @param {Record<string, string>} [filters={}] - Optional filters to apply to the resume list query.
 *
 * @returns {Promise<{ data: TResume[]; total: number; currentPage: number }>}
 * A promise resolving to an object containing the resume list, total count, and current page.
 *
 * @throws {Error} If the request fails, an error with a descriptive message is thrown.
 */
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
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить список резюме. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Fetches a single resume by its ID.
 *
 * Sends a GET request to the `/cv/:id` endpoint and returns the resume data.
 * If the request fails, throws an error with a descriptive message.
 *
 * @param {number | string} id - The ID of the resume to retrieve.
 *
 * @returns {Promise<TResume>} A promise resolving to the resume data.
 *
 * @throws {Error} If the request fails, an error with a user-friendly message is thrown.
 */
export const getResumeById = async (id: number | string): Promise<TResume> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TResume>>(`/cv/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить резюме. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Stores a new resume (CV) on the server using the provided form data.
 *
 * Sends a POST request to the `/cv` endpoint with parsed form data.
 * On success, triggers revalidation of the reserve page.
 *
 * @param {TMutationState} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing resume information.
 *
 * @returns {Promise<TMutationState>} A promise resolving to the result of the mutation,
 * including error information if the request fails.
 */
export const storeCv = async (
  _: TMutationState,
  data: FormData
): Promise<TMutationState> => {
  const result = await apiMutate("/cv", { body: parseFormData(data) });
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/reserve", "page");
  }
  return result;
};

/**
 * Updates an existing resume (CV) with the provided data.
 *
 * Sends a PUT request to the `/cv/:cvId` endpoint with parsed form data.
 * On success, triggers revalidation of the reserve page.
 *
 * @param {number | string} cvId - The ID of the resume to update.
 * @param {TMutationState} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing updated resume information.
 *
 * @returns {Promise<TMutationState>} A promise resolving to the result of the mutation,
 * including error information if the request fails.
 */
export const updateCV = async (
  cvId: number | string,
  _: TMutationState,
  data: FormData
): Promise<TMutationState> => {
  const result = await apiMutate(`/cv/${cvId}`, {
    body: parseFormData(data),
    method: "PUT",
  });
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/reserve", "page");
  }
  return result;
};

export const parseCvFromFile = async (_: TMutationState, data: FormData) => {
  if (!data.has("file")) {
    return {
      sent: false,
      error: getSyntheticError("", 0, { file: "Выберите файл" }),
    };
  }
  const result = await apiMutate("/cv/parse/hh", {
    expectResponseData: true,
    isRaw: true,
    body: data,
  });
  return result;
  // try {
  //   if (!data.has("file")) {
  //     return {
  //       sent: false,
  //       error: getSyntheticError("", 0, { file: "Выберите файл" }),
  //     };
  //   }
  //   const res = await fetch(API_URL + "/cv/parse/hh", {
  //     body: data,
  //     method: "POST",
  //   });
  //   const result = await res.json();
  //   console.log(result);
  //   return {
  //     sent: true,
  //     payload: result as TResume,
  //     error: null,
  //   };
  // } catch (error) {
  //   console.error("Error parsing CV from file:", error);
  //   return {
  //     sent: true,
  //     error: getSyntheticError("Ошибка при обработке файла"),
  //   };
  // }
};
