import { TError } from "@/shared/helpers";

export type TMutationState = {
  sent: boolean;
  error: TError | null;
  payload?: FormData;
};
