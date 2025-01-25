type TValidationMappedErrors = Record<string, string>;

type TBadRequestMessage = {
  children: unknown[];
  constraints: TValidationMappedErrors;
  property: string;
};

export type TBadRequest = {
  errorType: string;
  message: TBadRequestMessage[];
  success: boolean;
};

export type TError = {
  code: number;
  details?: TValidationMappedErrors;
  message: string;
};

export const getSyntheticError = (
  message: string,
  code?: number,
  details?: TValidationMappedErrors
): TError => ({ code: code ?? 0, message, details });

export const extractSyntheticErrorFromApi = (e: TBadRequest | null) => {
  if (e && e.errorType === 'BAD_REQUEST_EXCEPTION') {
    return getSyntheticError(
      e.errorType,
      400,
      e.message.reduce<TValidationMappedErrors>((acc, err) => {
        acc[err.property] = Object.values(err.constraints)[0];

        return acc;
      }, {})
    );
  }

  return null;
};
