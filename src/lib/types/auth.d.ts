import { BankAccount } from "./bank-account";

export type TUser = {
  email: string;
  name: string;
  bankAccounts: List<BankAccount>;
};

export type AuthUser = {
  token: string;
  user: TUser;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  email: string;
  password: string;
  name: string;
};

export type AuthResponse = {
  message: string;
  data?: AuthUser;
  success?: boolean;
};
