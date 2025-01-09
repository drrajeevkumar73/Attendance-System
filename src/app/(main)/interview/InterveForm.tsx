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
import { UploadButton, UploadDropzone } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import axios from "axios";
import { date } from "zod";

export default function InterveForm() {
  const { toast } = useToast();
  const form = useForm<IntervewValue>({
    resolver: zodResolver(intervewSchema),
    defaultValues: {
      task1: "",
      task2: new Date(),
      task3: "",
      task4: "",
      task5: "",
      task6: "",
      task7: "",
      task8: "",
      task9: "",
      task10: "",
      task11: "",
      task12: new Date(),
      task13: "",
      task14: "",
      task15: "",
    },
  });

  const [ispending, setIsPending] = useState(false);
  const [img, setImg] = useState({
    panCard: [],
    aadharCard: [],
    DebitCard: [],
    YourPhoto: [],
  });

  const submithandler = async (value: IntervewValue) => {
    try {
      if (
        !img.panCard.length ||
        !img.aadharCard.length ||
        !img.DebitCard.length ||
        !img.YourPhoto.length
      ) {
        toast({
          description: "Please upload all the documents",
          variant: "destructive",
        });
        return; // Exit the function if validation fails
      }

      setIsPending(true);

      // API call
      const { data } = await axios.post("/api/uplodPhoto", {
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
        task15: value.task15,
        panCard: img.panCard,
        aadharCard: img.aadharCard,
        DebitCard: img.DebitCard,
        YourPhoto: img.YourPhoto,
      });

      // Reset form and image state
      form.reset({
        task1: "",
        task2: new Date(),
        task3: "",
        task4: "",
        task5: "",
        task6: "",
        task7: "",
        task8: "",
        task9: "",
        task10: "",
        task11: "",
        task12: new Date(),
        task13: "",
        task14: "",
        task15: "",
      });

      setImg({
        panCard: [],
        aadharCard: [],
        DebitCard: [],
        YourPhoto: [],
      });

      toast({
        description: data.message,
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "An error occurred during submission.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

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
                <FormLabel> Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Gender" {...field} />
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
            name="task6"
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
            name="task7"
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
            name="task8"
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
            name="task9"
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
            name="task10"
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
            name="task11"
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
            name="task12"
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
            name="task13"
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
            name="task14"
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
            name="task15"
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
          <p>Pan Card</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                panCard: res.map((file) => file.appUrl), // Map the uploaded files' URLs
              }));

              console.log("Files: ", res);
              toast({
                description: "Upload Completed",
                variant: "default",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast({
                description: "Upload Failed",
                variant: "default",
              });
            }}
          />
          <p>Aadhar Card</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                aadharCard: res.map((file) => file.appUrl), // Map the uploaded files' URLs
              }));
              // Do something with the response
              console.log("Files: ", res);
              toast({
                description: "Upload Completed",
                variant: "default",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast({
                description: "Upload Failed",
                variant: "default",
              });
            }}
          />
          <p>Debit or Credit Card</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                DebitCard: res.map((file) => file.appUrl), // Map the uploaded files' URLs
              }));
              console.log("Files: ", res);
              toast({
                description: "Upload Completed",
                variant: "default",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast({
                description: "Upload Failed",
                variant: "default",
              });
            }}
          />
          <p>Your Photo</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                YourPhoto: res.map((file) => file.appUrl), // Map the uploaded files' URLs
              }));
              console.log("Files: ", res);
              toast({
                description: "Upload Completed",
                variant: "default",
              });
            }}
            onUploadError={(error: Error) => {
              toast({
                description: "Upload Failed",
                variant: "destructive",
              });
            }}
          />
          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>
    </div>
  );
}
