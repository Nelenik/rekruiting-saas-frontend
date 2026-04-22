import { TMutationState } from "./common/api";

// const isDev = process.env.NODE_ENV === "development";

export const mutationInitialState: TMutationState = {
  sent: false,
  error: null,
};

export const API_URL = process.env.API_URL;

export const ATS_DOMAIN = process.env.NEXT_PUBLIC_REKRUTAI_HOST;
export const JOBSITE_DOMAIN = process.env.NEXT_PUBLIC_JOBSITE_HOST;

// export const INTERNAL_BASE_URL = isDev ? "http://localhost:3000" : API_URL;

export const FILE_STORE_BASE_URL = "";

export const AUTH_COOKIE_NAME = "access_token";

export const DEFAULT_PER_PAGE = 10;

export const COMPANIES_PER_PAGE = 50;

export const CV_PER_PAGE = 10;

export const PUB_VACANCIES_PER_PAGE = 10;

export const MATCH_COMMENTS_PER_PAGE = 10;
