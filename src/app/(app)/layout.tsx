"use client";

import { ThemeButton } from "@/components/theme/theme-button";
import { ArrowLeftRight, Home, Landmark, Users2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/logout-button";

const links: { href: string; name: string; icon: React.ReactNode }[] = [
  { href: "/dashboard", name: "Dashboard", icon: <Home className="h-5 w-5" /> },
  { href: "/banks", name: "Banks", icon: <Landmark className="h-5 w-5" /> },
  {
    href: "/transactions",
    name: "Transactions",
    icon: <ArrowLeftRight className="h-5 w-5" />,
  },
  { href: "/settings", name: "Settings", icon: <Users2 className="h-5 w-5" /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <header className="sticky top-0 flex items-center justify-between h-16 gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex items-center gap-4 text-sm justify-center font-medium">
          <h1 className="text-lg font-bold border-r pr-4 -mt-0.5">
            Cashflow
            <span className="text-primary">App</span>
          </h1>
          {links.map((link) => (
            <Link
              data-active={pathname === link.href ? true : false}
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <nav className="flex gap-x-2">
          <ThemeButton />
          <LogoutButton />
        </nav>
      </header>
      <main className="container px-4 sm:px-8 max-w-screen-xl m-auto">
        {children}
      </main>
    </div>
  );
}
