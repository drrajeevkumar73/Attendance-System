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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import {
  CalederValue,
  calenderSchema,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LodingButton from "@/components/LodingButton";
import { useToast } from "@/hooks/use-toast";
export default function Vewdata() {
  const [ispending, setispending] = useState(false);
  const { toast } = useToast();

  const form2 = useForm<SerchValue>({
    resolver: zodResolver(serchSchema),
    defaultValues: {
      username: "",
      monthname: "",
    },
  });

  const [showloding, setsholoding] = useState(false);
  const [datal, setdatal] = useState([]);
  const onSubmitData = async (valeu: SerchValue) => {
    try {
      setsholoding(true);
      const { data } = await axios.post("/api/vew-revenu-tracker", {
        username: valeu.username,
        monthname: valeu.monthname,
      });

      setdatal(data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setsholoding(false);
    }
  };

  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-20">
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(onSubmitData)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form2.control}
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="italic text-muted-foreground">
                    {user.displayname}{" "}
                  </span>{" "}
                  Check clinic data.
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select by month or today" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form2.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select city name</FormLabel>
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
                        <SelectItem value="RANCHI">RANCHI</SelectItem>
                        <SelectItem value="RANCHI SHOP">RANCHI SHOP</SelectItem>
                        <SelectItem value="PATNA">PATNA</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LodingButton loding={showloding} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>
      <Table>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="border-2 border-blue-400">Date</TableHead>
            <TableHead className="border-2 border-blue-400">City</TableHead>
            <TableHead colSpan={2} className="border-2 border-blue-400">
              <p className="mt-3 text-center">PURCHASE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around gap-6 py-2">
                <p className="">AMOUNT</p>
                <p className="">QTY</p>
              </div>
            </TableHead>

            <TableHead colSpan={1} className="border-2 border-blue-400">
              <p className="mt-3 text-center">SALE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around py-2">
                <p className="">AMOUNT</p>
              </div>
            </TableHead>

            <TableHead colSpan={1} className="border-2 border-blue-400">
              <p className="mt-3 text-center">SALE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around py-2">
                <p className="">QTY</p>
              </div>
            </TableHead>

            <TableHead colSpan={4} className="border-2 border-blue-400">
              <p className="mt-3 text-center">SALE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around gap-8 py-2">
                <p className="">RETAIL</p>
                <p className="">WHOLESALE</p>
                <p className="">LOOSE</p>
                <p className="">LAB</p>
              </div>
            </TableHead>

            <TableHead className="border-2 border-blue-400 text-right">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>

        {showloding ? (
          <TableBody>
            <TableRow>
              <TableCell className="w-full">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : datal?.length ? (
          datal.map((v: any, i) => (
            <TableBody className="border border-primary" key={i}>
              <TableRow>
                <TableCell className="border-2 border-blue-400 font-medium">
                  {formatRelativeMonthDate(v.createdAt)}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task1}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task2}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task3}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task4}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task5}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task6}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {" "}
                  {v.task7}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task8}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task9}
                </TableCell>

                <TableCell className="w-[200px] border-2 border-blue-400 text-right">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        ) : (
          <TableBody>
            <TableRow>
              <TableCell className="w-full">No any task</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}
