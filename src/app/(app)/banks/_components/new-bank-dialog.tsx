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

const newBankSchema = z.object({
  accountBankName: z.string().min(3).max(100),
  accountAgency: z.string().min(4).max(6),
  accountNumber: z.string().min(7).max(9),
  accountBalance: z.coerce.number().min(0),
  accountType: z.string(),
});

export function NewBankDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { addBank } = useBank();

  const form = useForm<z.infer<typeof newBankSchema>>({
    resolver: zodResolver(newBankSchema),
    defaultValues: {
      accountBankName: "",
      accountAgency: "",
      accountNumber: "",
      accountBalance: 0,
      accountType: "CURRENT",
    },
  });

  const onSubmit = async (values: z.infer<typeof newBankSchema>) => {
    const newBankAccount: BankAccount = {
      id: null,
      accountBankName: values.accountBankName,
      accountAgency: values.accountAgency,
      accountNumber: values.accountNumber,
      accountBalance: values.accountBalance,
      accountType: values.accountType as AccountType,
      transactions: [],
    };

    try {
      const response = await fetch(config.apiUrl + "/bank-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(newBankAccount),
      });

      if (!response.ok) {
        toast.error("Failed to add bank account");
      } else {
        const data = await response.json();
        toast.success("Bank account added successfully");
        addBank(data);
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new bank</DialogTitle>
          <DialogDescription>
            Add a new bank to your account to start tracking your transactions.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2">
            <FormField
              control={form.control}
              name="accountBankName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nubank"
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
              name="accountAgency"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Agency</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0000"
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
              name="accountNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-0"
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
              name="accountBalance"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="$0.00"
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
              name="accountType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "accountType",
                          value as "CURRENT" | "SAVINGS"
                        )
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="CURRENT">Current</SelectItem>
                          <SelectItem value="SAVINGS">Savings</SelectItem>
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
