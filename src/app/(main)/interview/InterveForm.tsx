"use client";
import LodingButton from "@/components/LodingButton";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  exelSchema,
  ExelValue,
  intervewSchema,
  IntervewValue,
} from "@/lib/vallidation";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function InterveForm() {
  const { toast } = useToast();
  const form = useForm<IntervewValue>({
    resolver: zodResolver(intervewSchema),
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

  const submithandler = () => {};

  return (
    <div className="w-full space-y-6 rounded-md border p-5 shadow-inner">
      <Image src={Logo} width={300} height={200} alt="" className="mx-auto" />

      <h1 className="text-center text-2xl font-bold">
        Interview Application Form
      </h1>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(submithandler)}>
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Personal Detail
          </h4>
          <FormField
            control={form.control}
            name="task1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[19px]">D.O.B</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto w-full opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task3"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Place of Birth</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Place of Birth"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task4"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Marital Status</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Marital Status" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task5"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Father&apos;s / Spouse name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Father's / Spouse name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task6"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Personal contact no.
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Personal contact no." />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task7"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Guardian&apos;s contect no.
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Guardian's contect no." />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task8"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Current address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Current address"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Permanent address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Permanent address"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Education Detailes
          </h4>

          <FormField
            control={form.control}
            name="task7"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Highest qualification
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Highest qualification" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[19px]">Year of Passing</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto w-full opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Institute / University name
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Institute / University name"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Marks(%)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Marks(%)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Any other training / certificates
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Any other training / certificates"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Required Documents
          </h4>
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Upload Pan Card</FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Upload Aadhar Card
                </FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Upload Debit or Credit Card
                </FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task9"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Upload your own photo
                </FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
