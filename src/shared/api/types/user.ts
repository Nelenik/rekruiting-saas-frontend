export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type TSession =
  | { isAuthorized: true; user: TUser }
  | { isAuthorized: false };
