/**
 *
 * Utility functions for API requests
 * @param body - The body of the request, which can be either a `FormData` object or a plain object.
 * @returns   A `FormData` object if the input is a `FormData`, or a JSON string if the input is a plain object.
 */
export const prepareBody = (
  body: FormData | Record<string, unknown> | undefined
) => {
  if (body instanceof FormData) {
    return body;
  } else if (typeof body === "object" && body !== null) {
    return JSON.stringify(body);
  }
};
