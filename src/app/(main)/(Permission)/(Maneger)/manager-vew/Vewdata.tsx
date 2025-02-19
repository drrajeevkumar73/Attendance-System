"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import * as XLSX from "xlsx";
import { Check, X } from "lucide-react";
import { CalederValue, calenderSchema } from "@/lib/vallidation";
import moment from "moment-timezone";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

// ✅ PDF me diye gaye tasks list
const tasks = [
  { id: 1, name: "All Calling Process", dept: "Reception" },
  { id: 2, name: "Patient Booking Application", dept: "Reception" },
  { id: 3, name: "Follow Up Transfer", dept: "Reception" },
  { id: 4, name: "Follow Up Call", dept: "Reception" },
  { id: 5, name: "Confirmation Call", dept: "Reception" },
  { id: 6, name: "Confirmation Call Report", dept: "Reception" },
  { id: 7, name: "All Register Update", dept: "Reception" },
  { id: 8, name: "Counter Patient Handling", dept: "Reception" },
  { id: 9, name: "WhatsApp", dept: "Reception" },
  { id: 10, name: "Daily + Hourly Report", dept: "Reception" },

  { id: 11, name: "Marg Medicine", dept: "Medicine" },
  { id: 12, name: "Stock Manage", dept: "Medicine" },
  { id: 13, name: "Purchase Register Check", dept: "Medicine" },
  { id: 14, name: "Purchase File Check", dept: "Medicine" },
  { id: 15, name: "All Medicine Availability", dept: "Medicine" },
  { id: 16, name: "RW Medicine Order as per Date", dept: "Medicine" },
  { id: 17, name: "INDIAN Medicine Order as per Date", dept: "Medicine" },
  { id: 18, name: "Short Medicine Register Update", dept: "Medicine" },
  { id: 19, name: "Manual Bill Book Check", dept: "Medicine" },
  { id: 20, name: "Other Center Billing for Dispatch", dept: "Medicine" },

  { id: 21, name: "RK Requirement Check + Making", dept: "MIX" },
  { id: 22, name: "RK - Pond Availability - 2 Months", dept: "MIX" },
  { id: 23, name: "RK - Medicine Availability - 2 Months", dept: "MIX" },
  { id: 24, name: "Container Availability", dept: "MIX" },
  { id: 25, name: "Sticker Availability", dept: "MIX" },

  { id: 26, name: "Data Churn", dept: "Telly Calling" },
  { id: 27, name: "Calling Data Work", dept: "Telly Calling" },
  { id: 28, name: "Miss Call + WhatsApp Reply", dept: "Telly Calling" },
  { id: 29, name: "Call Connect + Revenue Generation", dept: "Telly Calling" },
  { id: 30, name: "Patient Numbering Book as TARGET", dept: "Telly Calling" },

  { id: 31, name: "Online Consultation", dept: "Doctor" },
  { id: 32, name: "Interkart", dept: "Doctor" },
  { id: 33, name: "Inteliticks", dept: "Doctor" },
  { id: 34, name: "Online Patient", dept: "Doctor" },
  { id: 35, name: "Online Patient Medicine Follow-Up", dept: "Doctor" },
  { id: 36, name: "Old Online Patient Follow-Up", dept: "Doctor" },
  { id: 37, name: "International Online Patient Follow-Up", dept: "Doctor" },
  { id: 38, name: "Case History", dept: "Doctor" },
  { id: 39, name: "Facebook Replying & Calling", dept: "Doctor" },
  { id: 40, name: "Instagram Replying & Calling", dept: "Doctor" },

  { id: 41, name: "Home Delivery Sale", dept: "HD & OD" },
  { id: 42, name: "Out Delivery Sale", dept: "HD & OD" },
  { id: 43, name: "Delivery Track - POD", dept: "HD & OD" },
  { id: 44, name: "Order Note + Follow-Up Order Inquiry", dept: "HD & OD" },
  {
    id: 45,
    name: "Follow-Up of Daily Online Consultation Patient",
    dept: "HD & OD",
  },

  { id: 46, name: "E-Com Product Listing", dept: "E-com" },
  { id: 47, name: "E-Com Product Sale", dept: "E-com" },
  { id: 48, name: "New E-Com Platform Enlistment", dept: "E-com" },
  { id: 49, name: "Wellness E-Com Website Promotion", dept: "E-com" },
  { id: 50, name: "Compliance Handling of E-Com", dept: "E-com" },

  { id: 51, name: "Video Create + Edit", dept: "Design" },
  { id: 52, name: "Banner & GIF Create + Edit", dept: "Design" },
  { id: 53, name: "Social Media Post on Platforms", dept: "Design" },
  { id: 54, name: "Inhouse + WhatsApp + Status Post Handling", dept: "Design" },
  { id: 55, name: "Presentation Creation", dept: "Design" },

  { id: 56, name: "ERP Maintain", dept: "Developer" },
  { id: 57, name: "ERP Updation", dept: "Developer" },
  { id: 58, name: "CRM Design", dept: "Developer" },
  { id: 59, name: "Website Design", dept: "Developer" },
  { id: 60, name: "Patient App", dept: "Developer" },

  {
    id: 61,
    name: "All Center All Department Closing Checking",
    dept: "Accounts",
  },
  {
    id: 62,
    name: "All Center All Department Closing Tracker",
    dept: "Accounts",
  },
  { id: 63, name: "All Payments (Daily + Monthly)", dept: "Accounts" },
  { id: 64, name: "CA Works", dept: "Accounts" },
  { id: 65, name: "Paper + Documents Maintain", dept: "Accounts" },

  { id: 66, name: "Closing Report", dept: "Cashier" },
  { id: 67, name: "Last Day UPI Check", dept: "Cashier" },
  { id: 68, name: "All Statement Match", dept: "Cashier" },
  { id: 69, name: "All Closing Report & Cash", dept: "Cashier" },
  { id: 70, name: "LAB + LOOSE Record Keeping", dept: "Cashier" },

  { id: 71, name: "Daily Attendance All Branch", dept: "HR" },
  { id: 72, name: "Monthly Attendance All Branch", dept: "HR" },
  { id: 73, name: "Staff Record Keeping", dept: "HR" },
  { id: 74, name: "All Department-wise Report", dept: "HR" },
  { id: 75, name: "Weekly Audit or Review Report", dept: "HR" },
  { id: 76, name: "Staff Productivity Tracker", dept: "HR" },
  { id: 77, name: "Staff Performance Tracker", dept: "HR" },
  { id: 78, name: "Doctor Performance Report", dept: "HR" },
  { id: 79, name: "Staff-wise Work Distribution", dept: "HR" },
  { id: 80, name: "All Center Daily Work Status", dept: "HR" },

  { id: 81, name: "Track on Routine Work + Pending Work", dept: "HR" },
  { id: 82, name: "Pending Work Update", dept: "HR" },
  { id: 83, name: "Pending Work Report", dept: "HR" },
  { id: 84, name: "All Manager Checklist", dept: "HR" },
  { id: 85, name: "Managers Today Work Plan", dept: "HR" },
  { id: 86, name: "Managers Tomorrow Work Plan", dept: "HR" },
  { id: 87, name: "All Department Daily SOP Follow-Up & Checking", dept: "HR" },
  { id: 88, name: "EOD Reporting", dept: "HR" },
  { id: 89, name: "Hiring Report", dept: "HR" },
  { id: 90, name: "Daily Branch Report", dept: "HR" },
  { id: 91, name: "Staff Feedback Tracker", dept: "HR" },
  { id: 92, name: "Meeting Agenda Planner", dept: "HR" },
  { id: 93, name: "Minutes of Meeting", dept: "HR" },
  { id: 94, name: "SIR Work Completion Report", dept: "HR" },
  { id: 95, name: "All Checklist Reporting", dept: "HR" },
  { id: 96, name: "All Floor Administrative Works", dept: "Floor Manager" },
  { id: 97, name: "Branch Floor Staff Management", dept: "Floor Manager" },
  { id: 98, name: "Patient Management", dept: "Floor Manager" },
  { id: 99, name: "Camp Data Report", dept: "Floor Manager" },
  { id: 100, name: "Review Collection", dept: "Floor Manager" },
];

export default function Vewdata() {
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });

  const exportToExcel = (data: any) => {
    if (!data || data.length === 0) return;

    // 🔹 Convert Data into Excel Format
    const formattedData = data.flatMap((entry: any, index: number) => {
      const dateRow = [
        `Date`,
        formatRelativeMonthDate(entry.createdAt),
        `Time`,
        formatRelativeTime(entry.createdAt),
      ];
      const headerRow = [
        `S.No`,
        `Megha - Dept Training Covered`,
        `Dept`,
        `Training Required`,
        `Checklist`,
      ];

      const taskRows = tasks.map((task) => [
        task.id,
        task.name,
        task.dept,
        entry.tasks[`training${task.id}`] || "",
        entry.tasks[`checklist${task.id}`] ? "✔" : "",
      ]);

      return [dateRow, headerRow, ...taskRows, []]; // Empty Row for Spacing
    });

    // 🔹 Create Excel Sheet
    const ws = XLSX.utils.aoa_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    // 🔹 Export File
    XLSX.writeFile(wb, "Manager_Report.xlsx");
  };

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: CalederValue) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/manager-vew", {
        monthname: value,
      });
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
        setLoading(true);
        const { data } = await axios.post("/api/manager-vew", {
          calendarDate: dateInIST, // Send the formatted date
        });
        setData(data);
        console.log("Data from API:", data); // Handle the response as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [], // No dependencies on task or other variables
  );

  useEffect(() => {
    if (date) {
      fetchData(date); // Fetch data with the date
    }
  }, [date, fetchData]);

  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");
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
            className="w-fit space-y-6"
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
      <div className="flex justify-center">
        <Button onClick={() => exportToExcel(data)}>Export To Excel</Button>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex w-full justify-center">
            <div className="w-11/12 md:w-3/4 lg:w-2/3">
              <Table className="w-full border-collapse">
                <TableBody>
                  {/* ✅ Multiple Entries ko Properly Handle Karna */}
                  {data.map((entry, index) => (
                    <tbody key={index}>
                      {/* ✅ Date Row */}
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="border border-blue-500 bg-gray-200 py-3 text-center text-lg font-bold"
                        >
                          Date: {formatRelativeMonthDate(entry.createdAt)}
                        </TableCell>
                        <TableCell
                          colSpan={3}
                          className="border border-blue-500 bg-gray-200 py-3 text-center text-lg font-bold"
                        >
                          Time: {formatRelativeTime(entry.createdAt)}
                        </TableCell>
                      </TableRow>

                      {/* ✅ Table Header (Repeat for Each Entry) */}

                      <TableRow className="bg-yellow-500 font-bold text-black">
                        <TableHead className="border border-blue-500 p-2 text-center">
                          S.No
                        </TableHead>
                        <TableHead className="border border-blue-500 p-2 text-center">
                          Megha - Department Training Covered
                        </TableHead>
                        <TableHead className="border border-blue-500 p-2 text-center">
                          Dept
                        </TableHead>
                        <TableHead className="border border-blue-500 p-2 text-center">
                          Training Required
                        </TableHead>
                        <TableHead className="border border-blue-500 p-2 text-center">
                          Checklist
                        </TableHead>
                      </TableRow>

                      {/* ✅ Tasks Map Karna */}
                      {tasks.map((task, taskIndex) => {
                        const trainingValue =
                          entry.tasks[`training${task.id}`] || "";
                        const checklistValue =
                          entry.tasks[`checklist${task.id}`];

                        return (
                          <TableRow
                            key={`task-${task.id}-${index}`}
                            className="text-center"
                          >
                            <TableCell className="border border-blue-500 p-2">
                              {task.id}
                            </TableCell>
                            <TableCell className="border border-blue-500 p-2">
                              {task.name}
                            </TableCell>
                            <TableCell className="border border-blue-500 p-2">
                              {task.dept}
                            </TableCell>
                            <TableCell className="border border-blue-500 p-2 whitespace-pre-line">
                              {trainingValue}
                            </TableCell>
                            <TableCell className="border border-blue-500 p-2">
                              {checklistValue ? (
                                <Check className="mx-auto size-6 text-green-500" />
                              ) : (
                                // <X className="mx-auto size-6 text-red-500" />
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      {/* ✅ Blank Row for Spacing */}
                      <TableRow>
                        <TableCell colSpan={5}></TableCell>
                      </TableRow>
                    </tbody>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
