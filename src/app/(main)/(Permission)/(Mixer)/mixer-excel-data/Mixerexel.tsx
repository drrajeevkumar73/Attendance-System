"use client";
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
import { useToast } from "@/hooks/use-toast";
import {
  MediceneValue,
  medicenSchema,
  mixerSchema,
  MixerValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Mixerexel() {
  const { toast } = useToast();
  const form = useForm<MixerValue>({
    resolver: zodResolver(mixerSchema),
    defaultValues: {
      date: "",
      task1: "",
      task2: "",
      task3: "",
      task4: "",
      task5: "",
      task6: "",
    },
  });
  const [ispending, setispending] = useState(false);

  const submithandler = async(value:MixerValue) => {
    try {
        setispending(true);
        const { data } = await axios.post("/api/mixe-excel-data", {
            date:value.date,
            task1: value.task1,
            task2: value.task2,
            task3: value.task3,
            task4: value.task4,
            task5: value.task5,
            task6: value.task6
           
        });
        form.reset();
        toast({
            description: data.message,
            variant: "default",
        });
    } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "Something went wrong";
        toast({
          description: errorMessage,
          variant: "destructive",
        });
    }finally{
        setispending(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
        <Table>
          <TableHeader>
            <TableRow className="border border-primary bg-primary">
              <TableHead className="border-2 border-blue-400">
                Please enter date for the previous day
              </TableHead>
              <TableHead className="border-2 border-blue-400">
                Medicine Name
              </TableHead>
              <TableHead className="border-2 border-blue-400">QTY</TableHead>
              <TableHead className="border-2 border-blue-400">
                Order by{" "}
              </TableHead>

              <TableHead className="border-2 border-blue-400">
                Marg Entry{" "}
              </TableHead>
              <TableHead className="border-2 border-blue-400">
                Breakge{" "}
              </TableHead>
              <TableHead className="border-2 border-blue-400">
                Marg Entry by{" "}
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
            </TableRow>
          </TableBody>
        </Table>

        <LodingButton loding={ispending} type="submit" className="w-full">
          Submit
        </LodingButton>
      </form>
    </Form>
  );
}
