"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Camera, User2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export default function SettingsPage() {
  const { user } = useUser();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleUpdateProfile = async (data: z.infer<typeof profileSchema>) => {
    console.log(data);
  };

  return (
    <div className="mt-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative border rounded-full w-24 h-24 flex items-center justify-center">
            <User2 className="size-16" />
            <Button
              className="absolute -bottom-2 -right-2 rounded-full"
              size="icon"
            >
              <Camera className="size-5" />
            </Button>
          </div>
          <Form {...form}>
            <form className="grid grid-cols-3 gap-x-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={user?.user.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={() => form.handleSubmit(handleUpdateProfile)}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
