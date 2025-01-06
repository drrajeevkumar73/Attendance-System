"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { CalederValue, calenderSchema } from "@/lib/vallidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
export default function Vewdata() {
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });
  const [loding, setloding] = useState(false);
  const [data, setdata] = useState<any[]>();

  const onSubmit = async (value: CalederValue) => {
    try {
      setloding(true);
      const { data } = await axios.post("/api/account-vew", {
        monthname: value,
      });
      setdata(data);
    } catch (error) {
    } finally {
      setloding(false);
    }
  };
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="italic text-muted-foreground">
                    {user.displayname}
                  </span>{" "}
                  Check Your Excel History By Selecting Month Name.{" "}
                </FormLabel>
                <Select
                  onValueChange={(monthname: any) => onSubmit(monthname)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
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
            <TableCell className="border-2 border-blue-400">RANCHI </TableCell>
            <TableCell className="border-2 border-blue-400">PATNA</TableCell>
            <TableCell className="border-2 border-blue-400">KOLKATA</TableCell>
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

          {loding ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="">
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : data?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="">
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            data?.map((v: any, i) => (
              <>
                <TableRow className="bg-yellow-300">
                  <TableCell className="border-2 border-blue-400">
                    Date
                  </TableCell>
                  <TableCell className="border-2 border-blue-400" colSpan={5}>
                    {formatRelativeMonthDate(v.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Closing
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                  {v.task1}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                  {v.task2}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                  {v.task3}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task4}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task5}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Last day UPI check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task6}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task7}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task8}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task9}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task10}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Reception UPI
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                  {v.task11}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task12}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task13}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task14}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task15}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Dues Copy check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task16}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task17}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task18}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task19}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task20}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Loose Medicine Check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task21}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task22}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task23}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task24}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task25}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Lab report Check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task26}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task27}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task28}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task29}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task30}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    All Excel Report
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task31}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task32}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task33}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task34}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task35}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Stock Check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task36}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task37}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task38}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task39}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task40}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Stock Report
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task41}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task42}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task43}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task44}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task45}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Purchase Check
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task46}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task47}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task48}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task49}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task50}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Purchase Report
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task51}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task52}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task53}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task54}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task55}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Purchase Register
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task56}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task57}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task58}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task59}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task60}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Purchase File
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task61}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task62}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task63}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task64}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task65}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Bill Entry in Register
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task66}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task67}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task68}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task69}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task70}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Purchase Excel
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task71}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task72}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task73}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task74}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task75}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Cheque Payment
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task76}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task77}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task78}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task79}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task80}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Daily A/C works
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task81}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task82}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task83}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task84}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task85}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Daily CA works
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task86}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task87}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task88}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task89}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task90}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    All Statment Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task91}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task92}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task93}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task94}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task95}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    All Paper and File Work
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task96}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task97}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task98}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task99}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task100}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    Party Ledger Book Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task101}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task102}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task103}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task104}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task105}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    W/S Ledger Book Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task106}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task107}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task108}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task109}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task110}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    W/S Ledger Register Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task111}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task112}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task113}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task114}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task115}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    W/S Ledger Payment Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task116}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task117}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task118}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task119}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task120}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="border-2 border-blue-400">
                    All Purchase Update
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task121}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task122}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task123}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task124}
                  </TableCell>
                  <TableCell className="border-2 border-blue-400">
                     {v.task125}
                  </TableCell>

                </TableRow>
                <TableRow className="bg-green-200">
                  <TableCell className="border-2 border-blue-400">
                    Time
                  </TableCell>
                  <TableCell className="border-2 border-blue-400" colSpan={5}>
                  {formatRelativeTime(v.createdAt)}
                  </TableCell>
                </TableRow>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
