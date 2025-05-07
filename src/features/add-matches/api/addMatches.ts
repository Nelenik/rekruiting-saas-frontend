"use server";

import { apiGet } from "@/shared/api/common/api";
import { getSyntheticError, TBadRequest } from "@/shared/api/common/errors";
// import { mutateAction } from "@/shared/api/common/mutate";
import { TGoodRequest } from "@/shared/api/common/success";

// This action triggers the match creation flow to get additional matches for the vacancy.
// export const addMatches = async (
//   vacancyId: number | string,
//   _: TMutationState | null,
//   body: FormData
// ) => {
//   const result = await mutateAction(`/vacancy/${vacancyId}/refresh`, {
//     body,
//     method: "PUT",
//   });
//   console.log("refresh result", result);
//   return result;
// };

export const addMatches = async (vacancyId: number | string) => {
  try {
    const response: TBadRequest | TGoodRequest<unknown> = await apiGet(
      `/vacancy/${vacancyId}/refresh`
    );

    if (response && "errorType" in response) {
      return {
        sent: true,
        error: getSyntheticError("Ошибка при добавлении мэтчей"),
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
      error: getSyntheticError("Ошибка запроса", 500),
    };
  }
};
