"use client";
import LodingButton from "@/components/LodingButton";
import { PasswordInput } from "@/components/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, LoginValues } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const [ispending, startTransation] = useState(false);
  const { toast } = useToast();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      passwordHash: "",
    },
  });

  const submithandler = async (value: LoginValues) => {
    try {
      startTransation(true);
      await axios.post(`/api/login`, {
        email: value.email,
        passwordHash: value.passwordHash,
      });
      router.push("/");

      startTransation(false);
    } catch (error) {
      startTransation(false);
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        toast({
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordHash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LodingButton loding={ispending} type="submit" className="w-full">
          Login
        </LodingButton>
      </form>
    </Form>
  );
}
