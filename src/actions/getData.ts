"use server";
import { VacancyBasic, VacancyFull } from "@/types/vacancyTypes";
import { getListRecords, getRecordById } from "./getRecords";
import { handleError } from "@/lib/handleErrors";
import { CandidateBasic, MatchStatus } from "@/types/matchTypes";

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
      sort: [{ field: "VacID", direction: "asc" }],
    });
    return vacancies;
  } catch (error: unknown) {
    return handleError(error);
  }
};

/**
 * Retrieves a full vacancy record by its ID.
 *
 * @param {string} vacancyId - The ID of the vacancy to retrieve.
 * @returns {Promise<VacancyFull>} A promise that resolves to the full vacancy record.
 */
export const getVacancyRecordById = async (
  vacancyId: string
): Promise<VacancyFull> => {
  try {
    const vacancyData = await getRecordById("Vacs", vacancyId);
    return vacancyData;
  } catch (error: unknown) {
    return handleError(error);
  }
};

/**
 * Fetches a list of candidates wit basic fields filtered by match status and vacancy ID.
 *
 * @param {MatchStatus} status - The status of the match (e.g., 'Contacted', 'Interviewed', etc.).
 * @param {number} vacId - The ID of the vacancy to filter candidates by.
 * @returns {Promise<CandidateBasic[]>} A promise that resolves to an array of basic candidate details.
 *
 * @throws {Error} Throws an error if the API call fails or the request cannot be completed.
 */
export const getBasicCandidatesByStatus = async (
  vacId: number,
  status: MatchStatus
): Promise<CandidateBasic[]> => {
  try {
    const candidates: CandidateBasic[] = await getListRecords("Match", {
      filterByFormula: `AND(FIND('${vacId}', {VacID}), {MatchStatus}='${status}')`,
      fields: ["CandyName", "CandyCity", "CvSalary", "MatchPoint"],
    });
    return candidates;
  } catch (error: unknown) {
    return handleError(error);
  }
};
