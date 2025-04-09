import { apiPost, apiPut } from "./api";
import {
  extractSyntheticErrorFromApi,
  getSyntheticError,
  TBadRequest,
} from "./errors";

export const storeEntity = async <T = unknown>(
  url: string,
  body: FormData,
  enableResData: boolean = false
) => {
  try {
    type TGoodRequest = {
      success: boolean;
      data: T;
    };
    const response = await apiPost<TGoodRequest | TBadRequest>(url, body);

    if (response && "errorType" in response) {
      //Returns in payload previously entered data to prevent form reset.
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
      };
    }
    if (response && enableResData) {
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

  // return {
  //   sent: true,
  //   error: null,
  // };
};

//Full entity update (PUT request)
export const updateEntity = async (url: string, body: FormData) => {
  try {
    const response = await apiPut<boolean | TBadRequest>(url, body);
    if (response && typeof response === "object" && response.errorType) {
      return {
        sent: true,
        error: extractSyntheticErrorFromApi(response),
        payload: body,
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

  // return {
  //   sent: true,
  //   error: null,
  // };
};
