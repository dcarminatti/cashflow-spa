"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BankAccount } from "@/lib/types/bank-account";
import { Transaction } from "@/lib/types/transaction";
import { CircleMinus, CirclePlus, Landmark } from "lucide-react";
import { NewBankDialog } from "./_components/new-bank-dialog";
import { useEffect, useState } from "react";
import { useBank } from "@/hooks/useBank";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteBankDialog } from "./_components/delete-bank-dialog";
import { EditBankDialog } from "./_components/edit-bank-dialog";

export default function BanksPage() {
  const { bankAccounts } = useBank();
  const [comingIn, setComingIn] = useState(0);
  const [comingOut, setComingOut] = useState(0);
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);

  const calculateTransactionTotals = (bankAccounts: BankAccount[]) => {
    if (!bankAccounts) return { comingIn: 0, comingOut: 0 };
    let totals = { comingIn: 0, comingOut: 0 };

    bankAccounts.forEach((account) => {
      account.transactions.forEach((transaction: Transaction) => {
        if (transaction.transactionType === "DEPOSIT") {
          totals.comingIn += transaction.transactionValue;
        } else if (transaction.transactionType === "WITHDRAW") {
          totals.comingOut += transaction.transactionValue;
        }
      });
    });

    setComingIn(totals.comingIn);
    setComingOut(totals.comingOut);
  };

  const handleSelectedBank = (bank: BankAccount) => {
    if (selectedBank?.id === bank.id) return setSelectedBank(null);
    setSelectedBank(bank);
  };

  useEffect(() => {
    calculateTransactionTotals(bankAccounts);
  }, [bankAccounts]);

  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">Your Banks</h1>
        <NewBankDialog />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CirclePlus className="size-8 text-green-500" />
            <div className="text-right">
              <CardTitle>Coming In</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {comingIn.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CircleMinus className="size-8 text-rose-500" />
            <div className="text-right">
              <CardTitle>Coming Out</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {comingOut.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <Landmark className="size-8 text-amber-500" />
            <div className="text-right">
              <CardTitle>Accounts</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {bankAccounts?.length ?? 0}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      {bankAccounts?.length ? (
        <Carousel className="w-[calc(100%_-_96px)] m-auto">
          <CarouselContent>
            {bankAccounts.map((bank: BankAccount) => (
              <CarouselItem
                key={bank.id}
                className="basis-1/4"
                onClick={() => handleSelectedBank(bank)}
              >
                <Card
                  data-selected={selectedBank?.id === bank.id}
                  className="data-[selected=true]:bg-secondary"
                >
                  <CardHeader>
                    <CardTitle>{bank.accountBankName}</CardTitle>
                    <CardDescription className="text-2xl font-bold">
                      {bank.accountBalance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="flex items-center gap-x-2 justify-center">
          No banks found. Add a bank to get started.
        </p>
      )}
      {selectedBank && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-bold">
              {selectedBank.accountBankName} Transactions
            </h2>
            <div className="space-x-2">
              <EditBankDialog selectedBank={selectedBank} />
              <DeleteBankDialog
                selectedBankId={selectedBank.id as number}
                setSelectedBank={setSelectedBank}
              />
            </div>
          </div>
          <Table>
            <TableCaption>
              Transactions for {selectedBank.accountBankName}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedBank.transactions.map((transaction: Transaction) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.transactionCategory}</TableCell>
                  <TableCell className="text-right">
                    {transaction.transactionValue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
