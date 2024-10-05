import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | CashflowApp",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
