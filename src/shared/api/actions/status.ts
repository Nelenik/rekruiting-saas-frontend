"use server";
import { DEFAULT_MATCH_STATUSES } from "@/shared/constants/default-match-statuses";
import { apiMutate, TMutationState } from "../common/api";
import { parseFormData } from "../common/utils";
import { TStatus } from "../types";

/**
 * Sends a request to create a new status on the server.
 *
 * Accepts either `FormData` or a plain object as input. If the input is `FormData`,
 * it is parsed into a plain object before being sent. The function sends a mutation
 * request to the `/status` endpoint and returns the result, which includes the created
 * status or error information.
 *
 * @param {TMutationState | null} _ - The current mutation state (not used in this function).
 * @param {FormData | Record<string, unknown>} data - The status data to be sent.
 * Can be a `FormData` object (parsed before submission) or a plain object.
 *
 * @returns {Promise<TMutationState<TStatus>>} A promise resolving to the mutation result, which includes the new status (`payload`)
 */
export const storeStatus = async (
  _: TMutationState | null,
  data: FormData | Record<string, unknown>
) => {
  const result = await apiMutate<TStatus>("/status", {
    body: data instanceof FormData ? parseFormData(data) : data,
    expectResponseData: true,
  });

  return result;
};

/**
 * Updates an existing status on the server using the provided form data.
 *
 * Sends a `PUT` request to the `/status/:statusId` endpoint with the parsed data.
 * Expects a response containing the updated `TStatus` object.
 *
 * @param {string | number} statusId - The ID of the status to update.
 * @param {TMutationState | null} _ - The current mutation state (not used).
 * @param {FormData} data - The form data containing the updated status fields.
 *
 * @returns {Promise<TMutationState<TStatus>>} A promise that resolves to the result of the mutation
 */
export const updateStatus = async (
  statusId: string | number,
  _: TMutationState | null,
  data: FormData
) => {
  const result = await apiMutate<TStatus>(`/status/${statusId}`, {
    body: parseFormData(data),
    method: "PUT",
    expectResponseData: true,
  });
  return result;
};

/**
 * Creates default vacancy match statuses by calling `storeStatus` for each
 * predefined status in `DEFAULT_MATCH_STATUSES`.
 *
 * Executes all status creation requests in parallel and waits for all to complete.
 * If any of the operations fail (i.e., any result contains an error), the function returns `null`.
 * Otherwise, it returns an array of the created status IDs.
 *
 * @returns {Promise<number[] | null>} A promise that resolves to an array of status IDs if all
 * statuses were created successfully, or `null` if any creation failed.
 */
export const createVacancyMatchStatuses = async () => {
  const newVacancyStatuses = DEFAULT_MATCH_STATUSES.map((el) =>
    storeStatus(null, el)
  );
  const statuses = await Promise.all(newVacancyStatuses);
  const hasError = statuses.some((result) => result.error);
  if (hasError) return null;
  return statuses.map((statusRes) => (statusRes.payload as TStatus)?.id);
};
