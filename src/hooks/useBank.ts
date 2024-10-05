import type { BankAccount } from "@/lib/types/bank-account";
import { useUser } from "./useUser";
import { useState } from "react";

export const useBank = () => {
  const { user, addUser, removeUser } = useUser();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    user?.user.bankAccounts || []
  );

  const addBank = (bank: BankAccount) => {
    if (!user) return;
    const updatedUser = { ...user };
    updatedUser.user.bankAccounts.push(bank);
    addUser(updatedUser);
    setBankAccounts(updatedUser.user.bankAccounts);
  };

  const removeBank = (bankId: number) => {
    if (!user) return;
    const updatedUser = { ...user };
    updatedUser.user.bankAccounts = updatedUser.user.bankAccounts.filter(
      (bank: BankAccount) => bank.id !== bankId
    );
    addUser(updatedUser);
    setBankAccounts(updatedUser.user.bankAccounts);
  };

  return { bankAccounts, addBank, removeBank };
};
