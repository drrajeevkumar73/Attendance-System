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
  doctorOnlineSchema,
  DoctorOnlineValue,
  MediceneValue,
  medicenSchema,
  receptiomSchema,
  ReceptopValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Onlinedoctor() {
  const { toast } = useToast();
  const form = useForm<DoctorOnlineValue>({
    resolver: zodResolver(doctorOnlineSchema),
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
      task13: "",
      task14: "",
      task15:""
    },
  });
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: DoctorOnlineValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/online-doctor-excel", {
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
        task14: value.task14,
        task15:value.task15
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
        <Table className="w-[3000px]">
          <TableHeader>
            <TableRow className="border border-primary bg-primary">
              <TableHead className="border-2 border-blue-400" colSpan={2}>Doctor</TableHead>
              <TableHead className="border-2 border-blue-400">
              Interakt
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              INTL - LEADS
              </TableHead>

              <TableHead className="border-2 border-blue-400" >INTL - NATIONAL</TableHead>
              <TableHead className="border-2 border-blue-400" >
              INTL - INTERNATIONAL
              </TableHead>
              <TableHead className="border-2 border-blue-400" >NATIONAL - FEES</TableHead>
              <TableHead className="border-2 border-blue-400" >
              INTERNATIONAL - FEES
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              NATIONAL - MED
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              INTERNATIONAL - MED
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              MAIL
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              VIDEO
              </TableHead>
              <TableHead className="border-2 border-blue-400" >
              FB - REPLY
              </TableHead>
              <TableHead className="border-2 border-blue-400" >FB - Conversion </TableHead>
              <TableHead className="border-2 border-blue-400" >INT - REPLY</TableHead>
              <TableHead className="border-2 border-blue-400" >INT - Conversion</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow >
              <TableCell className="border-2 border-blue-400"  colSpan={2}>
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
                              <SelectItem value="Dr.Ansari">
                                Dr.Ansari
                              </SelectItem>
                              <SelectItem value="Dr.Rahul">Dr.Rahul</SelectItem>
                              <SelectItem value="Dr.Priti">Dr.Priti</SelectItem>
                              <SelectItem value="Dr.Ram Parvesh">
                                Dr.Ram Parvesh
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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

              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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

              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
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
              <TableCell className="border-2 border-blue-400" >
                <FormField
                  control={form.control}
                  name="task14"
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
              <TableCell className="border-2 border-blue-400" >
                <FormField
                  control={form.control}
                  name="task15"
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
