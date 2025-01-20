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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { addDays, format } from "date-fns";
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
      task15: "",
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
      task26: "",
      task27: "",
      task28: "",
      task29: "",
      task30: "",
      task31: "",
      task32: "",
      task33: "",
      task34: "",
      task35: "",
      task36: "",
      task37: "",
      task38: "",
      task39: "",
      task40: "",
      task41: "",
      task42: "",
      task43: "",
      task44: "",
      task45: "",
      task46: "",
      task47: "",
      task48: "",
      task49: "",
      task50: "",
      task51: "",
      task52: "",
      task53: "",
      task54: "",
      task55: "",
      task56: "",
      task57: "",
      task58: "",
      task59: "",
      task60: "",
      task61: "",
        task62: "",
        task63: "",
        task64: "",
        task65: "",
        task66: "",
        task67: "",
        task68: "",
        task69: "",

      items1: false,
      items2: false,
      items3: false,
      items4: false,
      items5: false,
      items6: false,
      items7: false,
      items8: false,
      items9: false,
      items10: false,
      items11: false,
      items12: false,
      items13: false,
      items14: false,
      items15: false,

      reco1: "",
      reco2: "",
      reco3: "",
      reco4: "",

      ex1:"",
      ex2:"",
      ex3:""
    },
  });

  const [ispending, setIsPending] = useState(false);
  const [img, setImg] = useState({
    panCard: [],
    aadharCard: [],
    marksheet: [],
    YourPhoto: [],
    bancksheeding: [],
    localproff: [],
    parentAdhar: [],
  });

  const submithandler = async (value: IntervewValue) => {
    try {
      if (
        !img.panCard.length ||
        !img.aadharCard.length ||
        !img.marksheet.length ||
        !img.YourPhoto.length ||
        !img.bancksheeding.length ||
        !img.localproff.length ||
        !img.parentAdhar.length
      ) {
        toast({
          description: "Please upload all the documents",
          variant: "destructive",
        });
        return; // Exit the function if validation fails
      }

      if (value.task7 === value.task8) {
        toast({
          description: "Please add different number",
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
        task26: value.task26,
        task27: value.task27,
        task28: value.task28,
        task29: value.task29,
        task30: value.task30,
        task31: value.task31,
        task32: value.task32,
        task33: value.task33,
        task34: value.task34,
        task35: value.task35,
        task36: value.task36,
        task37: value.task37,
        task38: value.task38,
        task39: value.task39,
        task40: value.task40,
        task41: value.task41,
        task42: value.task42,
        task43: value.task43,
        task44: value.task44,
        task45: value.task45,
        task46: value.task46,
        task47: value.task47,
        task48: value.task48,
        task49: value.task49,
        task50: value.task50,
        task51: value.task51,
        task52: value.task52,
        task53: value.task53,
        task54: value.task54,
        task55: value.task55,
        task56: value.task56,
        task57: value.task57,
        task58: value.task58,
        task59: value.task59,
        task60: value.task60,
        task61: value.task61,
        task62:  value.task62,
        task63:  value.task63,
        task64:  value.task64,
        task65: value.task65,
        task66: value.task66,
        task67:  value.task67,
        task68:  value.task68,
        task69:  value.task69,

        items1: value.items1,
        items2: value.items2,
        items3: value.items3,
        items4: value.items4,
        items5: value.items5,
        items6: value.items6,
        items7: value.items7,
        items8: value.items8,
        items9: value.items9,
        items10: value.items10,
        items11: value.items11,
        items12: value.items12,
        items13: value.items13,
        items14: value.items14,
        items15: value.items15,

        reco1: value.reco1,
        reco2: value.reco2,
        reco3: value.reco3,
        reco4: value.reco4,

        ex1:value.ex1,
        ex2:value.ex2,
        ex3:value.ex3,

        panCard: img.panCard,
        aadharCard: img.aadharCard,
        marksheet: img.marksheet,
        YourPhoto: img.YourPhoto,
        bancksheeding: img.bancksheeding,
        localproff: img.localproff,
        parentAdhar: img.parentAdhar,
      });

      // Reset form and image state
      form.reset({
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
        task15: "",
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
        task26: "",
        task27: "",
        task28: "",
        task29: "",
        task30: "",
        task31: "",
        task32: "",
        task33: "",
        task34: "",
        task35: "",
        task36: "",
        task37: "",
        task38: "",
        task39: "",
        task40: "",
        task41: "",
        task42: "",
        task43: "",
        task44: "",
        task45: "",
        task46: "",
        task47: "",
        task48: "",
        task49: "",
        task50: "",
        task51: "",
        task52: "",
        task53: "",
        task54: "",
        task55: "",
        task56: "",
        task57: "",
        task58: "",
        task59: "",
        task60: "",
        task61: "",
        task62: "",
        task63: "",
        task64: "",
        task65: "",
        task66: "",
        task67: "",
        task68: "",
        task69: "",


        items1: false,
        items2: false,
        items3: false,
        items4: false,
        items5: false,
        items6: false,
        items7: false,
        items8: false,
        items9: false,
        items10: false,
        items11: false,
        items12: false,
        items13: false,
        items14: false,
        items15: false,

        reco1: "",
        reco2: "",
        reco3: "",
        reco4: "",

        ex1:"",
        ex2:"",
        ex3:""
      });

      setImg({
        panCard: [],
        aadharCard: [],
        marksheet: [],
        YourPhoto: [],
        bancksheeding: [],
        localproff: [],
        parentAdhar: [],
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
            Personal Details
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
              <FormItem>
                <FormLabel className="text-[19px]">D.O.B</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Dae of birth" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Age</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Age" />
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
            name="task5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task6"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Marital Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Unmarried">Unmarried</SelectItem>
                  </SelectContent>
                </Select>

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
                  Personal contact no 1
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder=" Personal contact no 1" />
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
                  Personal contact no 2
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Personal contact no 2" />
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
                <FormLabel className="text-[19px]">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
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
                <FormLabel className="text-[19px]">
                  Guardian&lsquo;s / Spouse name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder=" Guardian's / Spouse name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task11"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Guardian&apos;s contect no
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Guardian's contect no" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task12"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">
                  Local emergency contact no
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Local emergency contact no" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task13"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Language known</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Language known" />
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
                <FormLabel className="text-[19px]">
                  Computer knowledge
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Computer knowledge" />
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
            name="task16"
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
            Educational Details
          </h4>
          <FormField
            control={form.control}
            name="task17"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Qualification</FormLabel>
                <FormControl>
                  <Input {...field} placeholder=" List 1" />
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
                <FormControl>
                  <Input {...field} placeholder=" List 2" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task19"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder=" List 3 (OPTINAL)" />
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
                <FormControl>
                  <Input {...field} placeholder=" List 4 (OPTINAL)" />
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
                <FormLabel className="text-[19px]">Board / Institute</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
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
                <FormControl>
                  <Input {...field} placeholder="List 2" />
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
                <FormControl>
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
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
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
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
                <FormLabel className="text-[19px]">School / College</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
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
                <FormControl>
                  <Input {...field} placeholder="List 2" />
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
                  <Input {...field} placeholder="List 3 (OPTINAL)" />
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
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
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
                <FormLabel className="text-[19px]">Marks(%)</FormLabel>
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
                  <Input {...field} placeholder="List 2" />
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
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task33"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Year </FormLabel>
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
                  <Input {...field} placeholder="List 2" />
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
          <FormField
            control={form.control}
            name="task36"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Extra Certification Details
          </h4>
          <FormField
            control={form.control}
            name="task37"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Course</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
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
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
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
                <FormLabel className="text-[19px]">Institute</FormLabel>
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
                <FormLabel className="text-[19px]">Certificates</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
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
                <FormControl>
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
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
                <FormLabel className="text-[19px]">Year</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List 1" />
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
                  <Input {...field} placeholder="List 2 (OPTINAL)" />
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
            name="task45"
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
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
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
            name="task50"
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
            name="task51"
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
            name="task52"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task53"
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
            name="task54"
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
            name="task55"
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
            name="task56"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task57"
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
            name="task58"
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
            name="task59"
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
            name="task60"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task61"
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
            name="task62"
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
            name="task63"
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
            name="task64"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="List 4 (OPTINAL)" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Bank Details
          </h4>
          <FormField
            control={form.control}
            name="task65"
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
            name="task66"
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
            name="task67"
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
            name="task68"
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
            name="task69"
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
                marksheet: res.map((file) => file.appUrl), // Map the uploaded files' URLs
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
          <p>Passbook Photo</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                bancksheeding: res.map((file) => file.appUrl), // Map the uploaded files' URLs
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
          <p>Local Proof</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImg((prev: any) => ({
                ...prev, // Keep the other fields unchanged
                localproff: res.map((file) => file.appUrl), // Map the uploaded files' URLs
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
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            General Clinic SOP
          </h4>
          <FormField
            control={form.control}
            name="items1"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>1 week Off per week</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items2"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>2 week can be take along</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items3"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    NO week for New Joining within first 8 days
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items4"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    If Without Information Absenteeism found then 2 days
                    Attendence Deduction
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items5"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    If Emergency Leave taken (Absent), without document proof
                    will be facing Attendence Deduction
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items6"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    If anyone is not coming he/she should inform by Bam in the
                    morning. No Manager will call to cross check and it will b
                    mark as Absent
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items7"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    15 min buffer time for late coming as per your schedule
                    time, 3 LATE-1 half day
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items8"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>45 min of Break</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items9"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Personal Phone to be submitted</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items10"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Proper clean Dress up</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items11"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Proper Response to be given by all the Phones Handling team
                    on real time
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items12"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Daily 3 hours APP reporting</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items13"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Daily Cosing Reporting</FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items14"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Department or Personal WORK SOP to be followed
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="items15"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    No misbehaviour with other Staff or Patient
                  </FormLabel>
                </div>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
            Official
          </h4>
          <FormField
            control={form.control}
            name="reco1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Exit Date</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Exit Date" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reco2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Exit Reason</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="Exit Reason"
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
            name="ex1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">EMP Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Exit Date" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> 
           <FormField
            control={form.control}
            name="ex2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">DOJ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="DOJ" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> 
           <FormField
            control={form.control}
            name="ex3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">salary </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="salary " />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reco3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Location" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reco4"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[19px]">POST</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="POST" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>
    </div>
  );
}
