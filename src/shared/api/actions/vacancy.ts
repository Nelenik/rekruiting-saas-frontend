"use server";

import { revalidatePath } from "next/cache";
import {
  apiGet,
  apiMutate,
  TApiListResponse,
  TApiSuccessResponse,
  TMutationState,
} from "../common/api";
import {
  TVacancy,
  TVacancyMutation,
  TVacancyPosition,
  TVacancyShort,
} from "../types";
import { parseFormData } from "../common/utils";
import { createVacancyMatchStatuses } from "./status";
import { getSyntheticError } from "../common/errors";

/**
 * Fetches a list of vacancies from the server.
 *
 * If a `companyId` is provided, the results will be filtered to include only
 * vacancies associated with that company.
 *
 * @param {Object} [params] - Optional parameters.
 * @param {number | string} [params.companyId] - The ID of the company to filter vacancies by.
 *
 * @returns {Promise<TVacancyShort[]>} A promise that resolves to an array of short vacancy objects.
 *
 * @throws {Error} Throws an error if the request fails, with a user-friendly error message.
 */
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
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить список вакансий. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Fetches a single vacancy by its ID from the server.
 *
 * @param {number | string} id - The ID of the vacancy to retrieve.
 *
 * @returns {Promise<TVacancy>} A promise that resolves to a vacancy object.
 *
 * @throws {Error} Throws an error if the request fails, with a user-friendly error message.
 */
export const getVacancy = async (id: number | string): Promise<TVacancy> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TVacancy>>(
      `/vacancy/${id}`
    );
    return response.data;
    // return SVacancy.parse(response.data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить вакансию. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Fetches a list of available vacancy positions from the server.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of position names (strings).
 * If the response is empty, an empty array is returned.
 *
 * @throws {Error} Throws an error if the request fails, with a user-friendly error message.
 */
export const getVacancyPositions = async (): Promise<TVacancyPosition[]> => {
  try {
    const response = await apiGet<TApiListResponse<TVacancyPosition>>(
      "/vacancy/positions"
    );
    return response.data || [];
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить позиции вакансий. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Stores a new vacancy on the server using data from a submitted form.
 *
 * 1. Parses the incoming `FormData` into a structured `TVacancyMutation`.
 * 2. Creates default match statuses using `createVacancyMatchStatuses()`.
 *    - If creation fails, returns an error result with the parsed data.
 * 3. Sends a mutation request to store the vacancy along with the created status IDs.
 * 4. If the mutation is successful, triggers revalidation of related paths to ensure updated UI.
 *
 * @param {TMutationState} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing the vacancy details.
 *
 * @returns {Promise<TMutationResult<TVacancyMutation>>}
 * A promise that resolves to the result of the mutation, including error and payload info.
 */
export const storeVacancy = async (_: TMutationState, data: FormData) => {
  const parsedData: TVacancyMutation = parseFormData(data);

  const matchStatuses = await createVacancyMatchStatuses();
  if (!matchStatuses) {
    return {
      sent: true,
      error: getSyntheticError("Ошибка при создании статусов для вакансии"),
      payload: parsedData,
    };
  }

  const result = await apiMutate("/vacancy", {
    body: Object.assign(parsedData, { matchStatuses }),
  });

  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
    revalidatePath("/dashboard/[companyId]/vacancies/[vacancyId]", "layout");
    revalidatePath("/dashboard/[companyId]/vacancy-info/[vacancyId]", "page");
  }
  return result;
};

/**
 * Updates an existing vacancy on the server using the provided form data.
 *
 * Sends a `PUT` request to the `/vacancy/:id` endpoint with the parsed form data.
 * If the update is successful, it triggers revalidation of relevant dashboard paths
 * to ensure the UI reflects the latest vacancy information.
 *
 * @param {number | string} vacancyId - The ID of the vacancy to update.
 * @param {TMutationState | null} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing updated vacancy information.
 *
 * @returns {Promise<TMutationState>} A promise that resolves to the result of the mutation,
 * including success or error information.
 */
export const updateVacancy = async (
  vacancyId: number | string,
  _: TMutationState | null,
  data: FormData | TVacancyMutation
): Promise<TMutationState> => {
  const result = await apiMutate(`/vacancy/${vacancyId}`, {
    body: data instanceof FormData ? parseFormData(data) : data,
    method: "PUT",
  });
  if (!result.error) {
    revalidatePath("/dashboard/[companyId]/vacancies", "layout");
    revalidatePath("/dashboard/[companyId]/vacancies/[vacancyId]", "layout");
    revalidatePath("/dashboard/[companyId]/vacancy-info/[vacancyId]", "page");
  }
  return result;
};
