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
                      <SelectLabel>Dipartment</SelectLabel>
                      <SelectItem value="CENTER OPS MANAGER">
                        1) CENTER OPS MANAGER
                      </SelectItem>
                      <SelectItem value="HR">2) HR</SelectItem>
                      <SelectItem value="CASHIER">3) CASHIER</SelectItem>
                      <SelectItem value="RECEPTIONS">4) RECEPTIONS</SelectItem>
                      <SelectItem value="MEDICINE COUNTER">
                        5) MEDICINE COUNTER
                      </SelectItem>
                      <SelectItem value="HD / OD">6) HD / OD</SelectItem>
                      <SelectItem value="TELECALLER DEPT">
                        7) TELECALLER DEPT
                      </SelectItem>
                      <SelectItem value="MIXER">8) MIXER</SelectItem>
                      <SelectItem value="ECART">9) ECART</SelectItem>
                      <SelectItem value="DESIGNER">10) DESIGNER</SelectItem>
                      <SelectItem value="DIGITAL MARKETING">
                        11) DIGITAL MARKETING
                      </SelectItem>
                      <SelectItem value="DOCTOR">12) DOCTOR</SelectItem>
                      <SelectItem value="MAID / OFFICE BOY">
                        13) MAID / OFFICE BOY
                      </SelectItem>
                      <SelectItem value="GUARD">14) GUARD</SelectItem>
                      <SelectItem value="DRIVER">15) DRIVER</SelectItem>
                      <SelectItem value="ACCOUNTANT / INVENTORY">
                        16) ACCOUNTANT / INVENTORY
                      </SelectItem>
                      <SelectItem value="TRUST MARKETING">
                        17) TRUST MARKETING
                      </SelectItem>
                      <SelectItem value="SHOP RANCHI">
                        18) SHOP RANCHI
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
                      <SelectItem value="Ranchi">Ranchi</SelectItem>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                      <SelectItem value="Patna">Patna</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
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
