"use server";

import { removeEmptyValues } from "@/shared/lib/object_manipulations/filterFalsyFields";
import { apiGet, TApiListResponse, TApiSuccessResponse } from "../common/api";
import { TPublicVacancy, TVacancyPosition } from "../types";

/**
 * Fetches the list of public vacancies for a given account.
 *
 * Constructs a query string from provided filters, excluding falsy values,
 * and sends a GET request to retrieve vacancy data.
 *
 * @param accountId - The ID of the account to retrieve vacancies for. Defaults to `1`.
 * @param filters - A key-value object containing filter parameters. Falsy values are removed before building the query string.
 *
 * @returns An object containing:
 * - `data`: An array of `TPublicVacancy` items
 * - `total`: Total number of available vacancies
 * - `currentPage`: The current page number of the result set
 *
 * @throws Will throw an error with a user-friendly message if the request fails.
 */

export const getPubVacanciesList = async (
  filters: Record<string, string> = {}
) => {
  try {
    const filterString = new URLSearchParams(
      removeEmptyValues(filters)
    ).toString();
    const query = filterString ? `?${filterString}` : "";
    const response = await apiGet<TApiListResponse<TPublicVacancy>>(
      `/vacancy/public/crawled` + `${query}`,
      {
        withAuth: false,
        cache: "force-cache",
        next: {
          revalidate: 30,
        },
      }
    );
    return {
      data: response.data,
      total: response.total,
      currentPage: response.page,
      itemsPerPage: response.take,
    };
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
 * Fetches a public vacancy by its ID and account ID.
 *
 * Sends a GET request to retrieve a public vacancy from the server.
 * Defaults to using `accountId = 1` if not provided.
 *
 * @param id - The ID of the vacancy to fetch.
 * @param accountId - The ID of the account associated with the vacancy (default is 1).
 * @returns A promise that resolves to the public vacancy data.
 * @throws Will throw an error if the request fails.
 */
export const getPubVacancy = async (
  id: number | string
): Promise<TPublicVacancy> => {
  try {
    const response = await apiGet<TApiSuccessResponse<TPublicVacancy>>(
      `/vacancy/crawled/${id}`,
      { withAuth: false }
    );
    return response.data;
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
export const getPubVacancyPositions = async (): Promise<TVacancyPosition[]> => {
  try {
    const response = await apiGet<TApiListResponse<TVacancyPosition>>(
      "/vacancy/positions/crawled"
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
