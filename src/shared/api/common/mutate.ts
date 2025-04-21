import { apiPost, apiPut } from "./api";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "./errors";

type TGoodRequest<T> = {
  success: boolean;
  data: T;
};

type TMutateOptions = {
  method?: "POST" | "PUT" | "PATCH";
  enableResponseData?: boolean;
  withAuth?: boolean;
};

export const mutateAction = async <T = unknown>(
  url: string,
  body: FormData,
  mutateOptions: TMutateOptions = {}
) => {
  const {
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
