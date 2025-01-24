"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import * as XLSX from "xlsx";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";
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
import { AllreportValue, alreportSchema } from "@/lib/vallidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import LodingButton from "@/components/LodingButton";
import { useToast } from "@/hooks/use-toast";
import { useReactToPrint } from "react-to-print";
export default function SearchData() {
  const form = useForm<AllreportValue>({
    resolver: zodResolver(alreportSchema),
    defaultValues: {
      month: "",
      year: "",
    },
  });
  const { username } = useParams();
  const [selectedTask, setSelectedTask] = useState<string>("work");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData]: any = useState<any[]>([]); // Backend se data store karne ke liye
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [nodata, setnodata] = useState("");
  const [calltraker, setcalltraker]:any = useState([]);
  console.log(calltraker);

  const [tabelex, settablseex]: any = useState({
    dipartment: "",
    data: [],
    dataOf: [],
    dataOn: [],
  });
  const [late, setatendec]: any = useState([]);
  const [s, sets] = useState(true);
  const [ispending, setispending] = useState(false);
  // Format ISO date to "DD-MMM-YYYY"
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const fetchData = useCallback(
    async (task: string, selectedDate: Date | undefined) => {
      if (!task || !selectedDate) return;

      // Normalize the date to start of the day in IST
      const dateInIST = moment(selectedDate)
        .utcOffset("+05:30") // Adjust to IST (UTC+5:30)
        .startOf("day") // Start of the day in IST
        .format("YYYY-MM-DD"); // Format as 'YYYY-MM-DD'

      console.log("Date in IST:", dateInIST); // Debugging to verify the conversion

      sets(true);
      setLoading(true); // Loading start
      try {
        if (task === "work") {
          const response = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: dateInIST, // Send the corrected date
          });
          console.log(dateInIST);
          setData(response.data);
        } else if (task === "excel") {
          const response = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: dateInIST, // Send the corrected date
          });
          settablseex({
            dipartment: response.data.dipartment,
            data: response.data.data,
            dataOf: response.data.dataOff,
            dataOn: response.data.dataOn,
          });
        } else if (task === "attendance") {
          const response = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: dateInIST, // Send the corrected date
          });
          setatendec(response.data);
        } else if (task === "onboarding-data") {
          const { data } = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: dateInIST, // Send the corrected date
          });

          if (!data) {
            setnodata("null");
          } else {
            setnodata("data");
          }
          // Transform data to capitalize first letters
          const transformedData: any = Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
              if (typeof value === "string") {
                return [key, capitalizeFirstLetter(value)];
              }
              return [key, value];
            }),
          );
          setData(transformedData);
        } else if (task === "call-track") {
          const { data } = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: dateInIST, // Send the corrected date
          });

          setcalltraker(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Loading stop
      }
    },
    [username],
  );

  useEffect(() => {
    fetchData(selectedTask, date); // Initial fetch
  }, [selectedTask, date, fetchData]);

  const contentClickHandler = (task: string) => {
    setSelectedTask(task); // Selected task update karna
  };

  const onSubmit = async (value: AllreportValue) => {
    setispending(true);
    sets(false);
    setLoading(true); //
    if (value.month && value.year) {
      // Map the month name to its corresponding numeric value (0-indexed for JavaScript Date)
      const monthMap: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      // Get the numeric value for the selected month (0-indexed)
      const selectedMonth = monthMap[value.month];
      const selectedYear = parseInt(value.year, 10);

      // Use moment to create a date in the desired timezone (Asia/Kolkata)
      const selectedDate = moment.tz(
        `${selectedYear}-${selectedMonth + 1}-01`, // Correctly calculate the first day of the month
        "YYYY-MM-DD",
        "Asia/Kolkata",
      );

      // Format it in ISO format (YYYY-MM-DD)
      const isoDate = selectedDate.format("YYYY-MM-DD");

      console.log(isoDate); // Ensure this logs correctly, like "2025-01-01"
      // Use the ISO date string in your API call

      if (selectedTask === "work") {
        const response = await axios.post("/api/alldetausingUsernam", {
          username: username,
          whichdata: selectedTask,
          month: isoDate, // Send as a string (e.g., '2025-01-01' for January 2025)
        });
        setData(response.data); // Debugging
      } else if (selectedTask === "excel") {
        const response = await axios.post("/api/alldetausingUsernam", {
          username: username,
          whichdata: selectedTask,
          month: isoDate, // Send as a string (e.g., '2025-01-01' for January 2025)
        });
        settablseex({
          dipartment: response.data.dipartment,
          data: response.data.data,
          dataOf: response.data.dataOff,
          dataOn: response.data.dataOn,
        });
      } else if (selectedTask === "attendance") {
        const response = await axios.post("/api/alldetausingUsernam", {
          username: username,
          whichdata: selectedTask,
          month: isoDate, // Send as a string (e.g., '2025-01-01' for January 2025)
        });
        setatendec(response.data);
      }

      setLoading(false); //
      setispending(false);
    } else {
      console.error("Month and Year are required!");
    }
  };

  const [of, setof] = useState(1);

  const ofileHanlder = () => {
    setof(1);
  };

  const onileHanlder = () => {
    setof(0);
  };

  function formatMinutesToHoursMinutes(minutes: any) {
    if (!minutes) return "0h 0m"; // Handle null or undefined
    const hours = Math.floor(minutes / 60); // Calculate hours
    const remainingMinutes = minutes % 60; // Calculate remaining minutes
    return `${hours}h ${remainingMinutes}m`; // Return formatted string
  }

  const [pri, setpris] = useState({
    dipartment: "",
    displayname: "",
    Uplodthing: "",
  });
  const userna = async () => {
    const { data } = await axios.post(`/api/pr/${username}`);

    setpris({
      dipartment: data.dipartment,
      displayname: data.displayname,
      Uplodthing: data.Uplodthing,
    });
  };
  const { toast } = useToast();
  useEffect(() => {
    userna();
  }, [username]);

  const exportToExcel = () => {
    if (selectedTask == "work") {
      if (!data || data.length === 0) {
        toast({
          description: "No data to export",
          variant: "destructive",
        });
        return;
      }

      // Prepare Data for Excel
      const formattedData = data.map((day: any) => {
        const row = {
          Date: day.date,
          "10 AM - 1 PM": (day.timeRanges?.["10 AM - 1 PM"] || []).join(", "),
          "1 PM - 4 PM": (day.timeRanges?.["1 PM - 4 PM"] || []).join(", "),
          "4 PM - 7 PM": (day.timeRanges?.["4 PM - 7 PM"] || []).join(", "),
        };
        return row;
      });

      // Create Worksheet and Workbook
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

      // Download Excel File
      XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
    } else if (selectedTask == "excel") {
      if (!tabelex?.data || tabelex?.data.length === 0) {
        toast({
          description: "No data to export",
          variant: "destructive",
        });
        return;
      }

      // Prepare data for Excel
      if (tabelex.dipartment === "telecaller") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          Work: v.task1,
          Incoming: v.task2,
          Outgoing: v.task3,
          Total: Number(v.task2) + Number(v.task3),
          "Whatsapp / Text": v.task4,
          Appt: v.task5,
          Fees: v.task6,
          " New  Patient": v.task7,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "reception") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          PATIENT: v.task1,
          VISITED: v.task2,
          NEW: v.task3,
          OLD: v.task4,
          "By JR Dr.": v.task5,
          ENQUIRY: v.task6,
          CALL: v.task7,
          WHATSAPP: v.task8,
          APP: v.task9,
          MESSAGE: v.task10,
          CASH: v.task11,
          ONLINE: v.task12,
          "GRAND TOTAL": Number(v.task11) + Number(v.task12),
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "medicen") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          "TOTAL BILL": v.task1,
          "MARG SALE": v.task2,
          "LOOSE SALE": v.task3,
          "TOTAL SALE ": Number(v.task2) + Number(v.task3),
          "SALE QTY": v.task4,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "ranchi_shop") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          "TOTAL BILL": v.task1,
          MARG: v.task2,
          LOOSE: v.task3,
          "TOTAL SALE": Number(v.task2) + Number(v.task3),
          CASE: v.task4,
          CARD: v.task5,
          SCAN: v.task6,
          RETURN: v.task7,
          CRDT: v.task8,
          "DISC AMT": v.task9,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "Doctor") {
        if (of === 1) {
          const excelData = tabelex?.dataOf.map((v: any) => ({
            Date: formatRelativeMonthDate(v.createdAt),
            Doctor: v.task1,
            "NEW PATIENT": v.task2,
            "OLD PATIENT": v.task3,
            FEES: v.task4,
            "COUNTER MEDICINE": v.task5,
            LAB: v.task6,
            WHATSAPP: v.task7,
            "FOLLOW UP CALL": v.task8,
            ARTICLE: v.task9,
            CONTENT: v.task10,
            QUESTIONNAIRE: v.task11,
            "CASE HISTORY": v.task12,
            CAMP: v.task13,
            Time: formatRelativeTime(v.createdAt),
          }));

          // Create worksheet
          const worksheet = XLSX.utils.json_to_sheet(excelData);

          // Create workbook
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            `${tabelex.deipartment}`,
          );

          // Write to file
          XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
        } else {
          const excelData = tabelex?.dataOn.map((v: any) => ({
            Date: formatRelativeMonthDate(v.createdAt),
            Doctor: v.task1,
            Interakt: v.task2,
            "INTL - LEADS": v.task3,
            "INTL - NATIONAL": v.task4,
            "INTL - INTERNATIONAL": v.task5,
            "NATIONAL - FEES": v.task6,
            "INTERNATIONAL - FEES": v.task7,
            "NATIONAL - MED": v.task8,
            "INTERNATIONAL - MED": v.task9,
            MAIL: v.task10,
            VIDEO: v.task11,
            "FB - REPLY": v.task12,
            "FB - Conversion": v.task13,
            "INT - REPLY": v.task14,
            "INT - Conversion": v.task15,
            Time: formatRelativeTime(v.createdAt),
          }));

          // Create worksheet
          const worksheet = XLSX.utils.json_to_sheet(excelData);

          // Create workbook
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            `${tabelex.deipartment}`,
          );

          // Write to file
          XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
        }
      } else if (tabelex.dipartment === "hdod") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          "O.G": v.task1,
          IN: v.task2,
          "HD. ORDER": v.task3,
          "HD DISP": v.task4,
          "HD AMT": v.task5,
          "PRES - Send": v.task6,
          "OD. ORDER": v.task7,
          "OD DISP": v.task8,
          "OD PENDING": v.task9,
          "MANUAL SENT": v.task10,
          " LOOSE Medi": v.task11,
          "OD AMT": v.task12,
          FRIGHT: v.task13,
          TOTAL: Number(v.task12) + Number(v.task13),
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "ecart") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          Amazon: v.task1,
          "Amazon:- Amount": v.task2,
          "Amazon:- Listing": v.task3,
          Flipkart: v.task4,
          "Flipkart:- Amount": v.task5,
          "Flipkart:- Listing": v.task6,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "designer") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          " Video Count": v.task1,
          MADE: v.task2,
          EXPORT: v.task3,
          DOWNLOAD: v.task4,
          EDITING: v.task5,
          YouTube: v.task6,
          "  Reel / short": v.task7,
          Banner: v.task8,
          "Send to DR, Rajeev's sir (date)": v.task9,
          "INSTAGRAM POST BY DR. RAJEEV SIR": v.task10,
          "FACEBOOK POST BY RAJEEV SIR": v.task11,
          " Post by Vikash Sir": v.task12,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      } else if (tabelex.dipartment === "mixer") {
        const excelData = tabelex?.data.map((v: any) => ({
          Date: formatRelativeMonthDate(v.createdAt),
          "Medicine Name": v.task1,
          QTY: v.task2,
          "Order by": v.task3,
          "Marg Entry": v.task4,
          Breakge: v.task5,
          "Marg Entry by": v.task6,
          Time: formatRelativeTime(v.createdAt),
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `${tabelex.deipartment}`,
        );

        // Write to file
        XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
      }
    } else if (selectedTask == "attendance") {
      if (!late || late.length === 0) {
        toast({
          description: "No attendance data to export",
          variant: "destructive",
        });
        return;
      }

      // Format the data for Excel
      const formattedData = late.map((entry: any) => ({
        "Work Present Count": entry.WorkPresentCount || "0",
        "Present Count": entry.PresentCount || "0",
        Status: entry.Status || "0",
        "Late Time": formatMinutesToHoursMinutes(entry.createdAt) || "0",
      }));

      // Create Worksheet and Workbook
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

      // Download the Excel File
      XLSX.writeFile(workbook, `${pri.displayname}.xlsx`);
    }
  };
  // Generate PDF from the displayed content
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Intervew",
  });

  if (!data) {
    return <p className="text-center">No Document Found</p>;
  }
  return (
    <div className="space-y-6">
      {/* Task Selection */}
      <div className="flex justify-between">
        <div className="space-y-3">
          <Image
            src={
              typeof pri.Uplodthing === "string" && pri.Uplodthing.trim() !== ""
                ? pri.Uplodthing
                : avatarPlaceholder
            }
            alt="avatarUrl not found"
            width={48}
            height={48}
            className="h-fit flex-none rounded-full border-2 bg-secondary object-cover"
          />

          <p>{pri.displayname}</p>
          <p>{pri.dipartment} </p>
        </div>
        <div className="flex cursor-pointer flex-col space-y-3">
          {["work", "excel", "attendance", "onboarding-data", "call-track"].map(
            (task) => (
              <p
                key={task}
                onClick={() => contentClickHandler(task)}
                className={`cursor-pointer ${
                  selectedTask === task ? "font-bold text-blue-600" : ""
                }`}
              >
                {task}
              </p>
            ),
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[300px] space-y-6"
          >
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
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
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                      <SelectItem value="2030">2030</SelectItem>
                      <SelectItem value="2031">2031</SelectItem>
                      <SelectItem value="2032">2032</SelectItem>
                      <SelectItem value="2033">2033</SelectItem>
                      <SelectItem value="2034">2034</SelectItem>
                      <SelectItem value="2035">2035</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <LodingButton loding={ispending} type="submit" className="w-full">
              Submit
            </LodingButton>
          </form>
        </Form>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate)}
          className="rounded-md border"
        />
      </div>
      {tabelex.dipartment === "accountant" ||
      selectedTask === "onboarding-data" ? (
        ""
      ) : (
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={exportToExcel}
            className="rounded bg-blue-500 p-2 text-white"
          >
            {" "}
            Export to Excel
          </button>
        </div>
      )}
      {/* Table Section */}

      {selectedTask === "work" ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-primary">
              <TableHead className="border font-extrabold">Date</TableHead>
              <TableHead className="border font-extrabold">
                10 AM - 1 PM
              </TableHead>
              <TableHead className="border font-extrabold">
                1 PM - 4 PM
              </TableHead>
              <TableHead className="border font-extrabold">
                4 PM - 7 PM
              </TableHead>
            </TableRow>
          </TableHeader>

          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Loader className="mx-auto animate-spin" /> {/* Loader */}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data.map((day: any, dayIdx: any) => (
                <TableRow key={dayIdx}>
                  {/* Date Column */}
                  <TableCell className="text-nowrap border font-bold">
                    {day.date}
                  </TableCell>

                  {/* Time Range Columns */}
                  {["10 AM - 1 PM", "1 PM - 4 PM", "4 PM - 7 PM"].map(
                    (timeRange, idx) => (
                      <TableCell key={idx} className="border">
                        {day.timeRanges?.[timeRange]?.length > 0
                          ? day.timeRanges[timeRange].map(
                              (entry: any, entryIdx: any) => (
                                <p
                                  key={entryIdx}
                                  className="whitespace-pre-line break-words"
                                >
                                  {entry}
                                </p>
                              ),
                            )
                          : ""}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      ) : selectedTask === "excel" ? (
        tabelex.dipartment === "telecaller" ? (
          <>
            <Table>
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">Work</TableHead>
                  <TableHead className="border-2">Incoming</TableHead>
                  <TableHead className="border-2">Outgoing</TableHead>
                  <TableHead className="border-2">Total</TableHead>
                  <TableHead className="border-2">Whatsapp / Text</TableHead>
                  <TableHead className="border-2">Appt</TableHead>
                  <TableHead className="border-2">Fees</TableHead>
                  <TableHead className="border-2">New Patient</TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={10} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">
                        {Number(v.task2) + Number(v.task3)}
                      </TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>
                      <TableCell className="border-2">{v.task7}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </>
        ) : tabelex.dipartment === "reception" ? (
          <Table>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2">Date</TableHead>

                <TableHead className="border-2">PATIENT</TableHead>
                <TableHead className="border-2">VISITED</TableHead>
                <TableHead className="border-2">NEW</TableHead>

                <TableHead className="border-2">OLD</TableHead>
                <TableHead className="border-2">By JR Dr.</TableHead>
                <TableHead className="border-2">ENQUIRY</TableHead>
                <TableHead className="border-2">CALL</TableHead>
                <TableHead className="border-2">WHATSAPP</TableHead>
                <TableHead className="border-2">APP</TableHead>
                <TableHead className="border-2">MESSAGE</TableHead>
                <TableHead className="border-2">CASH</TableHead>
                <TableHead className="border-2">ONLINE</TableHead>
                <TableHead className="border-2">GRAND TOTAL</TableHead>

                <TableHead className="border-2">Time</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={15} className="">
                    <Loader className="mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : tabelex?.data?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    No Data Found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              tabelex?.data?.map((v: any, i: any) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2">
                      {formatRelativeMonthDate(v.createdAt)}
                    </TableCell>
                    <TableCell className="border-2">{v.task1}</TableCell>
                    <TableCell className="border-2">{v.task2}</TableCell>
                    <TableCell className="border-2">{v.task3}</TableCell>
                    <TableCell className="border-2">{v.task4}</TableCell>
                    <TableCell className="border-2">{v.task5}</TableCell>
                    <TableCell className="border-2">{v.task6}</TableCell>
                    <TableCell className="border-2">{v.task7}</TableCell>
                    <TableCell className="border-2">{v.task8}</TableCell>
                    <TableCell className="border-2">{v.task9}</TableCell>
                    <TableCell className="border-2">{v.task10}</TableCell>
                    <TableCell className="border-2">{v.task11}</TableCell>
                    <TableCell className="border-2">{v.task12}</TableCell>
                    <TableCell className="border-2">
                      {Number(v.task11) + Number(v.task12)}
                    </TableCell>

                    <TableCell className="border-2">
                      {formatRelativeTime(v.createdAt)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            )}
          </Table>
        ) : tabelex.dipartment === "medicen" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table>
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">TOTAL BILL</TableHead>
                  <TableHead className="border-2">MARG SALE</TableHead>
                  <TableHead className="border-2">LOOSE SALE</TableHead>
                  <TableHead className="border-2">TOTAL SALE</TableHead>

                  <TableHead className="border-2">SALE QTY</TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">
                        {Number(v.task2) + Number(v.task3)}
                      </TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "ranchi_shop" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table className="w-[2000px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">TOTAL BILL</TableHead>
                  <TableHead className="border-2">MARG</TableHead>
                  <TableHead className="border-2">LOOSE</TableHead>
                  <TableHead className="border-2">TOTAL SALE</TableHead>

                  <TableHead className="border-2">CASH</TableHead>
                  <TableHead className="border-2">CARD</TableHead>
                  <TableHead className="border-2">SCAN</TableHead>
                  <TableHead className="border-2">RETURN</TableHead>
                  <TableHead className="border-2">CRDT</TableHead>
                  <TableHead className="border-2">DISC AMT</TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">
                        {Number(v.task2) + Number(v.task3)}
                      </TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>
                      <TableCell className="border-2">{v.task7}</TableCell>
                      <TableCell className="border-2">{v.task8}</TableCell>
                      <TableCell className="border-2">{v.task9}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "Doctor" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <div className="space-y-6">
              <Button
                onClick={ofileHanlder}
                className={` ${of === 1 ? "bg-blue-400 hover:bg-blue-400" : ""}`}
              >
                Offline
              </Button>{" "}
              <Button
                onClick={onileHanlder}
                className={` ${of === 0 ? "bg-blue-400 hover:bg-blue-400" : ""}`}
              >
                Online
              </Button>
              <div className={` ${of === 1 ? "block" : "hidden"}`}>
                <Table className="w-[2300px]">
                  <TableHeader>
                    <TableRow className="border border-primary bg-primary">
                      <TableHead className="border-2">Date</TableHead>
                      <TableHead className="border-2">Doctor</TableHead>
                      <TableHead className="border-2">NEW PATIENT</TableHead>
                      <TableHead className="border-2">OLD PATIENT</TableHead>

                      <TableHead className="border-2">FEES</TableHead>
                      <TableHead className="border-2">
                        COUNTER MEDICINE{" "}
                      </TableHead>
                      <TableHead className="border-2">LAB</TableHead>
                      <TableHead className="border-2">WHATSAPP</TableHead>
                      <TableHead className="border-2">FOLLOW UP CALL</TableHead>
                      <TableHead className="border-2">ARTICLE</TableHead>
                      <TableHead className="border-2">CONTENT</TableHead>
                      <TableHead className="border-2">QUESTIONNAIRE</TableHead>
                      <TableHead className="border-2">CASE HISTORY</TableHead>
                      <TableHead className="border-2">CAMP </TableHead>
                      <TableHead className="border-2">Time</TableHead>
                    </TableRow>
                  </TableHeader>

                  {loading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="">
                          <Loader className="mx-auto animate-spin" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : tabelex?.dataOf?.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="">
                          No Data Found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    tabelex?.dataOf?.map((v: any, i: any) => (
                      <TableBody className="border border-primary" key={i}>
                        <TableRow>
                          <TableCell className="border-2">
                            {formatRelativeMonthDate(v.createdAt)}
                          </TableCell>
                          <TableCell className="border-2">{v.task1}</TableCell>
                          <TableCell className="border-2">{v.task2}</TableCell>
                          <TableCell className="border-2">{v.task3}</TableCell>
                          <TableCell className="border-2">{v.task4}</TableCell>
                          <TableCell className="border-2">{v.task5}</TableCell>
                          <TableCell className="border-2">{v.task6}</TableCell>
                          <TableCell className="border-2">{v.task7}</TableCell>
                          <TableCell className="border-2">{v.task8}</TableCell>
                          <TableCell className="border-2">{v.task9}</TableCell>
                          <TableCell className="border-2">{v.task10}</TableCell>
                          <TableCell className="border-2">{v.task11}</TableCell>
                          <TableCell className="border-2">{v.task12}</TableCell>
                          <TableCell className="border-2">{v.task13}</TableCell>

                          <TableCell className="border-2">
                            {formatRelativeTime(v.createdAt)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))
                  )}
                </Table>
              </div>
              <div className={`${of === 0 ? "block" : "hidden"}`}>
                <Table className="w-[3000px]">
                  <TableHeader>
                    <TableRow className="border border-primary bg-primary">
                      <TableHead className="border-2">Date</TableHead>
                      <TableHead className="border-2">Doctor</TableHead>
                      <TableHead className="border-2">Interakt</TableHead>
                      <TableHead className="border-2">INTL - LEADS</TableHead>

                      <TableHead className="border-2">
                        INTL - NATIONAL
                      </TableHead>
                      <TableHead className="border-2">
                        INTL - INTERNATIONAL
                      </TableHead>
                      <TableHead className="border-2">
                        NATIONAL - FEES
                      </TableHead>
                      <TableHead className="border-2">
                        INTERNATIONAL - FEES
                      </TableHead>
                      <TableHead className="border-2">NATIONAL - MED</TableHead>
                      <TableHead className="border-2">
                        INTERNATIONAL - MED
                      </TableHead>
                      <TableHead className="border-2">MAIL</TableHead>
                      <TableHead className="border-2">VIDEO</TableHead>
                      <TableHead className="border-2">FB - REPLY</TableHead>
                      <TableHead className="border-2">
                        FB - Conversion{" "}
                      </TableHead>
                      <TableHead className="border-2">INT - REPLY</TableHead>
                      <TableHead className="border-2">
                        INT - Conversion
                      </TableHead>
                      <TableHead className="border-2">Time</TableHead>
                    </TableRow>
                  </TableHeader>

                  {loading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="">
                          <Loader className="mx-auto animate-spin" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : tabelex?.dataOn?.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} className="">
                          No Data Found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    tabelex?.dataOn?.map((v: any, i: any) => (
                      <TableBody className="border border-primary" key={i}>
                        <TableRow>
                          <TableCell className="border-2">
                            {formatRelativeMonthDate(v.createdAt)}
                          </TableCell>
                          <TableCell className="border-2">{v.task1}</TableCell>
                          <TableCell className="border-2">{v.task2}</TableCell>
                          <TableCell className="border-2">{v.task3}</TableCell>
                          <TableCell className="border-2">{v.task4}</TableCell>
                          <TableCell className="border-2">{v.task5}</TableCell>
                          <TableCell className="border-2">{v.task6}</TableCell>
                          <TableCell className="border-2">{v.task7}</TableCell>
                          <TableCell className="border-2">{v.task8}</TableCell>
                          <TableCell className="border-2">{v.task9}</TableCell>
                          <TableCell className="border-2">{v.task10}</TableCell>
                          <TableCell className="border-2">{v.task11}</TableCell>
                          <TableCell className="border-2">{v.task12}</TableCell>
                          <TableCell className="border-2">{v.task13}</TableCell>
                          <TableCell className="border-2">{v.task14}</TableCell>
                          <TableCell className="border-2">{v.task15}</TableCell>

                          <TableCell className="border-2">
                            {formatRelativeTime(v.createdAt)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))
                  )}
                </Table>
              </div>
            </div>
          </div>
        ) : tabelex.dipartment === "hdod" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table className="w-[2300px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">O.G</TableHead>
                  <TableHead className="border-2">IN</TableHead>
                  <TableHead className="border-2">HD. ORDER</TableHead>

                  <TableHead className="border-2">HD DISP</TableHead>
                  <TableHead className="border-2">HD AMT</TableHead>
                  <TableHead className="border-2"> PRES - Send</TableHead>
                  <TableHead className="border-2">OD. ORDER</TableHead>
                  <TableHead className="border-2">OD DISP</TableHead>
                  <TableHead className="border-2">OD PENDING</TableHead>
                  <TableHead className="border-2">MANUAL SENT</TableHead>
                  <TableHead className="border-2">LOOSE Medi</TableHead>
                  <TableHead className="border-2">OD AMT</TableHead>
                  <TableHead className="border-2">FRIGHT </TableHead>
                  <TableHead className="border-2">TOTAL </TableHead>

                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>
                      <TableCell className="border-2">{v.task7}</TableCell>
                      <TableCell className="border-2">{v.task8}</TableCell>
                      <TableCell className="border-2">{v.task9}</TableCell>
                      <TableCell className="border-2">{v.task10}</TableCell>
                      <TableCell className="border-2">{v.task11}</TableCell>
                      <TableCell className="border-2">{v.task12}</TableCell>
                      <TableCell className="border-2">{v.task13}</TableCell>
                      <TableCell className="border-2">
                        {Number(v.task12) + Number(v.task13)}
                      </TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "ecart" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table>
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">Amazon </TableHead>
                  <TableHead className="border-2">Amount</TableHead>
                  <TableHead className="border-2">Listing</TableHead>

                  <TableHead className="border-2">Flipkart</TableHead>
                  <TableHead className="border-2">Amount</TableHead>
                  <TableHead className="border-2">Listing</TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "designer" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table className="w-[2300px]">
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">Video Count</TableHead>
                  <TableHead className="border-2">MADE</TableHead>
                  <TableHead className="border-2">EXPORT</TableHead>
                  <TableHead className="border-2">DOWNLOAD</TableHead>
                  <TableHead className="border-2">EDITING</TableHead>
                  <TableHead className="border-2">YouTube</TableHead>
                  <TableHead className="border-2">Reel / short</TableHead>
                  <TableHead className="border-2">Banner</TableHead>
                  <TableHead className="border-2">
                    Send to DR, Rajeev&lsquo;s sir (date)
                  </TableHead>
                  <TableHead className="border-2">
                    INSTAGRAM POST BY DR. RAJEEV SIR
                  </TableHead>
                  <TableHead className="border-2">
                    FACEBOOK POST BY RAJEEV SIR
                  </TableHead>
                  <TableHead className="border-2">Post by Vikash Sir</TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>
                      <TableCell className="border-2">{v.task7}</TableCell>
                      <TableCell className="border-2">{v.task8}</TableCell>
                      <TableCell className="border-2">{v.task9}</TableCell>
                      <TableCell className="border-2">{v.task10}</TableCell>
                      <TableCell className="border-2">{v.task11}</TableCell>
                      <TableCell className="border-2">{v.task12}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "mixer" ? (
          <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
            <Table>
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="border-2">Date</TableHead>
                  <TableHead className="border-2">Medicine Name</TableHead>
                  <TableHead className="border-2">QTY</TableHead>
                  <TableHead className="border-2">Order by </TableHead>

                  <TableHead className="border-2">Marg Entry </TableHead>
                  <TableHead className="border-2">Breakge </TableHead>
                  <TableHead className="border-2">Marg Entry by </TableHead>
                  <TableHead className="border-2">Time</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={8} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <TableBody className="border border-primary" key={i}>
                    <TableRow>
                      <TableCell className="border-2">
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>

                      <TableCell className="border-2">
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))
              )}
            </Table>
          </div>
        ) : tabelex.dipartment === "accountant" ? (
          <Table>
            <TableHeader>
              <TableRow className="flex-col border border-primary bg-gray-200">
                <TableHead className="border-2 font-bold text-red-500">
                  ACCOUNT
                </TableHead>
                <TableHead
                  className="border-2 font-bold text-black"
                  colSpan={5}
                >
                  CENTER{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-2"></TableCell>
                <TableCell className="border-2">RANCHI </TableCell>
                <TableCell className="border-2">PATNA</TableCell>
                <TableCell className="border-2">KOLKATA</TableCell>
                <TableCell className="border-2">JAG</TableCell>
                <TableCell className="border-2">DELHI</TableCell>
              </TableRow>
              <TableRow className="bg-primary">
                <TableCell className="border-2 font-bold text-black">
                  JOB DESCRIPTION
                </TableCell>
                <TableCell
                  className="border-2 font-bold text-amber-950"
                  colSpan={5}
                >
                  CHECKLIST - REPORT
                </TableCell>
              </TableRow>

              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      <Loader className="mx-auto animate-spin" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : tabelex?.data?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="">
                      No Data Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                tabelex?.data?.map((v: any, i: any) => (
                  <>
                    <TableRow className="bg-yellow-300">
                      <TableCell className="border-2 text-black">
                        Date
                      </TableCell>
                      <TableCell className="border-2 text-black" colSpan={5}>
                        {formatRelativeMonthDate(v.createdAt)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-2">Closing</TableCell>
                      <TableCell className="border-2">{v.task1}</TableCell>
                      <TableCell className="border-2">{v.task2}</TableCell>
                      <TableCell className="border-2">{v.task3}</TableCell>
                      <TableCell className="border-2">{v.task4}</TableCell>
                      <TableCell className="border-2">{v.task5}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-2">
                        Last day UPI check
                      </TableCell>
                      <TableCell className="border-2">{v.task6}</TableCell>
                      <TableCell className="border-2">{v.task7}</TableCell>
                      <TableCell className="border-2">{v.task8}</TableCell>
                      <TableCell className="border-2">{v.task9}</TableCell>
                      <TableCell className="border-2">{v.task10}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Reception UPI</TableCell>
                      <TableCell className="border-2">{v.task11}</TableCell>
                      <TableCell className="border-2">{v.task12}</TableCell>
                      <TableCell className="border-2">{v.task13}</TableCell>
                      <TableCell className="border-2">{v.task14}</TableCell>
                      <TableCell className="border-2">{v.task15}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Dues Copy check
                      </TableCell>
                      <TableCell className="border-2">{v.task16}</TableCell>
                      <TableCell className="border-2">{v.task17}</TableCell>
                      <TableCell className="border-2">{v.task18}</TableCell>
                      <TableCell className="border-2">{v.task19}</TableCell>
                      <TableCell className="border-2">{v.task20}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Loose Medicine Check
                      </TableCell>
                      <TableCell className="border-2">{v.task21}</TableCell>
                      <TableCell className="border-2">{v.task22}</TableCell>
                      <TableCell className="border-2">{v.task23}</TableCell>
                      <TableCell className="border-2">{v.task24}</TableCell>
                      <TableCell className="border-2">{v.task25}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Lab report Check
                      </TableCell>
                      <TableCell className="border-2">{v.task26}</TableCell>
                      <TableCell className="border-2">{v.task27}</TableCell>
                      <TableCell className="border-2">{v.task28}</TableCell>
                      <TableCell className="border-2">{v.task29}</TableCell>
                      <TableCell className="border-2">{v.task30}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        All Excel Report
                      </TableCell>
                      <TableCell className="border-2">{v.task31}</TableCell>
                      <TableCell className="border-2">{v.task32}</TableCell>
                      <TableCell className="border-2">{v.task33}</TableCell>
                      <TableCell className="border-2">{v.task34}</TableCell>
                      <TableCell className="border-2">{v.task35}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Stock Check</TableCell>
                      <TableCell className="border-2">{v.task36}</TableCell>
                      <TableCell className="border-2">{v.task37}</TableCell>
                      <TableCell className="border-2">{v.task38}</TableCell>
                      <TableCell className="border-2">{v.task39}</TableCell>
                      <TableCell className="border-2">{v.task40}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Stock Report</TableCell>
                      <TableCell className="border-2">{v.task41}</TableCell>
                      <TableCell className="border-2">{v.task42}</TableCell>
                      <TableCell className="border-2">{v.task43}</TableCell>
                      <TableCell className="border-2">{v.task44}</TableCell>
                      <TableCell className="border-2">{v.task45}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Purchase Check</TableCell>
                      <TableCell className="border-2">{v.task46}</TableCell>
                      <TableCell className="border-2">{v.task47}</TableCell>
                      <TableCell className="border-2">{v.task48}</TableCell>
                      <TableCell className="border-2">{v.task49}</TableCell>
                      <TableCell className="border-2">{v.task50}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Purchase Report
                      </TableCell>
                      <TableCell className="border-2">{v.task51}</TableCell>
                      <TableCell className="border-2">{v.task52}</TableCell>
                      <TableCell className="border-2">{v.task53}</TableCell>
                      <TableCell className="border-2">{v.task54}</TableCell>
                      <TableCell className="border-2">{v.task55}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Purchase Register
                      </TableCell>
                      <TableCell className="border-2">{v.task56}</TableCell>
                      <TableCell className="border-2">{v.task57}</TableCell>
                      <TableCell className="border-2">{v.task58}</TableCell>
                      <TableCell className="border-2">{v.task59}</TableCell>
                      <TableCell className="border-2">{v.task60}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Purchase File</TableCell>
                      <TableCell className="border-2">{v.task61}</TableCell>
                      <TableCell className="border-2">{v.task62}</TableCell>
                      <TableCell className="border-2">{v.task63}</TableCell>
                      <TableCell className="border-2">{v.task64}</TableCell>
                      <TableCell className="border-2">{v.task65}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Bill Entry in Register
                      </TableCell>
                      <TableCell className="border-2">{v.task66}</TableCell>
                      <TableCell className="border-2">{v.task67}</TableCell>
                      <TableCell className="border-2">{v.task68}</TableCell>
                      <TableCell className="border-2">{v.task69}</TableCell>
                      <TableCell className="border-2">{v.task70}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Purchase Excel</TableCell>
                      <TableCell className="border-2">{v.task71}</TableCell>
                      <TableCell className="border-2">{v.task72}</TableCell>
                      <TableCell className="border-2">{v.task73}</TableCell>
                      <TableCell className="border-2">{v.task74}</TableCell>
                      <TableCell className="border-2">{v.task75}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Cheque Payment</TableCell>
                      <TableCell className="border-2">{v.task76}</TableCell>
                      <TableCell className="border-2">{v.task77}</TableCell>
                      <TableCell className="border-2">{v.task78}</TableCell>
                      <TableCell className="border-2">{v.task79}</TableCell>
                      <TableCell className="border-2">{v.task80}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Daily A/C works
                      </TableCell>
                      <TableCell className="border-2">{v.task81}</TableCell>
                      <TableCell className="border-2">{v.task82}</TableCell>
                      <TableCell className="border-2">{v.task83}</TableCell>
                      <TableCell className="border-2">{v.task84}</TableCell>
                      <TableCell className="border-2">{v.task85}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">Daily CA works</TableCell>
                      <TableCell className="border-2">{v.task86}</TableCell>
                      <TableCell className="border-2">{v.task87}</TableCell>
                      <TableCell className="border-2">{v.task88}</TableCell>
                      <TableCell className="border-2">{v.task89}</TableCell>
                      <TableCell className="border-2">{v.task90}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        All Statment Update
                      </TableCell>
                      <TableCell className="border-2">{v.task91}</TableCell>
                      <TableCell className="border-2">{v.task92}</TableCell>
                      <TableCell className="border-2">{v.task93}</TableCell>
                      <TableCell className="border-2">{v.task94}</TableCell>
                      <TableCell className="border-2">{v.task95}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        All Paper and File Work
                      </TableCell>
                      <TableCell className="border-2">{v.task96}</TableCell>
                      <TableCell className="border-2">{v.task97}</TableCell>
                      <TableCell className="border-2">{v.task98}</TableCell>
                      <TableCell className="border-2">{v.task99}</TableCell>
                      <TableCell className="border-2">{v.task100}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        Party Ledger Book Update
                      </TableCell>
                      <TableCell className="border-2">{v.task101}</TableCell>
                      <TableCell className="border-2">{v.task102}</TableCell>
                      <TableCell className="border-2">{v.task103}</TableCell>
                      <TableCell className="border-2">{v.task104}</TableCell>
                      <TableCell className="border-2">{v.task105}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        W/S Ledger Book Update
                      </TableCell>
                      <TableCell className="border-2">{v.task106}</TableCell>
                      <TableCell className="border-2">{v.task107}</TableCell>
                      <TableCell className="border-2">{v.task108}</TableCell>
                      <TableCell className="border-2">{v.task109}</TableCell>
                      <TableCell className="border-2">{v.task110}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        W/S Ledger Register Update
                      </TableCell>
                      <TableCell className="border-2">{v.task111}</TableCell>
                      <TableCell className="border-2">{v.task112}</TableCell>
                      <TableCell className="border-2">{v.task113}</TableCell>
                      <TableCell className="border-2">{v.task114}</TableCell>
                      <TableCell className="border-2">{v.task115}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        W/S Ledger Payment Update
                      </TableCell>
                      <TableCell className="border-2">{v.task116}</TableCell>
                      <TableCell className="border-2">{v.task117}</TableCell>
                      <TableCell className="border-2">{v.task118}</TableCell>
                      <TableCell className="border-2">{v.task119}</TableCell>
                      <TableCell className="border-2">{v.task120}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="border-2">
                        All Purchase Update
                      </TableCell>
                      <TableCell className="border-2">{v.task121}</TableCell>
                      <TableCell className="border-2">{v.task122}</TableCell>
                      <TableCell className="border-2">{v.task123}</TableCell>
                      <TableCell className="border-2">{v.task124}</TableCell>
                      <TableCell className="border-2">{v.task125}</TableCell>
                    </TableRow>
                    <TableRow className="bg-green-200">
                      <TableCell className="border-2 text-black">
                        Time
                      </TableCell>
                      <TableCell className="border-2 text-black" colSpan={5}>
                        {formatRelativeTime(v.createdAt)}
                      </TableCell>
                    </TableRow>
                  </>
                ))
              )}
            </TableBody>
          </Table>
        ) : (
          ""
        )
      ) : selectedTask === "attendance" ? (
        s ? (
          <Table className="mt-4">
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2">Work Present Count</TableHead>
                <TableHead className="border-2">Present Count</TableHead>
                <TableHead className="border-2">Status</TableHead>
                <TableHead className="border-2">Late Time</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium" colSpan={4}>
                    <Loader className="mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : late && late.length > 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {late[0].WorkPresentCount}
                  </TableCell>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {late[0].PresentCount}
                  </TableCell>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {late[0].Status}
                  </TableCell>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {formatMinutesToHoursMinutes(late[0].createdAt)}
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>No data available</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        ) : (
          <Table className="mt-4">
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2">Work Present Count</TableHead>
                <TableHead className="border-2">Present Count</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium" colSpan={2}>
                    <Loader className="mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : late && late.length > 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {late[0].WorkPresentCount}
                  </TableCell>
                  <TableCell className="whitespace-pre-line break-words border-2">
                    {late[0].PresentCount}
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>No data available</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        )
      ) : selectedTask === "onboarding-data" ? (
        <>
          {nodata === "null" ? (
            <h1 className="w-full text-center">No Document Found</h1>
          ) : (
            <>
              <div
                id="pdf-content"
                className="relative w-full space-y-6 rounded-md border p-5 text-[23px] shadow-inner"
                ref={contentRef}
              >
                <div className="flex w-full items-center justify-between">
                  <table className="text-lef w-fit border border-gray-400">
                    <thead>
                      <tr className="border-b border-gray-400 bg-gray-200 text-[12px]">
                        <th className="border border-gray-400 p-2">EMP Code</th>
                        <th className="border border-gray-400 p-2">DOJ</th>
                        <th className="border border-gray-400 p-2">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-[12px]">
                        <td className="border border-gray-400 p-2 ">
                          {data.ex1}
                        </td>
                        <td className="border border-gray-400 p-2">
                          {data.ex2}
                        </td>
                        <td className="border border-gray-400 p-2">
                          {data.ex3}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col items-center justify-center">
                    <Image src={Logo} width={200} height={200} alt="Logo" />
                    <h1 className="text-center text-2xl font-extrabold">
                      Staff Onboarding Form
                    </h1>
                  </div>

                  {data.YourPhoto && (
                    <div className="right-0 top-0 h-[200px] w-[200px] overflow-hidden rounded-full">
                      <Image
                        src={data.YourPhoto}
                        width={200}
                        height={200}
                        alt="Logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Personal Details Section */}
                <SectionTitle title="Personal Details" />
                <Table className="w-full" style={{ pageBreakAfter: "always" }}>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Name
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        D.O.B
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Age
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task1}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task2}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task3}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Place of Birth
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Gender
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Marital Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task4}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task5}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task6}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Personal contact no 1
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Personal contact no 2
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Email
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task7}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task8}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task9}
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Guardian&apos;s / Spouse name
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Guardian&apos;s contect no
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Local emergency contact no
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task10}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task11}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task12}
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead
                        className="name border font-extrabold"
                        colSpan={3}
                      >
                        Language known
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell
                        className="xyx whitespace-pre-line break-words border text-black"
                        colSpan={3}
                      >
                        {data.task13}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead
                        className="name border font-extrabold"
                        colSpan={3}
                      >
                        Computer knowledge
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell
                        className="xyx whitespace-pre-line break-words border text-black"
                        colSpan={3}
                      >
                        {data.task14}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead
                        className="name border font-extrabold"
                        colSpan={2}
                      >
                        Current address
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell
                        className="xyx whitespace-pre-line break-words border text-black"
                        colSpan={3}
                      >
                        {data.task15}
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead
                        className="name border font-extrabold"
                        colSpan={3}
                      >
                        Permanent address
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell
                        className="xyx whitespace-pre-line break-words border text-black"
                        colSpan={3}
                      >
                        {data.task16}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Educational Details Section */}
                <SectionTitle title="Educational Details" />
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Qualification
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Board / Institute
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        School / College
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Marks(%)
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Year
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task17}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task21}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task25}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task29}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task33}
                      </TableCell>
                    </TableRow>
                    <TableRow className="">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task18}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task22}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task26}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task30}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task34}
                      </TableCell>
                    </TableRow>
                    <TableRow className="">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task19}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task23}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task27}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task31}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task35}
                      </TableCell>
                    </TableRow>
                    <TableRow className="">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task20}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task24}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task28}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task32}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task36}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Extra Certificates Details Section */}
                <SectionTitle title="Extra Certification Details" />
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Course
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Institute
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Certificates
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Year
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task37}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task39}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task41}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task43}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task38}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task40}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task42}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task44}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/*    Work Experience Section */}
                <SectionTitle title="Work Experience" />
                <Table className="w-full" style={{ pageBreakAfter: "always" }}>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Company / Organization
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Designation
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        From
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        To
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        {" "}
                        Ctc / Monthly
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task45}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task49}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task53}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task57}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task61}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task46}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task50}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task54}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task58}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task62}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task47}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task51}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task55}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task59}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task63}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task48}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task52}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task56}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task60}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task64}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* Bank Document */}
                <SectionTitle title="Bank Details" />
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Employee Name
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Bank Name
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Account Number
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        IFSC Code
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Bank Branch
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task65}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task66}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task67}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task68}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.task69}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Pan Card
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Aadhar Card
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Parent&lsquo;s Aadhar Card
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Passbook Photo
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.panCard && (
                          <Document title="" src={data.panCard} />
                        )}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.aadharCard && (
                          <Document title="" src={data.aadharCard} />
                        )}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.parentAdhar && (
                          <Document title="" src={data.parentAdhar} />
                        )}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.bancksheeding && (
                          <Document title="" src={data.bancksheeding} />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table className="w-full" style={{ pageBreakAfter: "always" }}>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Local Proof
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Marksheet
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.localproff && (
                          <Document title="" src={data.localproff} />
                        )}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.marksheet && (
                          <Document title="" src={data.marksheet} />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* General Clinic SOP */}
                <SectionTitle title="General Clinic SOP" />
                <Table className="w-full" style={{ pageBreakAfter: "always" }}>
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        S.No.
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Details
                      </TableHead>

                      <TableHead className="name border font-extrabold">
                        Response
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        1
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        1 week Off per week
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items1 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        2
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        2 week can be take along
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items2 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        3
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        NO week for New Joining within first 8 days
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items3 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        4
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        If Without Information Absenteeism found then 2 days
                        Attendence Deduction
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items4 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        5
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        If Emergency Leave taken (Absent) , without document
                        proof will be facing Attendence Deduction
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items5 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>

                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        6
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        If anyone is not coming he/she should informby 8am
                        inthemorning ...No Managerwill callto crosscheck
                        anditwillbmarkasAbsent
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items6 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        7
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        15 min buffer time for late coming as per your schedule
                        time , 3 LATE = 1 half day
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items7 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        8
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        45min of Break
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items8 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        9
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Personal Phone to be submitted
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items9 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        10
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Proper clean Dress up
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items10 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        11
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Proper Response to be given by allthe Phones Handling
                        team on realtime
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items11 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        12
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Daily 3 hours APP reporting
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items12 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        13
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Daily Closing Reporting
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items13 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        14
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Department or Personal WORK SOP to be followed
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items14 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        15
                      </TableCell>

                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        No misbehaviour with other Staff or Patient
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.items15 === true ? <Check /> : "na"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <SectionTitle title="TRAINING Regulation " />
                <Table className="w-full">
                  <TableBody>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        1
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        No leaves are allowed during the training period of 1st
                        6 Days
                      </TableCell>
                    </TableRow>

                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        2
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Training timing will be 10am-8pm from Sunday to Thursday
                        with a Certification on FRIDAY and SATURDAY OF
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        2
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Training timing will be 10am-8pm from Sunday to Thursday
                        with a Certification on FRIDAY and SATURDAY OF
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        3
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Consecutive absenteeism during your training period may
                        result in your removal from the training without pay
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        4
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        During the training period, there will be assessment
                        rounds conducted by the trainer or the Manager. Failing
                        on assessment before the OJT (On-the-Job)
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        5
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        Upon unsuccessful Assessment - 6 days Training period
                        will be paid only of Rs- 1500/-
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell
                        className="xyx whitespace-pre-line break-words border text-black"
                        colSpan={2}
                      >
                        * Upon successful completion of Training and Assessment
                        you will be assigned to your designated team as per the
                        process requirements and that will be the starting day
                        of your discussed salary. OJT will be for 90 days ,
                        Salary may vary on your OJT performance *
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <SectionTitle title="Official" />

                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Exit Date
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Exit Reason
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Location
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        POST
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-slate-200 text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.reco1}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.reco2}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.reco3}
                      </TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black">
                        {data.reco4}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-xl font-extrabold text-muted-foreground">
                      <TableHead className="name border font-extrabold">
                        Employees Signature
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Official Signature
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Approved By
                      </TableHead>
                      <TableHead className="name border font-extrabold">
                        Dr. Rajeev Kumar
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="h-[80px] text-lg">
                      <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
                      <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <button
                onClick={() => reactToPrintFn()}
                className="mx-auto mt-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Print to PDF
              </button>
            </>
          )}
        </>
      ) : selectedTask === "call-track" ? (
        <Table>
  <TableHeader>
    <TableRow className="bg-primary">
     
      <TableHead className="border font-extrabold">Telecaller Phone</TableHead>
      <TableHead className="border font-extrabold">Patient Phone</TableHead>
      <TableHead className="border font-extrabold">Status</TableHead>
      <TableHead className="border font-extrabold ">Start Time</TableHead>
      <TableHead className="border font-extrabold">End Time</TableHead>
      <TableHead className="border font-extrabold">Duration</TableHead>
      <TableHead className="border font-extrabold">Direction</TableHead>
      <TableHead className="border font-extrabold">Recording URL</TableHead>
    </TableRow>
  </TableHeader>

  {loading ? (
    <TableBody>
      <TableRow>
        <TableCell colSpan={9} className="text-center">
          <Loader className="mx-auto animate-spin" /> {/* Loader */}
        </TableCell>
      </TableRow>
    </TableBody>
  ) : (
    <TableBody>
      {calltraker?.map((v: any, i: any) => {
        const call = v.Call; // Accessing the Call object inside the array
        return (
          <TableRow key={i}>
            <TableCell>{call.From}</TableCell> {/* Telecaller Phone */}
            <TableCell>{call.To}</TableCell> {/* Patient Phone */}
            <TableCell>{call.Status}</TableCell>
            <TableCell>{call.StartTime}</TableCell>
            <TableCell>{call.EndTime}</TableCell>
            <TableCell>{call.Duration || 'N/A'}</TableCell> {/* Duration */}
            <TableCell>{call.Direction}</TableCell>
            <TableCell>
              <a href={call.RecordingUrl} target="_blank" rel="noopener noreferrer">
                Listen
              </a>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  )}
</Table>

      
      ) : (
        ""
      )}
    </div>
  );
}
// Component to display a title for sections
function SectionTitle({ title }: { title: string }) {
  return (
    <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
      {title}
    </h4>
  );
}

// Component to display a document with an image
function Document({ title, src }: { title: string; src: string }) {
  return (
    <div>
      <p className="font-bold text-muted-foreground">{title}</p>
      <Image src={src} width={300} height={300} alt={title} className="" />
    </div>
  );
}
