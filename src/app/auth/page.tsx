"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeButton } from "@/components/theme/theme-button";
import { useAuth } from "@/hooks/useAuth";
import type { TLogin, TRegister } from "@/lib/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const values: TLogin = {
      email: (event.currentTarget as HTMLFormElement).email.value,
      password: (event.currentTarget as HTMLFormElement).password.value,
    };

    const response = await login(values);
    if (response?.success) {
      toast.success(response.message);
      router.push("/dashboard");
    } else {
      toast.error(response?.message);
    }
  };

  const handleSubmitRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const values: TRegister = {
      email: (event.currentTarget as HTMLFormElement).email.value,
      password: (event.currentTarget as HTMLFormElement).password.value,
      name: (event.currentTarget as HTMLFormElement).name.value,
    };

    const response = await register(values);
    if (response?.success) {
      toast.success(response.message);
      setActiveTab("login");
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ThemeButton className="absolute top-4 right-4" />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Cashflow
            <span className="text-primary">App</span>
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login"
              ? "Login to your account"
              : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 dark:bg-muted-foreground/10 bg-muted-foreground/20">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmitLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmitRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="********"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            {activeTab === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
