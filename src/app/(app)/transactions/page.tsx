import { NewTransactionDialog } from "./_components/new-transaction-dialog";

export default function TransactionsPage() {
  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">Your Transactions</h1>
        <NewTransactionDialog />
      </div>
    </div>
  );
}
