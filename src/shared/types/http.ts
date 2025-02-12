export type TApiSuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type TApiListResponse<T> = {
  success?: boolean;
  data: T[];
  take?: number;
  page?: number;
  total?: number;
};
