import { TError } from "@/shared/helpers";

export type TMutationState<T = unknown> = {
  sent: boolean;
  error: TError | null;
  payload?: FormData | T;
};
