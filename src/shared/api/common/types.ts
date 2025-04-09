import { TError } from "./errors";

export type TMutationState<T = unknown> = {
  sent: boolean;
  error: TError | null;
  payload?: FormData | T;
};
