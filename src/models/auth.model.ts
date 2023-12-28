export interface AuthInterface {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  alias: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface registerUserPromps {
  username: string;
  password: string;
  email: string;
}

export interface loginUserPromps {
  identifier: string;
  password: string;
}
