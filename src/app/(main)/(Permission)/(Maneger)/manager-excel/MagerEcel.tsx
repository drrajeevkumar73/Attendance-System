"use client";
import { useToast } from "@/hooks/use-toast";
import {
  AccountValue,
  addtaskUsernameSchema,
  AddtaskUsernameValue,
  desiginerSchema,
  DesugnerValue,
  ecaountantSchema,
  managerSchema,
  MangerValue,
  RevenueTrackerValue,
  revenutrackerSchema,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
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
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function MagerEcel() {
  const { toast } = useToast();
  const form = useForm<MangerValue>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      date: "",
      task1: "",
      task2: false,
      task3: "",
      task4: false,
      task5: "",
      task6: false,
      task7: "",
      task8: false,
      task9: "",
      task10: false,
      task11: "",
      task12: false,
      task13: "",
      task14: false,
      task15: "",
      task16: false,
      task17: "",
      task18: false,
      task19: "",
      task20: false,
      task21: "",
      task22: false,
      task23: "",
      task24: false,
      task25: "",
      task26: false,
      task27: "",
      task28: false,
      task29: "",
      task30: false,
      task31: "",
      task32: false,
      task33: "",
      task34: false,
      task35: "",
      task36: false,
      task37: "",
      task38: false,
      task39: "",
      task40: false,
      task41: "",
      task42: false,
      task43: "",
      task44: false,
      task45: "",
      task46: false,
      task47: "",
      task48: false,
      task49: "",
      task50: false,
      task51: "",
      task52: false,
      task53: "",
      task54: false,
      task55: "",
      task56: false,
      task57: "",
      task58: false,
      task59: "",
      task60: false,
      task61: "",
      task62: false,
      task63: "",
      task64: false,
      task65: "",
      task66: false,
      task67: "",
      task68: false,
      task69: "",
      task70: false,
      task71: "",
      task72: false,
      task73: "",
      task74: false,
      task75: "",
      task76: false,
      task77: "",
      task78: false,
      task79: "",
      task80: false,
      task81: "",
      task82: false,
      task83: "",
      task84: false,
      task85: "",
      task86: false,
      task87: "",
      task88: false,
      task89: "",
      task90: false,
      task91: "",
      task92: false,
      task93: "",
      task94: false,
      task95: "",
      task96: false,
      task97: "",
      task98: false,
      task99: "",
      task100: false,
      task101: "",
      task102: false,
      task103: "",
      task104: false,
      task105: "",
      task106: false,
      task107: "",
      task108: false,
      task109: "",
      task110: false,
      task111: "",
      task112: false,
      task113: "",
      task114: false,
      task115: "",
      task116: false,
      task117: "",
      task118: false,
      task119: "",
      task120: false,
      task121: "",
      task122: false,
      task123: "",
      task124: false,
      task125: "",
      task126: false,
      task127: "",
      task128: false,
      task129: "",
      task130: false,
      task131: "",
      task132: false,
      task133: "",
      task134: false,
      task135: "",
      task136: false,
      task137: "",
      task138: false,
      task139: "",
      task140: false,
      task141: "",
      task142: false,
      task143: "",
      task144: false,
      task145: "",
      task146: false,
    
    },
  });
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: MangerValue) => {
   
    try {
      setispending(true);
      const { data } = await axios.post("/api/manager-excel", {
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
        task62: value.task62,
        task63: value.task63,
        task64: value.task64,
        task65: value.task65,
        task66: value.task66,
        task67: value.task67,
        task68: value.task68,
        task69: value.task69,
        task70: value.task70,
        task71: value.task71,
        task72: value.task72,
        task73: value.task73,
        task74: value.task74,
        task75: value.task75,
        task76: value.task76,
        task77: value.task77,
        task78: value.task78,
        task79: value.task79,
        task80: value.task80,
        task81: value.task81,
        task82: value.task82,
        task83: value.task83,
        task84: value.task84,
        task85: value.task85,
        task86: value.task86,
        task87: value.task87,
        task88: value.task88,
        task89: value.task89,
        task90: value.task90,
        task91: value.task91,
        task92: value.task92,
        task93: value.task93,
        task94: value.task94,
        task95: value.task95,
        task96: value.task96,
        task97: value.task97,
        task98: value.task98,
        task99: value.task99,
        task100: value.task100,
        task101: value.task101,
        task102: value.task102,
        task103: value.task103,
        task104: value.task104,
        task105: value.task105,
        task106: value.task106,
        task107: value.task107,
        task108: value.task108,
        task109: value.task109,
        task110: value.task110,
        task111: value.task111,
        task112: value.task112,
        task113: value.task113,
        task114: value.task114,
        task115: value.task115,
        task116: value.task116,
        task117: value.task117,
        task118: value.task118,
        task119: value.task119,
        task120: value.task120,
        task121: value.task121,
        task122: value.task122,
        task123: value.task123,
        task124: value.task124,
        task125: value.task125,
        task126: value.task126,
        task127: value.task127,
        task128: value.task128,
        task129: value.task129,
        task130: value.task130,
        task131: value.task131,
        task132: value.task132,
        task133: value.task133,
        task134: value.task134,
        task135: value.task135,
        task136: value.task136,
        task137: value.task137,
        task138: value.task138,
        task139: value.task139,
        task140: value.task140,
        task141: value.task141,
        task142: value.task142,
        task143: value.task143,
        task144: value.task144,
        task145: value.task145,
        task146: value.task146,
      
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
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="border-2 border-blue-400 bg-gray-200 font-bold">
                S.no
              </TableCell>
              <TableCell className="border-2 border-blue-400 bg-gray-200 font-bold">
                Details
              </TableCell>
              <TableCell className="border-2 border-blue-400 bg-gray-200 font-bold">
                Status
              </TableCell>
              <TableCell className="border-2 border-blue-400 bg-gray-200 font-bold">
                Check
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-2 border-blue-400">
                Date for previous day
              </TableCell>
              <TableCell className="border-2 border-blue-400" colSpan={2}>
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
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                1)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Attendtence
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task79"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task80"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                2)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Attendtence Of All Branch
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task145"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task146"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                3)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Last day Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                4)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Excel Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task3"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                5)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Register update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task5"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                6)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Patient Numbering vs Target
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task7"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task8"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                7)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Last day Report all department
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task9"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task10"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                8)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Stock Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task11"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task12"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                9)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                RK Making
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task13"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task14"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                10)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Short Medicine Register Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task15"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task16"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                11)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Manual Bill Book Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task17"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task18"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                12)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Requiered Local Medicine Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task19"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task20"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                13)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Other center Billing for Despatch
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task21"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task22"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                14)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Department Daily SOP follow up & Checking
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task23"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task24"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                15)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                RW Medicine Order as per date{" "}
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task25"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task26"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                16)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                INDIAN Medicine Order as per date
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task27"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task28"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                17)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Purchase Register Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task29"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task30"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                18)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Purchase File Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task31"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task32"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                19)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All medicine Availibity
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task33"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task34"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                20)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                RK requierment check + Making
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task35"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task36"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                21)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                RK - Pond Availibility - 2 Month{" "}
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task37"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task38"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                22)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                RK - Medicine Availibility - 2 Month
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task39"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task40"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                23)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Container Availibility
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task41"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task42"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                24)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Sticker Availibility
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task43"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task44"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                25)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Managers Today WORK PLAN
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task45"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task46"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                26)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Managers TOMORROW WORK PLAN
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task47"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task48"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                27)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staff Productivity Tracker
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task49"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task50"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                28)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staff Performanece Tracker
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task51"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task52"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                29)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Pending Work Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task53"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task54"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                30)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Weekly Audit or Review Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task55"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task56"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                31)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Floor Staff Managment
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task57"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task58"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                32)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Patient Managment
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task59"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task60"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                33)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Work Review Presentation Weekly
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task61"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task62"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                34)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staff Productivity Tracker
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task63"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task64"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                35)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staff Performanece Tracker
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task65"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task66"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                36)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Calling Connect + Revenue Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task67"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task68"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                37)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Dr Performanece Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task69"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task70"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                38)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Pending Work Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task71"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task72"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                39)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Data wise Call Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task73"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task74"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                40)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Delivery Stat Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task75"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task76"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                41)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Weekly Audit or Review Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task77"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task78"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
           {" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                42)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Departmentwise Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task81"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task82"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                43)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Daywise + Departmentwise + Staffwise Work Plan
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task83"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task84"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                44)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Closing Ready
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task85"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task86"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                45)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staffwise Work Distrubution
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task87"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task88"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                46)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Center Daily Work Status
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task89"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task90"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                47)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Staff Productivity Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task91"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task92"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                48)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Other center All report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task93"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task94"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                49)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Track on Routine Work + Pending Work
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task95"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task96"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                50)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Pending Work Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task97"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task98"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                51)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Last day Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task99"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task100"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                52)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Follow Up Transfer
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task101"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task102"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>{" "}
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                53)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Follow Up Call Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task103"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task104"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                54)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Follow Up screenshot
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task105"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task106"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                55)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Confirmation call
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task107"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task108"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                56)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Confirmation Call report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task109"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task110"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                57)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Register update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task111"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task112"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                58)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Last day UPI check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task113"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task114"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                59)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Daily + Hourly Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task115"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task116"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                60)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Closing Report & Cash
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task117"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task118"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                61)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Bulk Whatsapp
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task119"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task120"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                62)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Counter Patient Handling
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task121"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task122"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                63)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Excel Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task123"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task124"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                64)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Camp Data report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task125"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task126"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                65)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Review Collection
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task127"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task128"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                66)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Home Delivery Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task129"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task130"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                67)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Out Delivery Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task131"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task132"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                68)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Online Patient Medicine Tracker
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task133"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task134"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                69)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Online Patient Medicine Follow up
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task135"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task136"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                70)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                Old Online Patient Follow Up
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task137"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task138"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                71)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                International Online Patient Follow Up
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task139"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task140"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                72)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Social Media Track and Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task141"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task142"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                73)
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                All Register update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task143"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="task144"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-[80px] w-[166px]"
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
