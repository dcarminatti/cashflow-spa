import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banks | CashflowApp",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
