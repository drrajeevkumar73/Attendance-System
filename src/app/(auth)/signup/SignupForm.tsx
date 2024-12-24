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
      cityR: "",
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
        cityR:value.cityR,
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
                    <SelectLabel className="text-green-500">All City</SelectLabel>
                    <SelectItem value="Core"> Core</SelectItem>
                      <SelectLabel>Dipartment</SelectLabel>
                      <SelectItem value="CENTER OPS MANAGER">
                         CENTER MANAGER
                      </SelectItem>
                      <SelectItem value="HR"> HR</SelectItem>
                      <SelectItem value="CASHIER"> CASHIER</SelectItem>
                      <SelectItem value="RECEPTIONS">RECEPTIONS</SelectItem>
                      <SelectItem value="MEDICINE COUNTER">
                       MEDICINE COUNTER
                      </SelectItem>
                      <SelectItem value="HD / OD">HD / OD</SelectItem>
                      <SelectItem value="TELECALLER DEPT">
                       TELECALLER DEPT
                      </SelectItem>
                      <SelectItem value="MIXER"> MIXER</SelectItem>
                      <SelectItem value="ECART"> ECART</SelectItem>
                      <SelectItem value="DESIGNER"> DESIGNER</SelectItem>
                      <SelectItem value="DIGITAL MARKETING">
                         DIGITAL MARKETING
                      </SelectItem>
                      <SelectItem value="DOCTOR"> DOCTOR</SelectItem>
                      <SelectItem value="MAID / OFFICE BOY">
                         MAID / OFFICE BOY
                      </SelectItem>
                      <SelectItem value="GUARD"> GUARD</SelectItem>
                      <SelectItem value="DRIVER"> DRIVER</SelectItem>
                      <SelectItem value="ACCOUNTANT">
                         ACCOUNTANT
                      </SelectItem>
                      <SelectItem value="INVENTORY">
                         INVENTORY
                      </SelectItem>
                      <SelectItem value="TRUST MARKETING">
                         TRUST MARKETING
                      </SelectItem>
                      <SelectItem value="SHOP RANCHI">
                         SHOP RANCHI
                      </SelectItem>
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
          name="cityR"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>City</SelectLabel>
                      <SelectItem value="RANCHI">RANCHI</SelectItem>
                      <SelectItem value="RANCHI SHOP">RANCHI SHOP</SelectItem>
                      <SelectItem value="PATNA">PATNA</SelectItem>
                      <SelectItem value="KOLKATA">KOLKATA</SelectItem>
                        <SelectItem value="GAUR CITY">GAUR CITY</SelectItem>
                      <SelectItem value="SPECTRUM">SPECTRUM</SelectItem>
                      <SelectItem value="JAGTAULI">JAGTAULI</SelectItem>
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
