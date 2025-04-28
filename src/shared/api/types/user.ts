export type TUser = {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
};

export type TAuthorized = { isAuthorized: true; user: TUser };
export type TUnauthorized = { isAuthorized: false };

export type TSession = TAuthorized | TUnauthorized;
