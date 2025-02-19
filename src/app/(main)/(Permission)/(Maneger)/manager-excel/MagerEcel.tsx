"use client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { ManagerValue, managerSchema } from "@/lib/vallidation";
import { Button } from "@/components/ui/button";

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

export default function ManagerExcel() {
  const { toast } = useToast();
  const form = useForm<ManagerValue>({
    resolver: zodResolver(managerSchema),
    defaultValues: tasks.reduce(
      (acc: any, task: any) => {
        acc[`training${task.id}`] = ""; // 🛠 Default for Textarea
        acc[`checklist${task.id}`] = false; // ✅ Default for Checkbox
        return acc;
      },
      { date: "" },
    ),
  });

  const [isPending, setIsPending] = useState(false);

  const submitHandler = async (values: ManagerValue) => {
    try {
      setIsPending(true);
      const { data } = await axios.post("/api/manager-excel", values);
      form.reset();
      toast({ description: data.message, variant: "default" });
    } catch (error: any) {
      toast({
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submitHandler)}>
        <Table>
          <TableHeader>
            <TableRow className="border border-blue-600">
              <TableHead className="border border-blue-600">S.No</TableHead>
              <TableHead className="border border-blue-600">
                Megha - Department Training Covered
              </TableHead>
              <TableHead className="border border-blue-600">Dept</TableHead>
              <TableHead className="border border-blue-600">
                Training Required
              </TableHead>
              <TableHead className="border border-blue-600">
                Checklist
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-blue-600">
            <TableRow className="border border-blue-600">
              <TableCell colSpan={2} className="border border-blue-600">
                Date for previous day
              </TableCell>
              <TableCell colSpan={3}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-blue-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>

            {tasks.map((task) => (
              <TableRow key={task.id} className="border border-blue-600">
                <TableCell className="border border-blue-600">
                  {task.id}
                </TableCell>
                <TableCell className="border border-blue-600">
                  {task.name}
                </TableCell>
                <TableCell className="border border-blue-600">
                  {task.dept}
                </TableCell>

                {/* Textarea for Training Required (Only for Odd IDs) */}
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`training${task.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="border border-[blue]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                {/* Checkbox for Checklist */}
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`checklist${task.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-[80px] w-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
