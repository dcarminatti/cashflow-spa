"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { config } from "@/config";
import { useBank } from "@/hooks/useBank";
import { useUser } from "@/hooks/useUser";
import { BankAccount } from "@/lib/types/bank-account";
import type { AccountType } from "@/lib/types/account-type";
import { useState } from "react";
import { toast } from "sonner";

const newTransactionSchema = z.object({
  transactionDescription: z.string(),
  transactionType: z.union([z.literal("DEPOSIT"), z.literal("WITHDRAW")]),
  TransactionCategory: z.union([
    z.literal("INCOME"),
    z.literal("EXPENSE"),
    z.literal("VARIABLE_COSTS"),
    z.literal("FIXED_COSTS"),
    z.literal("FINANCIAL_REVENUES"),
    z.literal("FINANCIAL_EXPENSES"),
    z.literal("TAXES"),
  ]),
  transactionValue: z.coerce.number().min(0),
  bankId: z.number().nullable(),
});

export function NewTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { bankAccounts } = useBank();

  const form = useForm<z.infer<typeof newTransactionSchema>>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      transactionDescription: "",
      transactionType: "DEPOSIT",
      TransactionCategory: "INCOME",
      transactionValue: 0,
      bankId: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof newTransactionSchema>) => {
    const newTransaction = {
      ...values,
      transactionDate: new Date().toISOString(),
    };

    console.log(newTransaction);

    // try {
    //   const response = await fetch(config.apiUrl + "/transaction", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${user?.token}`,
    //     },
    //     body: JSON.stringify(newBankAccount),
    //   });

    //   if (!response.ok) {
    //     toast.error("Failed to add bank account");
    //   } else {
    //     const data = await response.json();
    //     toast.success("Bank account added successfully");
    //     // addBank(data);
    //     setIsOpen(false);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2">
            <FormField
              control={form.control}
              name="transactionDescription"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Transaction description"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionValue"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$0.00"
                      className="col-span-3"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "transactionType",
                          value as "DEPOSIT" | "WITHDRAW"
                        )
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="DEPOSIT">Deposit</SelectItem>
                          <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "transactionType",
                          value as "DEPOSIT" | "WITHDRAW"
                        )
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="DEPOSIT">Deposit</SelectItem>
                          <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("bankId", Number(value))
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {bankAccounts.length > 0 &&
                            bankAccounts.map((bankAccount: BankAccount) => (
                              <SelectItem
                                key={bankAccount.id}
                                value={String(bankAccount.id)}
                              >
                                {bankAccount.accountBankName}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
