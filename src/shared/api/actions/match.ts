"use server";

import { revalidatePath } from "next/cache";
import {
  apiGet,
  apiMutate,
  TApiListResponse,
  TApiSuccessResponse,
  TMutationState,
} from "../common/api";
import { parseFormData } from "../common/utils";
import { TCandidateFull, TCandidateShort, TMatchUpdate } from "../types";

/**
 * Fetches a list of candidates for a given vacancy and status, sorted by match points in descending order.
 *
 * Sends a GET request to the `/match/candidates` endpoint with vacancy and status IDs as query parameters.
 *
 * @param {number | string} vacId - The ID of the vacancy.
 * @param {number | string} statusId - The ID of the status.
 *
 * @returns {Promise<TCandidateShort[]>} A promise resolving to a sorted array of candidates.
 *
 * @throws {Error} If the request fails, an error with a user-friendly message is thrown.
 */
export const getBasicCandidatesByStatus = async (
  vacId: number | string,
  statusId: number | string
): Promise<TCandidateShort[]> => {
  try {
    const response = await apiGet<TApiListResponse<TCandidateShort>>(
      `/match/candidates?vacancy_id=${vacId}&status_id=${statusId}`
    );
    return response.data.toSorted((a, b) => b.match_point - a.match_point);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить кандидатов. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Fetches detailed information about a candidate by match ID.
 *
 * Sends a GET request to the `/match/:matchId` endpoint and returns the full candidate data.
 *
 * @param {number} matchId - The ID of the match to retrieve candidate information for.
 *
 * @returns {Promise<TCandidateFull>} A promise resolving to the full candidate details.
 *
 * @throws {Error} If the request fails, an error with a user-friendly message is thrown.
 */
export const getCandidateFull = async (matchId: number) => {
  try {
    const response = await apiGet<TApiSuccessResponse<TCandidateFull>>(
      `/match/${matchId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message =
        "Не удалось загрузить информацию о кандидате. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};

/**
 * Updates an existing match with the provided form data.
 *
 * Sends a PUT request to the `/match/:matchId` endpoint with parsed form data.
 * On success, triggers revalidation of the candidate info page.
 *
 * @param {number | string} matchId - The ID of the match to update.
 * @param {TMutationState | null} _ - The current mutation state (unused).
 * @param {FormData} data - The form data containing updated match information.
 *
 * @returns {Promise<TMutationState>} A promise resolving to the result of the mutation,
 * including error information if the request fails.
 */
export const updateMatch = async (
  matchId: number | string,
  _: TMutationState | null,
  data: FormData | TMatchUpdate
) => {
  const result = await apiMutate(`/match/${matchId}`, {
    body: data instanceof FormData ? parseFormData(data) : data,
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

/**
 * Makes matches for vacancy from hh.ru
 *
 * @param _ -the current mutation state (unused)
 * @param data - Filter for hh.ru
 * @returns
 */
export const launchMatchFromHh = async (_: TMutationState, data: FormData) => {
  const result = await apiMutate("/match/search-hh-resumes", {
    body: parseFormData(data, true),
    method: "POST",
  });
  return result;
};

/**
 * Parses responses to job postings published on external platforms.
 * @param _
 * @param data
 * @returns
 */
export const parseVacancyResponses = async (
  _: TMutationState,
  data: FormData
) => {
  const result = await apiMutate("/match/parse-vacancy-responses", {
    body: parseFormData(data, true),
    method: "POST",
  });
  return result;
};
