import { TMutationState } from "./common/types";

export const mutationInitialState: TMutationState = {
  sent: false,
  error: null,
};

export const API_URL = process.env.API_URL;

export const AUTH_COOKIE_NAME = "access_token";

export const COMPANIES_PER_PAGE = 50;

export const CV_PER_PAGE = 10;

export const MATCH_COMMENTS_PER_PAGE = 10;
