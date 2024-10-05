"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="px-12 py-8">
      <h1 className="text-2xl font-medium">
        Bem vindo{" "}
        <span className="text-primary">{user?.user.name ?? "usuário"}</span>
      </h1>
    </div>
  );
}
