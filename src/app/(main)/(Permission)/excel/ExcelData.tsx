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

export default function ExcelData() {
  const { toast } = useToast();
  const form = useForm<ExelValue>({
    resolver: zodResolver(exelSchema),
    defaultValues: {
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
  const submithandler = async (value: ExelValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/exel", {
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
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
          <Table>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">Data</TableHead>
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
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
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
              </TableRow>
              <TableRow>
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
                  {" "}
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
                  {" "}
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
                  {" "}
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
                  {" "}
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
