"use client";
import { useToast } from "@/hooks/use-toast";
import {
  AccountValue,
  addtaskUsernameSchema,
  AddtaskUsernameValue,
  desiginerSchema,
  DesugnerValue,
  ecaountantSchema,
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

export default function Account() {
  const { toast } = useToast();
  const form = useForm<AccountValue>({
    resolver: zodResolver(ecaountantSchema),
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
      task70: "",
      task71: "",
      task72: "",
      task73: "",
      task74: "",
      task75: "",
      task76: "",
      task77: "",
      task78: "",
      task79: "",
      task80: "",
      task81: "",
      task82: "",
      task83: "",
      task84: "",
      task85: "",
      task86: "",
      task87: "",
      task88: "",
      task89: "",
      task90: "",
      task91: "",
      task92: "",
      task93: "",
      task94: "",
      task95: "",
      task96: "",
      task97: "",
      task98: "",
      task99: "",
      task100: "",
      task101: "",
      task102: "",
      task103: "",
      task104: "",
      task105: "",
      task106: "",
      task107: "",
      task108: "",
      task109: "",
      task110: "",
      task111: "",
      task112: "",
      task113: "",
      task114: "",
      task115: "",
      task116: "",
      task117: "",
      task118: "",
      task119: "",
      task120: "",
      task121: "",
      task122: "",
      task123: "",
      task124: "",
      task125: "",
    },
  });
  const [ispending, setispending] = useState(false);
  const submithandler = async (value: AccountValue) => {
    try {
        setispending(true);
        const { data } = await axios.post("/api/accountant-excel", {
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
          <TableHeader>
            <TableRow className="flex-col border border-primary bg-gray-200">
              <TableHead className="border-2 border-blue-400 font-bold text-red-500">
                ACCOUNT
              </TableHead>
              <TableHead
                className="border-2 border-blue-400 font-bold text-black"
                colSpan={5}
              >
                CENTER{" "}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-2 border-blue-400"></TableCell>
              <TableCell className="border-2 border-blue-400">
                RANCHI{" "}
              </TableCell>
              <TableCell className="border-2 border-blue-400">PATNA</TableCell>
              <TableCell className="border-2 border-blue-400">
                KOLKATA
              </TableCell>
              <TableCell className="border-2 border-blue-400">JAG</TableCell>
              <TableCell className="border-2 border-blue-400">DELHI</TableCell>
            </TableRow>
            <TableRow className="bg-primary">
              <TableCell className="border-2 border-blue-400 font-bold text-black">
                JOB DESCRIPTION
              </TableCell>
              <TableCell
                className="border-2 border-blue-400 font-bold text-amber-950"
                colSpan={5}
              >
                CHECKLIST - REPORT
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-2 border-blue-400">
                Date for previous day
              </TableCell>
              <TableCell className="border-2 border-blue-400" colSpan={5}>
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
              <TableCell className="border-2 border-blue-400">
                Closing
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
                  name="task3"
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
                  name="task4"
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
                  name="task5"
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
              <TableCell className="border-2 border-blue-400">
                Last day UPI check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task6"
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
                  name="task7"
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
                  name="task8"
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
                  name="task9"
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
                  name="task10"
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
              <TableCell className="border-2 border-blue-400">
                Reception UPI
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task11"
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
                  name="task12"
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
                  name="task13"
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
                  name="task14"
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
                  name="task15"
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
              <TableCell className="border-2 border-blue-400">
                Dues Copy check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task16"
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
                  name="task17"
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
                  name="task18"
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
                  name="task19"
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
                  name="task20"
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
              <TableCell className="border-2 border-blue-400">
                Loose Medicine Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task21"
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
                  name="task22"
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
                  name="task23"
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
                  name="task24"
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
                  name="task25"
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
              <TableCell className="border-2 border-blue-400">
                Lab report Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task26"
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
                  name="task27"
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
                  name="task28"
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
                  name="task29"
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
                  name="task30"
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
              <TableCell className="border-2 border-blue-400">
                All Excel Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task31"
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
                  name="task32"
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
                  name="task33"
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
                  name="task34"
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
                  name="task35"
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
              <TableCell className="border-2 border-blue-400">
                Stock Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task36"
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
                  name="task37"
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
                  name="task38"
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
                  name="task39"
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
                  name="task40"
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
              <TableCell className="border-2 border-blue-400">
                Stock Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task41"
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
                  name="task42"
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
                  name="task43"
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
                  name="task44"
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
                  name="task45"
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
              <TableCell className="border-2 border-blue-400">
                Purchase Check
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task46"
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
                  name="task47"
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
                  name="task48"
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
                  name="task49"
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
                  name="task50"
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
              <TableCell className="border-2 border-blue-400">
                Purchase Report
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task51"
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
                  name="task52"
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
                  name="task53"
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
                  name="task54"
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
                  name="task55"
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
              <TableCell className="border-2 border-blue-400">
                Purchase Register
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task56"
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
                  name="task57"
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
                  name="task58"
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
                  name="task59"
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
                  name="task60"
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
              <TableCell className="border-2 border-blue-400">
                Purchase File
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task61"
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
                  name="task62"
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
                  name="task63"
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
                  name="task64"
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
                  name="task65"
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
              <TableCell className="border-2 border-blue-400">
                Bill Entry in Register
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task66"
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
                  name="task67"
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
                  name="task68"
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
                  name="task69"
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
                  name="task70"
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
              <TableCell className="border-2 border-blue-400">
                Purchase Excel
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task71"
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
                  name="task72"
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
                  name="task73"
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
                  name="task74"
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
                  name="task75"
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
              <TableCell className="border-2 border-blue-400">
                Cheque Payment
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task76"
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
                  name="task77"
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
                  name="task78"
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
                  name="task79"
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
                  name="task80"
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
              <TableCell className="border-2 border-blue-400">
                Daily A/C works
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task81"
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
                  name="task82"
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
                  name="task83"
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
                  name="task84"
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
                  name="task85"
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
              <TableCell className="border-2 border-blue-400">
                Daily CA works
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task86"
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
                  name="task87"
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
                  name="task88"
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
                  name="task89"
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
                  name="task90"
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
              <TableCell className="border-2 border-blue-400">
                All Statment Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task91"
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
                  name="task92"
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
                  name="task93"
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
                  name="task94"
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
                  name="task95"
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
              <TableCell className="border-2 border-blue-400">
                All Paper and File Work
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task96"
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
                  name="task97"
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
                  name="task98"
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
                  name="task99"
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
                  name="task100"
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
              <TableCell className="border-2 border-blue-400">
                Party Ledger Book Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task101"
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
                  name="task102"
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
                  name="task103"
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
                  name="task104"
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
                  name="task105"
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
              <TableCell className="border-2 border-blue-400">
                W/S Ledger Book Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task106"
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
                  name="task107"
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
                  name="task108"
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
                  name="task109"
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
                  name="task110"
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
              <TableCell className="border-2 border-blue-400">
                W/S Ledger Register Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task111"
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
                  name="task112"
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
                  name="task113"
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
                  name="task114"
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
                  name="task115"
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
              <TableCell className="border-2 border-blue-400">
                W/S Ledger Payment Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task116"
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
                  name="task117"
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
                  name="task118"
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
                  name="task119"
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
                  name="task120"
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
              <TableCell className="border-2 border-blue-400">
                All Purchase Update
              </TableCell>
              <TableCell className="border-2 border-blue-400">
                <FormField
                  control={form.control}
                  name="task121"
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
                  name="task122"
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
                  name="task123"
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
                  name="task124"
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
                  name="task125"
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
          </TableBody>
        </Table>
        <LodingButton loding={ispending} type="submit" className="w-full">
          Submit
        </LodingButton>
      </form>
    </Form>
  );
}
