"use client";
import { useToast } from "@/hooks/use-toast";
import {
  addtaskUsernameSchema,
  AddtaskUsernameValue,
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

export default function RevenuTracker() {
  const { toast } = useToast();
  const form = useForm<RevenueTrackerValue>({
    resolver: zodResolver(revenutrackerSchema),
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
      task13:"",
     
    },
  });
  const submithandler = async (value: RevenueTrackerValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/revenue-tacker", {
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
        task13: value.task13,
      
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
  const [ispending, setispending] = useState(false);

  const form2 = useForm<SerchValue>({
    resolver: zodResolver(serchSchema),
    defaultValues: {
      username: "",
      monthname: "",
    },
  });
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");

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
     
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setsholoding(false);
    }
  };

  const exportToExcel = () => {
    if (!datal || datal?.length === 0) {
      toast({
        description: "No data to export",
        variant: "destructive",
      });
      return;
    }
    const excelData = datal.map((v: any) => ({
      Date: formatRelativeMonthDate(v.createdAt),
      City: v.task1,
      "PURCHASE :- AMOUNT": v.task2,
      "PURCHASE :- QTY": v.task3,
      "SALE :- AMOUNT": v.task4,
      "SALE :- QTY": v.task5,
      "SALE :- RETAIL": v.task6,
      "SALE :- WHOLESALE": v.task7,
      "SALE :- LOOSE": v.task8,
      "SALE :- LAB": v.task9,
      "RECEPTION :- FEE": v.task10,
      "RECEPTION :- NEW": v.task11,
      "TOTAL :- PATIENT": v.task12,
      "NEW :- PATIENT": v.task13,
      Time: formatRelativeTime(v.createdAt),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${"City"}`);

    // Write to file
    XLSX.writeFile(workbook, `City.xlsx`);
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
                <TableHead className="border-2 border-blue-400">
                    Date for previous day
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    City
                  </TableHead>
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
                  <TableHead colSpan={2} className="border-2 border-blue-400">
                    <p className="mt-3 text-center">RECEPTION</p>
                    <p className="mt-2 w-full border border-blue-500"></p>
                    <div className="flex items-center justify-around py-2">
                      <p className="">FEE</p>
                      <p className="">NEW</p>
                      
                  
                    </div>
                  </TableHead>

                  <TableHead colSpan={1} className="border-2 border-blue-400">
                    <p className="mt-3 text-center">TOTAL</p>
                    <p className="mt-2 w-full border border-blue-500"></p>
                    <div className="flex items-center justify-around py-2">
                      <p className="">PATIENT</p>
                    </div>
                  </TableHead>

                  <TableHead colSpan={1} className="border-2 border-blue-400">
                    <p className="mt-3 text-center">NEW</p>
                    <p className="mt-2 w-full border border-blue-500"></p>
                    <div className="flex items-center justify-around py-2">
                      <p className="">PATIENT</p>
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
                                  <SelectItem value="PATNA">PATNA</SelectItem>
                                  <SelectItem value="KOLKATA">
                                    KOLKATA
                                  </SelectItem>
                                  <SelectItem value="GAUR CITY">
                                    GAUR CITY
                                  </SelectItem>
                                  <SelectItem value="SPECTRUM">
                                    SPECTRUM
                                  </SelectItem>
                                  <SelectItem value="JAGTAULI">
                                    JAGTAULI
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
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form.control}
                      name="task10"
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
                      name="task11"
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
                      name="task12"
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
                      name="task13"
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

      <div className="mt-20 flex w-full justify-center space-y-20">
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
            <LodingButton loding={showloding} type="submit" className="w-full">
              Submit
            </LodingButton>
          </form>
        </Form>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={exportToExcel}
          className="rounded bg-blue-500 p-2 text-white"
        >
          {" "}
          Export to Excel
        </button>
      </div>
      <Table className="mt-44">
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="border-2 border-blue-400">Date</TableHead>
            <TableHead className="border-2 border-blue-400">City</TableHead>
            <TableHead colSpan={2} className="border-2 border-blue-400">
              <p className="mt-3 text-center">PURCHASE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center gap-6 justify-around py-2">
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
              <div className="flex items-center  justify-around py-2">
                <p className="">QTY</p>
              </div>
            </TableHead>

            <TableHead colSpan={4} className="border-2 border-blue-400">
              <p className="mt-3 text-center">SALE</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center  gap-8 justify-around py-2">
                <p className="">RETAIL</p>
                <p className="">WHOLESALE</p>
                <p className="">LOOSE</p>
                <p className="">LAB</p>

              </div>
            </TableHead>
            <TableHead colSpan={2} className="border-2 border-blue-400">
              <p className="mt-3 text-center">RECEPTION</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center  gap-8 justify-around py-2">
                <p className="">FEE</p>
                <p className="">NEW</p>

              </div>
            </TableHead>

            <TableHead colSpan={1} className="border-2 border-blue-400">
              <p className="mt-3 text-center">TOTAL</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around py-2">
                <p className="">PATIENT</p>
              </div>
            </TableHead>

            <TableHead colSpan={1} className="border-2 border-blue-400">
              <p className="mt-3 text-center">NEW</p>
              <p className="mt-2 w-full border border-blue-500"></p>
              <div className="flex items-center justify-around py-2">
                <p className="">PATIENT</p>
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
    </>
  );
}
