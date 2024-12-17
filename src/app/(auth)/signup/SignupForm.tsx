"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema, SignupValues } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import LodingButton from "@/components/LodingButton";
import axios, { isAxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";

export default function SignupForm() {
  const router = useRouter();
  const [ispending, startTransation] = useState(false);
  const { toast } = useToast();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayname: "",
      email: "",
      dipartment: "",
      passwordHash: "",
    },
  });

  const submithandler = async (value: SignupValues) => {
    try {
      startTransation(true);
      await axios.post(`/api/signup`, {
        displayname: value.displayname,
        email: value.email,
        dipartment: value.dipartment,
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
          name="displayname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="dipartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dipartment</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dipartment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Dipartment</SelectLabel>
                      <SelectItem value="HR">1) HR</SelectItem>
                      <SelectItem value="BRANCH MANAGER / HR EXE">
                        2) BRANCH MANAGER / HR EXE
                      </SelectItem>
                      <SelectItem value="RECEPTIONS">3) RECEPTIONS</SelectItem>
                      <SelectItem value="CASHIER">4) CASHIER</SelectItem>
                      <SelectItem value="MEDICINE COUNTER + HD / OD">
                        5) MEDICINE COUNTER + HD / OD
                      </SelectItem>
                      <SelectItem value="(HD /OD + BOOKING) TELECALLER">
                        6) (HD /OD + BOOKING) TELECALLER
                      </SelectItem>
                      <SelectItem value="MIXER">7) MIXER</SelectItem>
                      <SelectItem value="E-COMMERCE + DIGITAL">
                        8) E-COMMERCE + DIGITAL
                      </SelectItem>
                      <SelectItem value="DOCTOR">9) DOCTOR</SelectItem>
                      <SelectItem value="MAID">10) MAID</SelectItem>
                      <SelectItem value="GUARD">11) GUARD</SelectItem>
                      <SelectItem value="DRIVER">12) DRIVER</SelectItem>
                      <SelectItem value="ACCOUNTANT / INVENTORY">
                        13) ACCOUNTANT / INVENTORY
                      </SelectItem>
                      <SelectItem value="TRUST">14) TRUST</SelectItem>
                      <SelectItem value="DIGITAL HEAD">
                        15) DIGITAL HEAD
                      </SelectItem>
                      <SelectItem value="MARKETING MANAGER">
                        16) MARKETING MANAGER
                      </SelectItem>
                      <SelectItem value="STAFF">17) STAFF</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
          Create account
        </LodingButton>
      </form>
    </Form>
  );
}




































































































