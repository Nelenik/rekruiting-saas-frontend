//<T> generic the expected shape of the successful response data
export type TGoodRequest<T> = {
  success: boolean;
  data?: T;
};
