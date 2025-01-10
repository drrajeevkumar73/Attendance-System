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
import { UploadDropzone } from "@/lib/util/uploadthing";

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

      task16: "",
      task17: "",
      task18: "",
      task19: "",
      task20: "",

      task21: "",
      task22: "",
      task23: "",
      task24: "",
      task25: "",
       task26:"",
        task27: "",
        task28: "",
        task29:"",
        task30: "",
        task31: "",
        task32:"",
        task34: "",
        task35: "",
        task36:"",
        task37: "",
        task38: "",
        task39:"",
        task40: "",
        task41: "",
        task42:"",
        task43: "",
        task44: "",
        task45:"",
        task46: "",
        task47: "",
        task48:"",
        task49: "",
        task50: "",
    },
  });

  const [ispending, setIsPending] = useState(false);
  const [img, setImg] = useState({
    panCard: [],
    aadharCard: [],
    DebitCard: [],
    YourPhoto: [],
    parentAdhar: [],
    ParentPancard: [],
  });

  const submithandler = async (value: IntervewValue) => {
    try {
      if (
        !img.panCard.length ||
        !img.aadharCard.length ||
        !img.DebitCard.length ||
        !img.YourPhoto.length ||
        !img.parentAdhar.length ||
        !img.ParentPancard.length 
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

        task16: value.task16,
        task17: value.task17,
        task18: value.task18,
        task19: value.task19,
        task20: value.task20,

        task21: value.task21,
        task22: value.task22,
        task23: value.task23,
        task24: value.task24,
        task25: value.task25,
        task26:value.task26,
        task27: value.task27,
        task28: value.task28,
        task29:value.task29,
        task30: value.task30,
        task31: value.task31,
        task32:value.task32,
        task34: value.task34,
        task35: value.task35,
        task36:value.task36,
        task37: value.task37,
        task38: value.task38,
        task39:value.task39,
        task40: value.task40,
        task41: value.task41,
        task42:value.task42,
        task43: value.task43,
        task44: value.task44,
        task45:value.task45,
        task46: value.task46,
        task47: value.task47,
        task48:value.task48,
        task49: value.task49,
        task50: value.task50,
        panCard: img.panCard,
        aadharCard: img.aadharCard,
        DebitCard: img.DebitCard,
        YourPhoto: img.YourPhoto,
        parentAdhar:img.parentAdhar,
        ParentPancard:img.ParentPancard
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

        task16: "",
        task17: "",
        task18: "",
        task19: "",
        task20: "",

        task21: "",
        task22: "",
        task23: "",
        task24: "",
        task25: "",
        task26:"",
        task27: "",
        task28: "",
        task29:"",
        task30: "",
        task31: "",
        task32:"",
        task34: "",
        task35: "",
        task36:"",
        task37: "",
        task38: "",
        task39:"",
        task40: "",
        task41: "",
        task42:"",
        task43: "",
        task44: "",
        task45:"",
        task46: "",
        task47: "",
        task48:"",
        task49: "",
        task50: "",
      });

      setImg({
        panCard: [],
        aadharCard: [],
        DebitCard: [],
        YourPhoto: [],
        parentAdhar: [],
        ParentPancard: [],
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

      <h1 className="text-center text-2xl font-bold">Staff Onboarding Form</h1>

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
              <FormItem className="flex flex-col" >
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
            name="task21"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Personal contact no 2.
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Personal contact no 2." />
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
            name="task22"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Guardian&apos;s contect no 2.
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Guardian's contect no 2." />
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
                Highest Qualification
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
            name="task23"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  List School(s) and college(s)
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task24"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task25"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task26"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Major Course of Study
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task27"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task28"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task29"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Grade / Level Completed
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task30"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task31"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task32"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Degree Obtained</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task34"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task35"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Work Experience
          </h4>
          <FormField
            control={form.control}
            name="task36"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Company / Organization
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task37"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task38"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task39"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Designation</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task40"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task41"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task42"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">From</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task43"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task44"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task45"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">To</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task46"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task47"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task48"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Ctc / Monthly</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task49"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task50"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
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
            name="task16"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Employee Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Employee Name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task17"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bank Name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task18"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Account Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Account Number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="task19"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">IFSC Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="IFSC Code" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task20"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Bank Branch</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bank Branch" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Upload Your Documents
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
                variant: "destructive",
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
                variant: "destructive",
              });
            }}
          />
          <p>Marksheet</p>
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
                variant: "destructive",
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
      
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Upload Your Parent&lsquo;s Documents
          </h4>

          <p>Parent&lsquo;s Aadhar Card</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                parentAdhar: res.map((file) => file.appUrl), // Map the uploaded files' URLs
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
              <p>Parent&lsquo;s Pan Card</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                ParentPancard: res.map((file) => file.appUrl), // Map the uploaded files' URLs
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
