"use client";
import { useToast } from "@/hooks/use-toast";
import {
  addtaskUsernameSchema,
  AddtaskUsernameValue,
  desiginerSchema,
  DesugnerValue,
  RevenueTrackerValue,
  revenutrackerSchema,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import LodingButton from "@/components/LodingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";

export default function Exceldata() {
  const { toast } = useToast();
  const form = useForm<DesugnerValue>({
    resolver: zodResolver(desiginerSchema),
    defaultValues: {
      date:"",
      task1: "",
      task2: "",
      task3: "",
      task4: "",
      task5: "",
      task6: "",
      task7: "",
      task8: "",
      task9: "",
      task10: "",
      task11: "",
      task12: "",
    },
  });
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: DesugnerValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/designer-excel", {
        date:value.date,
        task1: value.task1,
        task2: value.task2,
        task3: value.task3,
        task4: value.task4,
        task5: value.task5,
        task6: value.task6,
        task7: value.task7,
        task8: value.task8,
        task9: value.task9,
        task10: value.task10,
        task11: value.task11,
        task12: value.task12,
      });
      form.reset();
      toast({
        description: data.message,
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };

  return (
    <>
      <div className="mx-auto overflow-auto rounded-2xl border bg-card p-10 shadow-xl lg:w-[800px] 2xl:w-[1100px]">
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(submithandler)}
          >
            <Table className="w-[2300px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">Please enter date for the previous day </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  VIDEO COUNT
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  VIDEO MADE
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  EXPORT
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  DOWNLOAD
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  EDITING
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  YouTube
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  Reel / short
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  Banner
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  Send to DR, Rajeev&lsquo;s sir (date)
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  INSTAGRAM POST
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  FACEBOOK POST
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  YOUTUBE POST
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                <TableCell className="border-2 border-blue-400">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task1"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task2"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task3"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>

                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task4"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task5"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task6"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task7"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>

                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task8"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task9"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task10"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task11"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task12"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="border-foreground" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <LodingButton loding={ispending} type="submit" className="w-full">
              Submit
            </LodingButton>
          </form>
        </Form>
      </div>
    </>
  );
}
