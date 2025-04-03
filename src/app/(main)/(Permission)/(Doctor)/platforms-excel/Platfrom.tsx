"use client";
import LodingButton from "@/components/LodingButton";
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
  DoctorOnlineValue,
  drplatformSchema,
  DrPlatFormValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Platfrom() {
  const { toast } = useToast();
  const form = useForm<DrPlatFormValue>({
    resolver: zodResolver(drplatformSchema),
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
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: DrPlatFormValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/drplatom-excel", {
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
  const [hs, seths] = useState(false);

  return (
    <div className="mx-auto space-y-6 rounded-2xl border bg-card p-10 shadow-xl">
      <Button
        type="button"
        className="mx-auto w-full text-center"
        onClick={() => seths(!hs)}
      >
        Row
      </Button>

      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
          <Table className={`${hs ? "w-[2000px]" : ""}`}>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">
                  Date for previous day
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
                                <SelectItem value="Dr.Abha">Dr.Abha</SelectItem>
                                <SelectItem value="Dr.Sonal">
                                  Dr.Sonal
                                </SelectItem>
                                <SelectItem value="Dr.Pratima">
                                  Dr.Pratima
                                </SelectItem>
                                <SelectItem value="Dr.Priti">
                                  Dr.Priti
                                </SelectItem>
                                <SelectItem value="Dr.Ram Parvesh">
                                  Dr.Ram Parvesh
                                </SelectItem>
                                <SelectItem value="Dr.Navdha">
                                  Dr.Navdha
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
