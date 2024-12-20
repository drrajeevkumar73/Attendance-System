"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  autoserchSchema,
  AutoSerchValue,
  serchSchema,
  SerchValue,
  SignupValues,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LodingButton from "@/components/LodingButton";
import { useToast } from "@/hooks/use-toast";

export default function Ratework() {
  const { toast } = useToast();
  const [ispending, setispending] = useState(false);
  const form = useForm<SerchValue>({
    resolver: zodResolver(serchSchema),
    defaultValues: {
      username: "",
      monthname: "",
    },
  });
  const [client, setclient] = useState({
    Patna: [],
    Kolkata: [],
    Delhi: [],
    Ranchi: [],
  });

  const selctor = async () => {
    const { data } = await axios.get("/api/allclient");

    setclient({
      Patna: data.Patna,
      Kolkata: data.Kolkata,
      Delhi: data.Delhi,
      Ranchi: data.Ranchi,
    });
  };
  useEffect(() => {
    selctor();
  }, []);

  const onSubmit = async (value: SerchValue) => {
    try {
      setispending(true);
    const {data}=  await axios.post("/api/ratework", {
        username: value.username,
        monthname:value.monthname
      });
      toast({
        description:data.message,
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Faild to send deta",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serch by name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select by name" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel className="text-green-500">
                          Ranchi Staff name
                        </SelectLabel>
                        {client?.Ranchi.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          Patna Staff name
                        </SelectLabel>
                        {client?.Patna.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          Kolkata Staff name
                        </SelectLabel>
                        {client?.Kolkata.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}

                        <SelectLabel className="text-green-500">
                          Delhi Staff name
                        </SelectLabel>
                        {client?.Delhi.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
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
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Give permission to staff to write tasks/work.</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"true"}>Open</SelectItem>
                        <SelectItem value={"false"}>Close</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>
    </>
  );
}
