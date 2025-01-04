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
  ecartSchema,
  EcartValue,
  exelSchema,
  ExelValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { date } from "zod";

export default function Exeldata() {
  const { toast } = useToast();
  const form = useForm<EcartValue>({
    resolver: zodResolver(ecartSchema),
    defaultValues: {
      date:"",
      task1: "",
      task2: "",
      task3: "",
      task4: "",
      task5: "",
      task6: "",
  
    },
  });

  const [ispending, setispending] = useState(false);
 

  const submithandler = async (value: ExelValue) => {
    try {
      setispending(true);
      
      // Prepare the data to send
      const requestData:any = {
        date:value.date,
        task1: value.task1,
        task2: value.task2,
        task3: value.task3,
        task4: value.task4,
        task5: value.task5,
        task6: value.task6,
      };
  
      
      const { data } = await axios.post("/api/ecart-ecel", requestData);
  
      form.reset();
      toast({
        description: data.message,
        variant: "default",
      });
  
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
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
              <TableHead className="border-2 border-blue-400">Please enter date for the previous day </TableHead>
                <TableHead className="border-2 border-blue-400">Amazon                </TableHead>
                <TableHead className="border-2 border-blue-400">
                Amount
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                Listing
                </TableHead>

                <TableHead className="border-2 border-blue-400">
                Flipkart
                </TableHead>
                <TableHead className="border-2 border-blue-400">Amount
                </TableHead>
                <TableHead className="border-2 border-blue-400">Listing</TableHead>
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
