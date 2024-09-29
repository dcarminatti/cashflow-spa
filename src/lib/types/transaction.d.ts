export type Transaction = {
  id: string;
  transactionDescription: string;
  transactionType: TransactionType;
  transactionCategory: TransactionCategory;
  transactionValue: number;
  transactionDate: string;
};

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

export enum TransactionCategory {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  VARIABLE_COSTS = "VARIABLE_COSTS",
  FIXED_COSTS = "FIXED_COSTS",
  FINANCIAL_REVENUES = "FINANCIAL_REVENUES",
  FINANCIAL_EXPENSES = "FINANCIAL_EXPENSES",
  TAXES = "TAXES",
}
