"use server";

import { cookies } from "next/headers";
import { API_URL, AUTH_COOKIE_NAME } from "../constants";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TError,
} from "./errors";
import { prepareBody } from "./utils";

export type TApiSuccessResponse<T> = {
  success?: boolean;
  data: T;
  [key: string]: unknown;
};

export type TApiListResponse<T> = {
  success?: boolean;
  data: T[];
  take?: number;
  page?: number;
  total?: number;
};

/**
 * This function retrieves the authentication token from the cookies and constructs an authorization header.
 * @param authCookieName The name of the authentication cookie to retrieve the token from.
 * @returns  A promise that resolves to an object containing the Authorization header.
 */
const getAuthHeader = async (authCookieName: string): Promise<HeadersInit> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authCookieName);
  return token ? { Authorization: `Bearer ${token.value}` } : {};
};

type TRequestOptions = Omit<RequestInit, "body"> & {
  body?: FormData | Record<string, unknown>;
  withAuth?: boolean;
  authCookieName?: string;
  expectResponseData?: boolean;
  isRaw?: boolean; //raw response as it comes from the server
};

/**
 *
 * Performs a GET request to the specified URL with optional authentication and custom headers.
 * Designed to work with typed response handling and error extraction.
 *
 * @param url   The API endpoint to send the request to.
 * @param getOptions  Configuration options for the GET request:
 * - `withAuth`: Whether to include authentication headers. Defaults to `true`.
 * - `authCookieName`: The name of the authentication cookie to use. Defaults to `AUTH_COOKIE_NAME`.
 * - `headers`: Optional custom headers to include in the request.
 * @returns   A promise that resolves to the parsed JSON response from the API.
 * @throws   An error if the response status is not OK (i.e., not in the range 200-299).
 *
 */
export const apiGet = async <T = unknown>(
  url: string,
  getOptions: TRequestOptions = {}
): Promise<T> => {
  // Destructure options with defaults
  // to ensure backward compatibility and flexibility
  const {
    withAuth = true,
    authCookieName = AUTH_COOKIE_NAME,
    headers,
  } = getOptions;

  // Combine custom headers with auth headers if needed
  // and ensure the correct type for headers
  const actualHeaders: HeadersInit = Object.assign(
    {},
    withAuth && (await getAuthHeader(authCookieName)),
    headers
  );

  // Perform the GET request with the specified URL and headers
  // Use `no-store` cache policy to ensure fresh data
  const response = await fetch(API_URL + url, {
    method: "GET",
    cache: "no-store",
    headers: actualHeaders,
  });

  // Check if the response is OK (status in the range 200-299)
  // If not, throw an error with details about the failure
  if (!response.ok) {
    const error = new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`
    );
    error.name = "APIError";
    error.cause = response.status;
    throw error;
  }
  return response.json();
};

/*------------------------------------------------------*/

/**
 * Represents the result of a mutation (e.g., POST/PUT request).
 *
 * @template T - The expected type of the response data (if any).
 *
 * `payload` can contain:
 * - the original request body (FormData or object), when error occurs,
 * - or the response data of type `T`, when successful and expected.
 */
export type TMutationState<T = unknown> = {
  sent: boolean;
  error: TError | null;
  payload?: T;
};

/**
 *
 * Performs a mutation (e.g., form submission) to the provided URL using the specified HTTP method.
 * Designed to work with `FormData`, with support for typed response handling and error extraction.
 * @param url   The API endpoint to send the request to.
 * @param mutateOptions   Configuration options for the mutation:
 * - `body`: Optional `FormData` or plain object to be sent with the request.
 * - `method`: HTTP method (`POST`, `PUT`, or `PATCH`). Defaults to `"POST"`.
 * - `expectResponseData`: If `true`, extracts and returns typed data from the response.
 * - `withAuth`: Whether to include authentication headers. Defaults to `true`.
 * - `authCookieName`: The name of the authentication cookie to use. Defaults to `AUTH_COOKIE_NAME`.
 * - `headers`: Optional custom headers to include in the request.
 *
 * @returns   A promise that resolves to the result of the mutation, including error info and payload.
 */
export const apiMutate = async <T = unknown>(
  url: string,
  mutateOptions: TRequestOptions = {}
) => {
  // Destructure options with defaults
  const {
    body,
    method = "POST",
    expectResponseData = false,
    isRaw = false,
    withAuth = true,
    authCookieName = AUTH_COOKIE_NAME,
    headers,
    ...restOptions
  } = mutateOptions;

  // Combine custom headers with auth headers if needed
  //getting auth headers if request is protected
  const authHeaders = withAuth ? await getAuthHeader(authCookieName) : {};
  //Determine the content type header based on the body type
  //If body is a FormData object, no content type is needed
  const contentTypeHeader =
    body instanceof FormData ? {} : { "Content-Type": "application/json" };

  const actualHeaders: HeadersInit = Object.assign(
    contentTypeHeader,
    authHeaders,
    headers
  );

  // If body is provided, ensure it is a FormData object or convert it to JSON
  const preparedBody = prepareBody(body);
  console.log("preparedBody", preparedBody);
  try {
    // Perform the mutation request with the specified URL, method, body, and headers
    const response = await fetch(API_URL + url, {
      method,
      cache: "no-store",
      body: preparedBody,
      headers: actualHeaders,
      ...restOptions,
    });

    const parsedResponse = await response.json();

    // Check if the parsedResponse corresponds to the expected format
    if (
      !parsedResponse ||
      typeof parsedResponse !== "object" ||
      Array.isArray(parsedResponse)
    ) {
      throw new Error("Неожиданный формат ответа");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { success, errorType, message, data, ...rest } = parsedResponse;

    //if the reponse contains error
    if (errorType && message) {
      //Returns in payload previously entered data to prevent form reset.
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(parsedResponse),
        payload: body,
      };
    }
    // If the response is expected to contain data and it does, return it
    // Otherwise, return a success state without data
    if (expectResponseData) {
      return {
        sent: true,
        error: null,
        payload: isRaw ? parsedResponse : (data as T),
      };
    }

    return {
      sent: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      sent: true,
      error: getSyntheticError("Ошибка сохранения", 500),
      payload: body,
    };
  }
};
