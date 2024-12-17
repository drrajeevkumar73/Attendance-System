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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calenderSchema, CalederValue } from "@/lib/vallidation";
import axios from "axios";
import { useState } from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "../ui/table";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

interface classNameProps {
  className?: string;
}

export default function Calender({ className }: classNameProps) {
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });

  const [data, setdata] = useState<[]>();
  const [totalpresent, setPresent] = useState<number>();
  const [loding, setloding] = useState(false);

  const onSubmit = async (monthname: CalederValue) => {
    try {
      setloding(true);
      const data = await axios.post("/api/dashbord", { monthname });

      setdata(data.data.data);
      setPresent(data.data.totalPresent);
    } catch (error) {
    } finally {
      setloding(false);
    }
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
                  Check Your Work History By Selecting Month Name.{" "}
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

      <Card>
        <CardHeader>
          <CardTitle>
            Full Name: &nbsp;&nbsp;
            <span className="text-primary">{user.displayname}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Department : &nbsp;&nbsp;
            <span className="text-primary">{user.dipartment}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Total present in this month : &nbsp;&nbsp;
            <span className="text-primary">{totalpresent}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Table>
        <TableHeader className="border border-primary">
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Work</TableHead>
            <TableHead className="text-right">Time</TableHead>
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
                <TableCell className="font-medium">
                  {formatRelativeMonthDate(v.createdAt)}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words">
                  {v.content}
                </TableCell>
                <TableCell className="text-right">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
    </>
  );
}
