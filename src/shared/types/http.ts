export type TApiSuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type TApiListResponse<T> = {
  success?: boolean;
  data: T[];
};
