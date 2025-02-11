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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import { CalederValue, calenderSchema } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function Vewdata() {
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });
  const [loding, setloding] = useState(false);
  const [data, setdata] = useState<any[]>();
  const [roe, serow] = useState(false);
  const onSubmit = async (value: CalederValue) => {
    try {
      setloding(true);
      const { data } = await axios.post("/api/vew-platmofms", {
        monthname: value,
      });
      setdata(data);
    } catch (error) {
    } finally {
      setloding(false);
    }
  };
  const handlerRow = () => {
    serow(!roe);
  };
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="italic text-muted-foreground">
                    {user.displayname}
                  </span>{" "}
                  Check Your Excel History By Selecting Month Name.{" "}
                </FormLabel>
                <Select
                  onValueChange={(monthname: any) => onSubmit(monthname)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button onClick={handlerRow}>Row</Button>
      <div
        className={`${roe ? "" : "overflow-auto lg:w-[800px] 2xl:w-[1100px]"}`}
      >
        <Table  className={`${roe ? "w-[2000px]" : ""}`}>
        <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">
                Date
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Doctor
                </TableHead>
                <TableHead colSpan={4} className="border-2 border-blue-400">
                  <p className="mt-3 text-center">INTELITICKS</p>
                  <p className="mt-2 w-full border border-blue-500"></p>
                  <div className="flex items-center justify-around py-2">
                    <p className="">LEAD</p>
                    <p className="">NATIONAL CHAT</p>
                    <p className="">INTERNATIONAL CHAT</p>
                    <p className="">CONVERSION</p>
                  </div>
                </TableHead>

                <TableHead colSpan={3} className="border-2 border-blue-400">
                  <p className="mt-3 text-center">FB</p>
                  <p className="mt-2 w-full border border-blue-500"></p>
                  <div className="flex items-center justify-around py-2">
                    <p className="">LEAD</p>
                    <p className="">REPLY</p>
                    <p className="">CONVERSION</p>
                  </div>
                </TableHead>
                <TableHead colSpan={3} className="border-2 border-blue-400">
                  <p className="mt-3 text-center">INTERKART</p>
                  <p className="mt-2 w-full border border-blue-500"></p>
                  <div className="flex items-center justify-around py-2">
                    <p className="">LEAD</p>
                    <p className="">REPLY</p>
                    <p className="">CONVERSION</p>
                  </div>
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                Time
                </TableHead>
              </TableRow>
            </TableHeader>


          {loding ? (
            <TableBody>
              <TableRow>
                <TableCell className="w-full">Loading...</TableCell>
              </TableRow>
            </TableBody>
          ) : data?.length ? (
            data.map((v: any, i) => (
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
                  <TableCell className="border-2 border-blue-400">
                    {v.task10}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    {v.task11}
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
    </>
  );
}
