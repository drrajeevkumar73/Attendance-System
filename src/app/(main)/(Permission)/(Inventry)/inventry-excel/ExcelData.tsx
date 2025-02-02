"use client";
import LodingButton from "@/components/LodingButton";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  addtaskSchema,
  AddtaskValue,
  exelSchema,
  ExelValue,
  platformSchema,
  PlatFormValue,
  RevenueTrackerValue,
  revenutrackerSchema,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { date } from "zod";

export default function ExcelData() {
  const { toast } = useToast();
  const [ispending, setispending] = useState(false);
  const form = useForm<RevenueTrackerValue>({
    resolver: zodResolver(revenutrackerSchema),
    defaultValues: {
      date: "",
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
    },
  });
  const submithandler = async (value: RevenueTrackerValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/revenue-tacker", {
        date: value.date,
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
      });
      form.reset();
      toast({
        description: data.message,
        variant: "default",
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };
  return (
    <div className="mx-auto overflow-auto rounded-2xl border bg-card p-10 shadow-xl">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
          <Table>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">
                  Date for previous day
                </TableHead>
                <TableHead className="border-2 border-blue-400">City</TableHead>
                <TableHead colSpan={2} className="border-2 border-blue-400">
                  <p className="mt-3 text-center">PURCHASE</p>
                  <p className="mt-2 w-full border border-blue-500"></p>
                  <div className="flex items-center justify-around py-2">
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
                  <div className="flex items-center justify-around py-2">
                    <p className="">RETAIL</p>
                    <p className="">WHOLESALE</p>
                    <p className="">LOOSE</p>
                    <p className="">LAB</p>
                  </div>
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
                    name="task1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="RANCHI">RANCHI</SelectItem>
                                <SelectItem value="RANCHI SHOP">
                                  RANCHI SHOP
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task3"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task4"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task5"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task6"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task7"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task8"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
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
                    name="task9"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-foreground"
                            {...field}
                            type="number"
                          />
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
  );
}
