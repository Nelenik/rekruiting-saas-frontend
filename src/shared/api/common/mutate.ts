import { apiPost, apiPut } from "./api";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "./errors";
import { TGoodRequest } from "./success";

// type TGoodRequest<T> = {
//   success: boolean;
//   data: T;
// };

type TMutateOptions = {
  body?: FormData;
  method?: "POST" | "PUT" | "PATCH";
  enableResponseData?: boolean;
  withAuth?: boolean;
};

/**
 * Performs a mutation (e.g., form submission) to the provided URL using the specified HTTP method.
 * Designed to work with `FormData`, with support for typed response handling and error extraction.
 *
 * @template T - The expected shape of the successful response data.
 *
 * @param {string} url - The API endpoint to send the request to.
 * @param {TMutateOptions} [mutateOptions] - Configuration options for the mutation:
 *   - `body`: Optional `FormData` to be sent with the request.
 *   - `method`: HTTP method (`POST`, `PUT`, or `PATCH`). Defaults to `"POST"`.
 *   - `enableResponseData`: If `true`, extracts and returns typed data from the response.
 *   - `withAuth`: Whether to include authentication headers. Defaults to `true`.
 *
 * @returns {Promise<TMutationState<T>>} - The result of the mutation, including error info and payload.
 * If `enableResponseData` is `true` and the response is successful, the payload will contain typed data of type `T`.
 * If an error occurs, the payload will contain the original `FormData` to preserve user input.
 */

export const mutateAction = async <T = unknown>(
  url: string,
  // body: FormData,
  mutateOptions: TMutateOptions = {}
) => {
  const {
    body = new FormData(),
    method = "POST",
    enableResponseData = false,
    withAuth = true,
  } = mutateOptions;
  try {
    let response: TGoodRequest<T> | TBadRequest | boolean;
    if (method === "PUT") {
      response = await apiPut(url, body, withAuth);
    } else {
      response = await apiPost(url, body, withAuth);
    }

    if (response && typeof response === "object" && "errorType" in response) {
      //Returns in payload previously entered data to prevent form reset.
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
      };
    }
    if (response && typeof response === "object" && enableResponseData) {
      return {
        sent: true,
        payload: response.data as T,
        error: null,
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

// export const storeEntity = async <T = unknown>(
//   url: string,
//   body: FormData,
//   enableResData: boolean = false
// ) => {
//   try {
//     const response = await apiPost<TGoodRequest<T> | TBadRequest>(url, body);

//     if (response && "errorType" in response) {
//       //Returns in payload previously entered data to prevent form reset.
//       return {
//         sent: true,
//         error: extractSyntheticErrorFromApi(response),
//         payload: body,
//       };
//     }
//     if (response && enableResData) {
//       return {
//         sent: true,
//         payload: response.data as T,
//         error: null,
//       };
//     }

//     return {
//       sent: true,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       sent: true,
//       error: getSyntheticError("Ошибка сохранения", 500),
//       payload: body,
//     };
//   }

//   // return {
//   //   sent: true,
//   //   error: null,
//   // };
// };

// //Full entity update (PUT request)
// export const updateEntity = async (url: string, body: FormData) => {
//   try {
//     const response = await apiPut<boolean | TBadRequest>(url, body);
//     if (response && typeof response === "object" && response.errorType) {
//       return {
//         sent: true,
//         error: extractSyntheticErrorFromApi(response),
//         payload: body,
//       };
//     }
//     return {
//       sent: true,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       sent: true,
//       error: getSyntheticError("Ошибка сохранения", 500),
//       payload: body,
//     };
//   }

//   // return {
//   //   sent: true,
//   //   error: null,
//   // };
// };
