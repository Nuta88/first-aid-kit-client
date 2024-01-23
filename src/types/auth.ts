export interface IUserLogin {
  email: string
  password: string
}

export type Tokens = {
  access_token: string;
  refresh_token: string;
  user: any;
}
