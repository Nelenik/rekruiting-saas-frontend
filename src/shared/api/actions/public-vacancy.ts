"use server";

import { filterFalsyFields } from "@/shared/lib/object_manipulations/filterFalsyFields";
import { apiGet, TApiListResponse } from "../common/api";
import { TPublicVacancy } from "../types";

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
  filters: Record<string, string> = {},
  accountId: number = 1
) => {
  try {
    const filterString = new URLSearchParams(
      filterFalsyFields(filters)
    ).toString();
    const response = await apiGet<TApiListResponse<TPublicVacancy>>(
      `/vacancy/public/${accountId}?` + filterString,
      {
        withAuth: false,
        next: {
          revalidate: 60,
        },
      }
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
        "Не удалось загрузить список вакансий. Пожалуйста, попробуйте позже.";
    }
    throw error;
  }
};
