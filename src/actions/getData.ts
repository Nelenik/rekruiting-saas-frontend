"use server";
import { VacancyBasic } from "@/types/vacancyTypes";
import { getListRecords } from "./getListRecords";
import { handleError } from "@/lib/handleErrors";

/**
 * Fetches a list of vacancies from an external source (e.g., Airtable).
 *
 * Uses `getListRecords` to perform a request to the database and retrieve a list of vacancies.
 * In case of an error, it is handled by the `handleError` function.
 *
 * @returns {Promise<VacancyBasic[]>} A promise that resolves to an array of vacancies if the request is successful,
 * or triggers error handling if an error occurs.
 *
 * @throws {Error} Throws an error if the request cannot be completed or if an error occurs during the process.
 */
export const getBasicVacancies = async (): Promise<VacancyBasic[]> => {
  try {
    const vacancies = await getListRecords<VacancyBasic[]>("Vacs", {
      fields: ["VacName", "VacID", "VacCrD", "VacStatus"],
    });
    return vacancies;
  } catch (error: unknown) {
    return handleError(error);
  }
};
