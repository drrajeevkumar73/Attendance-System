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
      const { data } = await axios.post("/api/offine-doctor-vew-deta", {
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
      <div className={`${roe?"":"2xl:w-[1100px] lg:w-[800px] overflow-auto"}`}>
      <Table className={`${roe ? "" : "w-[2300px]"}`}>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="border-2 border-blue-400">Date</TableHead>
            <TableHead className="border-2 border-blue-400">Doctor</TableHead>
            <TableHead className="border-2 border-blue-400">
              NEW PATIENT
            </TableHead>
            <TableHead className="border-2 border-blue-400">
              OLD PATIENT
            </TableHead>

            <TableHead className="border-2 border-blue-400">TOTAL PATIENT</TableHead>
            <TableHead className="border-2 border-blue-400">
              FEES
            </TableHead>
            <TableHead className="border-2 border-blue-400">
            WHATSAPP
            </TableHead>
            <TableHead className="border-2 border-blue-400">
              FOLLOW UP CALL
            </TableHead>
            <TableHead className="border-2 border-blue-400">ARTICLE</TableHead>
            <TableHead className="border-2 border-blue-400">CONTENT</TableHead>
            <TableHead className="border-2 border-blue-400">
              QUESTIONNAIRE
            </TableHead>
            <TableHead className="border-2 border-blue-400">
              CASE HISTORY
            </TableHead>
            <TableHead className="border-2 border-blue-400">CAMP </TableHead>
            <TableHead className="border-2 border-blue-400">Time</TableHead>
          </TableRow>
        </TableHeader>

        {loding ? (
          // Loading message
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="">
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : data?.length === 0 ? (
          // No Data Found message
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="">
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          // Data rendering
          data?.map((v: any, i) => (
            <TableBody className="border border-primary" key={i}>
              <TableRow>
                <TableCell className="border-2 border-blue-400">
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
                  {Number(v.task2)+Number(v.task3)}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task4}
                </TableCell>
               
                <TableCell className="border-2 border-blue-400">
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
                <TableCell className="border-2 border-blue-400">
                  {v.task12}
                </TableCell>
                <TableCell className="border-2 border-blue-400">
                  {v.task13}
                </TableCell>

                <TableCell className="border-2 border-blue-400">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
      </div>
    </>
  );
}
