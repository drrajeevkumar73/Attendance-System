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
import { useCallback, useEffect, useState } from "react";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Check } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment-timezone";
export default function Vewdata() {
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });
  const [loding, setloding] = useState(false);


  const onSubmit = async (value: CalederValue) => {
    try {
      setloding(true);
      const { data } = await axios.post("/api/manager-vew", {
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
  const [data, setdata] = useState<any[]>();



 
  const exportStyledExcel = (data: any) => {
    if (!data || data.length === 0) return;
  
    // Static headers
    const detailsList = [
      { name: "Attendtence", status: "task79", check: "task80" },
      { name: "Attendtence Of All Branch", status: "task145", check: "task146" },
      { name: "All Last day Report", status: "task1", check: "task2" },
      { name: "All Excel Report", status: "task3", check: "task4" },
      { name: "All Register update", status: "task5", check: "task6" },
      { name: "Patient Numbering vs Target", status: "task7", check: "task8" },
      { name: "Last day Report all department", status: "task9", check: "task10" },
      { name: "Stock Report", status: "task11", check: "task12" },
      { name: "RK Making", status: "task13", check: "task14" },
      { name: "Short Medicine Register Update", status: "task15", check: "task16" },
      { name: "Manual Bill Book Check", status: "task17", check: "task18" },
      { name: "Requiered Local Medicine Report", status: "task19", check: "task20" },
      { name: "Other center Billing for Despatch", status: "task21", check: "task22" },
      { name: "All Department Daily SOP follow up & Checking", status: "task23", check: "task24" },
      { name: "RW Medicine Order as per date", status: "task25", check: "task26" },
      { name: "INDIAN Medicine Order as per date", status: "task27", check: "task28" },
      { name: "Purchase Register Check", status: "task29", check: "task30" },
      { name: "Purchase File Check", status: "task31", check: "task32" },
      { name: "All medicine Availibity", status: "task33", check: "task34" },
      { name: "RK requierment check + Making", status: "task35", check: "task36" },
      { name: "RK - Pond Availibility - 2 Month", status: "task37", check: "task38" },
      { name: "RK - Medicine Availibility - 2 Month", status: "task39", check: "task40" },
      { name: "Container Availibility", status: "task41", check: "task42" },
      { name: "Sticker Availibility", status: "task43", check: "task44" },
      { name: "Managers Today WORK PLAN", status: "task45", check: "task46" },
      { name: "Managers TOMORROW WORK PLAN", status: "task47", check: "task48" },
      { name: "Staff Productivity Tracker", status: "task49", check: "task50" },
      { name: "Staff Performanece Tracker", status: "task51", check: "task52" },
      { name: "Pending Work Report", status: "task53", check: "task54" },
      { name: "Weekly Audit or Review Report", status: "task55", check: "task56" },
      { name: "Floor Staff Managment", status: "task57", check: "task58" },
      { name: "Patient Managment", status: "task59", check: "task60" },
      { name: "Work Review Presentation Weekly", status: "task61", check: "task62" },
      { name: "Staff Productivity Tracker", status: "task63", check: "task64" },
      { name: "Staff Performanece Tracker", status: "task65", check: "task66" },
      { name: "Calling Connect + Revenue Report", status: "task67", check: "task68" },
      { name: "Dr Performanece Report", status: "task69", check: "task70" },
      { name: "Pending Work Report", status: "task71", check: "task72" },
      { name: "Data wise Call Report", status: "task73", check: "task74" },
      { name: "Delivery Stat Report", status: "task75", check: "task76" },
      { name: "Weekly Audit or Review Report", status: "task77", check: "task78" },
     
      { name: "All Departmentwise Report", status: "task81", check: "task82" },
      { name: "Daywise + Departmentwise + Staffwise Work Plan", status: "task83", check: "task84" },
      { name: "All Closing Ready", status: "task85", check: "task86" },
      { name: "Staffwise Work Distrubution", status: "task87", check: "task88" },
      { name: "All Center Daily Work Status", status: "task89", check: "task90" },
      { name: "Staff Productivity Check", status: "task91", check: "task92" },
      { name: "All Other center All report", status: "task93", check: "task94" },
      { name: "Track on Routine Work + Pending Work", status: "task95", check: "task96" },
      { name: "Pending Work Update", status: "task97", check: "task98" },
      { name: "Last day Report", status: "task99", check: "task100" },
      { name: "Follow Up Transfer", status: "task101", check: "task102" },
      { name: "Follow Up Call Report", status: "task103", check: "task104" },
      { name: "Follow Up screenshot", status: "task105", check: "task106" },
      { name: "Confirmation call", status: "task107", check: "task108" },
      { name: "Confirmation Call report", status: "task109", check: "task110" },
      { name: "Last day UPI check", status: "task111", check: "task112" },
      { name: "Daily + Hourly Report", status: "task113", check: "task114" },
      { name: "All Closing Report & Cash", status: "task115", check: "task116" },
      { name: "Bulk Whatsapp", status: "task117", check: "task118" },
      { name: "Counter Patient Handling", status: "task119", check: "task120" },
      { name: "Camp Data report", status: "task121", check: "task122" },
      { name: "Review Collection", status: "task123", check: "task124" },
      { name: "Home Delivery Report", status: "task125", check: "task126" },
      { name: "Out Delivery Report", status: "task127", check: "task128" },
      { name: "Online Patient Medicine Tracker", status: "task129", check: "task130" },
      { name: "Online Patient Medicine Follow up", status: "task131", check: "task132" },
      { name: "Old Online Patient Follow Up", status: "task133", check: "task134" },
      { name: "International Online Patient Follow Up", status: "task135", check: "task136" },
      { name: "All Social Media Track and Report", status: "task137", check: "task138" },
      { name: "All Register update", status: "task139", check: "task140" },
      { name: "All Excel Report", status: "task141", check: "task142" },
      { name: "All Closing Ready", status: "task143", check: "task144" }
    ];
    
    

    // Header row
    const helo={
      date:"",
      time:""
    }

    data.map((v:any)=>{
      helo.date=formatRelativeMonthDate(v.createdAt)
      helo.time=formatRelativeTime(v.createdAt)
    })
    const dateherad=["Date",helo.date,"Time",helo.time]
    const headerRow = ["S.No", "Details", "Status", "Check"];
  
    // Convert data into the required format
    const formattedData = data.flatMap((item: any, index: number) => [
      dateherad,
      headerRow, // Repeat header for each entry
    
      ...detailsList.map((detail, i) => [
        i + 1, // Serial Number
       
        detail.name, // Static Details
        item[detail.status] || "", // Dynamic Status
        item[detail.check] ? "✔" : "", // Dynamic Checkmark if true
      ]),
      [] // Empty row for spacing
    ]);
  
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(formattedData);
  
    // Apply styling (bold header)
    const range = XLSX.utils.decode_range(ws['!ref'] || '');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[cell]) ws[cell].s = { font: { bold: true } };
    }
  
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
  
    // Export the file
    XLSX.writeFile(wb, "Styled_Report.xlsx");
  };
  

  const [date, setDate] = useState<Date | undefined>(new Date());

  const fetchData = useCallback(
    async (selectedDate: Date | undefined) => {
      if (!selectedDate) return; // Only check for selectedDate

      // Normalize the date to start of the day in IST
      const dateInIST = moment(selectedDate)
        .utcOffset("+05:30") // Adjust to IST (UTC+5:30)
        .startOf("day") // Start of the day in IST
        .format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'

      console.log("Date in IST:", dateInIST); // Debugging to verify the conversion

      try {
        setloding(true);
        const { data } = await axios.post('/api/manager-vew', {
          calendarDate: dateInIST // Send the formatted date
        });
        setdata(data);
        console.log("Data from API:", data); // Handle the response as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setloding(false);
      }
    },
    [], // No dependencies on task or other variables
  );

  useEffect(() => {
    if (date) {
      fetchData(date); // Fetch data with the date
    }
  }, [date, fetchData]);
  return (
    <>
<div className="flex justify-between">
<Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate)}
          className="rounded-md border"
        />
    
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 w-fit"
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
                  <SelectContent className="w-fit">
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
</div>

      <div className="w-full flex justify-center">
      <Button type="button" onClick={()=>exportStyledExcel(data)}>Export To Excel</Button>
      </div>
      <Table>
        <TableBody>
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
            <div className="flex w-full flex-col justify-center space-y-7">
              {data?.map((v: any, i) => {
                return (
                  <div className="mx-auto" key={i}>
                    <TableRow className="w-full`">
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-yellow-200 font-bold">
                        Date
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-yellow-200 font-bold text-black">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-yellow-200 font-bold">
                        Time
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-yellow-200 font-bold">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-gray-200 font-bold">
                        S.no
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-gray-200 font-bold">
                        Details{" "}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-gray-200 font-bold">
                        Status
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400 bg-gray-200 font-bold">
                        Check
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        1)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Attendtence
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task79}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task80 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        2)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                      Attendtence Of All Branch
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task145}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task146 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                 
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        3)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Last day Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task1}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task2 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        4)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Excel Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task3}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task4 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        5)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Register update
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task5}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task6 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        6)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Patient Numbering vs Target
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task7}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task8 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        7)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Last day Report all department
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task9}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task10 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        8)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Stock Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task11}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task12 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        9)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        RK Making
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task13}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task14 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        10)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Short Medicine Register Update
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task15}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task16 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        11)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Manual Bill Book Che
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task17}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task18 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        12)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Requiered Local Medicine Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task19}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task20 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        13)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Other center Billing for Despatch
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task21}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task22 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        14)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Department Daily SOP follow up & Checking
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task23}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task24 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        15)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        RW Medicine Order as per date
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task25}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task26 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        16)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        INDIAN Medicine Order as per date
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task27}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task28 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        17)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Purchase Register Check
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task29}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task30 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        18)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Purchase File Check
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task31}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task32 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        19)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All medicine Availibity
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task33}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task34 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {" "}
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        20)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        RK requierment check + Making
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task35}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task36 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        21)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        RK - Pond Availibility - 2 Month
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task37}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task38 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        22)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        RK - Medicine Availibility - 2 Month
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task39}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task40 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        23)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Container Availibility
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task41}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task42 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        24)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Sticker Availibility
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task43}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task44 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        25)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Managers Today WORK PLAN
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task45}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task46 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        26)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Managers TOMORROW WORK PLAN
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task47}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task48 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        27)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staff Productivity Track
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task49}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task50 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        28)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staff Performanece Tracker
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task51}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task52 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        29)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Pending Work Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task53}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task54 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        30)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Weekly Audit or Review Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task55}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task56 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        31)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Floor Staff Managment
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task57}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task58 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        32)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Patient Managment
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task59}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task60 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        33)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Work Review Presentation Weekly
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task61}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task62 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        34)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staff Productivity Tracker
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task63}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task64 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        35)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staff Performanece Tracker
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task65}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task66 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        36)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Calling Connect + Revenue Repor
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task67}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task68 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        37)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Dr Performanece Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task69}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task70 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        38)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Pending Work Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task71}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task72 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        39)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Data wise Call Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task73}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task74 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        40)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Delivery Stat Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task75}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task76 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        41)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Weekly Audit or Review Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task77}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task78 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                  
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        42)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Departmentwise Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task81}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task82 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        43)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Daywise + Departmentwise + Staffwise Work Plan
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task83}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task84 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        44)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Closing Ready
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task85}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task86 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        45)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staffwise Work Distrubution
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task87}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task88 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        46)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Center Daily Work Status
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task89}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task90 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        47)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Staff Productivity Check
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task91}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task92 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        48)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Other center All report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task93}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task94 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        49)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Track on Routine Work + Pending Work
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task95}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task96 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        50)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Pending Work Update
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task97}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task98 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        51)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Last day Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task99}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task100 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        52)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Follow Up Transfer
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task101}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task102 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        53)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Follow Up Call Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task103}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task104 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        54)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Follow Up screenshot
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task105}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task106 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        55)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Confirmation call
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task107}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task108 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        56)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Confirmation Call report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task109}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task110 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        57)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Register update
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task111}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task112 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        58)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Last day UPI check
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task112}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task114 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        59)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Daily + Hourly Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task115}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task116 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        60)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Closing Report & Cash
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task117}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task118 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        61)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Bulk Whatsapp
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task119}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task120 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        62)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Counter Patient Handling
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task121}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task122 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        63)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Excel Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task123}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task124 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        64)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Camp Data report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task125}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task126 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        65)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Review Collection
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task127}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task128 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        66)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Home Delivery Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task129}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task130 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        67)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Out Delivery Report
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task131}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task132 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        68)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Online Patient Medicine Tracker
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task133}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task134 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        69)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Online Patient Medicine Follow up
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task135}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task136 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        70)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        Old Online Patient Follow Up
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task137}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task138 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        71)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        International Online Patient Follow Up
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task139}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task140 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        72)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Social Media Track and Repo
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task141}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task142 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[30px] border-2 border-blue-400 text-center font-bold">
                        73)
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        All Register update
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task143}
                      </TableCell>
                      <TableCell className="whitespace-break-spaces break-words border-2 border-blue-400">
                        {v.task144 && <Check className="size-6" />}
                      </TableCell>
                    </TableRow>
                  </div>
                );
              })}
            </div>
          )}
        </TableBody>
      </Table>
    </>
  );
}
