import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { useBank } from "@/hooks/useBank";
import { useUser } from "@/hooks/useUser";
import type { BankAccount } from "@/lib/types/bank-account";
import { toast } from "sonner";

export function DeleteBankDialog({
  selectedBankId,
  setSelectedBank,
}: {
  selectedBankId: number;
  setSelectedBank: (bank: BankAccount | null) => void;
}) {
  const { user } = useUser();
  const { removeBank } = useBank();

  const handleDeleteBank = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/bank-account/${selectedBankId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.ok) {
        removeBank(selectedBankId);
        setSelectedBank(null);
        toast.success("Bank account deleted successfully");
      } else {
        toast.error("Failed to delete bank account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete Bank
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your bank
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBank}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
