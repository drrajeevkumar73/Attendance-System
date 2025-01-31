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
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { date } from "zod";

export default function ExcelData() {
  const { toast } = useToast();
  const form = useForm<ExelValue>({
    resolver: zodResolver(exelSchema),
    defaultValues: {
      date: "",
      task1: "",
      task2: "",
      task3: "",
      task4: "",
      task5: "",
      task6: "",
      task7: "",
    },
  });

  const [ispending, setispending] = useState(false);

  const submithandler = async (value: ExelValue) => {
    try {
      setispending(true);

      // Prepare the data to send
      const requestData: any = {
        date: value.date,
        task1: value.task1,
        task2: value.task2,
        task3: value.task3,
        task4: value.task4,
        task5: value.task5,
        task6: value.task6,
        task7: value.task7,
      };

      const { data } = await axios.post("/api/exel", requestData);

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
  const [indexsex, seindexsec] = useState(0);

  const handlechange = () => {
    seindexsec(0);
  };
  const handlechangeSec = () => {
    seindexsec(1);
  };

  const form2 = useForm<PlatFormValue>({
    resolver: zodResolver(platformSchema),
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
      task12: "",
      task13: "",
    },
  });
  const submithandlerTwo=async(value:PlatFormValue)=>{
    try {
      setispending(true);

      // Prepare the data to send
      const requestData: any = {
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
        task12: value.task12,
        task13: value.task13,
      };

      const { data } = await axios.post("/api/platform", requestData);

      form2.reset();
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
  }
  return (
    <>
      <div className={`${indexsex == 0 ? "block" : "hidden"}`}>
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(submithandler)}
          >
            <Table className="w-[1800px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2 border-blue-400">
                    Please enter date for the previous day{" "}
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Data Dies
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Incoming
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Outgoing
                  </TableHead>

                  <TableHead className="border-2 border-blue-400">
                    Whatsapp / Text
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Appt
                  </TableHead>

                  <TableHead className="border-2 border-blue-400">
                    Fees
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    New Patient
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
                      name="task3"
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
                      name="task4"
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
                      name="task5"
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
                      name="task6"
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
                      name="task7"
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
                </TableRow>
              </TableBody>
            </Table>
            <LodingButton loding={ispending} type="submit" className="w-full">
              Submit
            </LodingButton>
          </form>
        </Form>
      </div>
      <div className={`${indexsex == 1 ? "block" : "hidden"}`}>
        <Form {...form2}>
          <form
            className="space-y-3"
            onSubmit={form2.handleSubmit(submithandlerTwo)}
          >
            <Table className="w-[1800px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2 border-blue-400">
                    Please enter date for the previous day{" "}
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Data Dies
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Incoming
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Outgoing
                  </TableHead>

                  <TableHead className="border-2 border-blue-400">
                    Whatsapp / Text
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    Appt
                  </TableHead>

                  <TableHead className="border-2 border-blue-400">
                    Fees
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    New Patient
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    FB LEAD
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    FB LEAD CONVERT
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    FB FEE
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                    JB
                  </TableHead>
                  <TableHead className="border-2 border-blue-400">
                  APPELOO
                  </TableHead>
                  <TableHead className="border-2 border-blue-400 uppercase">
                  purchase
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    <FormField
                      control={form2.control}
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
                      control={form2.control}
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
                      control={form2.control}
                      name="task2"
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
                      control={form2.control}
                      name="task3"
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
                      control={form2.control}
                      name="task4"
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
                      control={form2.control}
                      name="task5"
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
                      control={form2.control}
                      name="task6"
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
                      control={form2.control}
                      name="task7"
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
                      control={form2.control}
                      name="task8"
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
                      control={form2.control}
                      name="task9"
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
                      control={form2.control}
                      name="task10"
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
                      control={form2.control}
                      name="task11"
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
                      control={form2.control}
                      name="task12"
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
                      control={form2.control}
                      name="task13"
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
                </TableRow>
              </TableBody>
            </Table>
            <LodingButton loding={ispending} type="submit" className="w-full">
              Submit
            </LodingButton>
          </form>
        </Form>
      </div>

      <div className="mt-7 flex gap-7">
        <Button
          onClick={handlechange}
          className={`${indexsex == 0 ? "bg-gray-500 hover:bg-gray-500" : ""} `}
        >
          Calling
        </Button>
        <Button
          onClick={handlechangeSec}
          className={`${indexsex == 1 ? "bg-gray-500 hover:bg-gray-500" : ""} `}
        >
          Platform
        </Button>
      </div>
    </>
  );
}
