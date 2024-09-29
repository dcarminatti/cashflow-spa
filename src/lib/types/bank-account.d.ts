import { Transaction } from "./transaction";

export type BankAccount = {
  id: string;
  accountAgency: string;
  accountNumber: string;
  accountBalance: number;
  accountType: AccountType;
  transactions: List<Transaction>;
};

export enum AccountType {
  SAVINGS = "SAVINGS",
  CURRENT = "CURRENT",
}
