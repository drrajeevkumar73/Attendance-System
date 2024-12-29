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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DoctorOffineValue,
  doctorOfflineSchema,
  MediceneValue,
  medicenSchema,
  receptiomSchema,
  ReceptopValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Hdexcel() {
  const { toast } = useToast();
  const form = useForm<DoctorOffineValue>({
    resolver: zodResolver(doctorOfflineSchema),
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
      task13: "",
    },
  });
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: DoctorOffineValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/hd-od-excel", {
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
    } catch (error:any) {
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
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
        <Table className="w-[2300px]">
          <TableHeader>
            <TableRow className="border border-primary bg-primary">
            <TableHead className="border-2 border-blue-400">Please enter date for the previous day</TableHead>
              <TableHead className="border-2 border-blue-400">O.G</TableHead>
              <TableHead className="border-2 border-blue-400">
              IN
              </TableHead>
              <TableHead className="border-2 border-blue-400">
               HD. ORDER
              </TableHead>

              <TableHead className="border-2 border-blue-400">HD DISP</TableHead>
              <TableHead className="border-2 border-blue-400">
              HD AMT
              </TableHead>
              <TableHead className="border-2 border-blue-400"> PRES - Send</TableHead>
              <TableHead className="border-2 border-blue-400">
              OD. ORDER
              </TableHead>
              <TableHead className="border-2 border-blue-400">
              OD DISP
              </TableHead>
              <TableHead className="border-2 border-blue-400">
              OD PENDING
              </TableHead>
              <TableHead className="border-2 border-blue-400">
              MANUAL SENT
              </TableHead>
              <TableHead className="border-2 border-blue-400">
              LOOSE Medi
              </TableHead>
              <TableHead className="border-2 border-blue-400">
              OD AMT
              </TableHead>
              <TableHead className="border-2 border-blue-400">FRIGHT </TableHead>
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
  );
}
