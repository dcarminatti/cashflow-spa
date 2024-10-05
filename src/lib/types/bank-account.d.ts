import { Transaction } from "./transaction";
import { AccountType } from "./account-type";

export type BankAccount = {
  id: number | null;
  accountBankName: string;
  accountAgency: string;
  accountNumber: string;
  accountBalance: number;
  accountType: AccountType;
  transactions: List<Transaction>;
};
