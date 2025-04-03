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
      task8: "",
      contect: "",
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
        task8: value.task8,
        contect: value.contect,
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

  return (
    <>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
          <Table className="w-[1800px]">
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">
                  Please enter date for the previous day{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Data Dial{" "}
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
                <TableHead className="border-2 border-blue-400">Appt</TableHead>

                <TableHead className="border-2 border-blue-400">Fees</TableHead>
                <TableHead className="border-2 border-blue-400">
                  New Patient
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Enquiry{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                Connect
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
                    name="contect"
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
    </>
  );
}
