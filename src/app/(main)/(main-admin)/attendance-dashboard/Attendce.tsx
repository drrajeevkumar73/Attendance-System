"use client";
import LodingButton from "@/components/LodingButton";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aSchema, AValue } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx"; // Import xlsx library
import { formatRelativeTime } from "@/lib/utils";

export default function Attendce() {
  const form = useForm<AValue>({
    resolver: zodResolver(aSchema),
    defaultValues: {
      cityname: "",
      monthname: "",
    },
  });

  const [late, setlate] = useState<{
    attendanceCountByUser: any[];
    attendanceDetails: any[];
  }>({
    attendanceCountByUser: [],
    attendanceDetails: [],
  });

  const [ispending, setispending] = useState(false);
  const onSubmit = async (value: AValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/switchTotal-attendce", {
        cityname: value.cityname,
        monthname: value.monthname,
      });
      setlate({
        attendanceCountByUser: data.attendanceCountByUser || [],
        attendanceDetails: data.attendanceDetails || [],
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setispending(false);
    }
  };

  // console.log(late.attendanceCountByUser)
  function formatMinutesToHoursMinutes(minutes: any) {
    if (!minutes) return "0h 0m"; // Handle null or undefined
    const hours = Math.floor(minutes / 60); // Calculate hours
    const remainingMinutes = minutes % 60; // Calculate remaining minutes
    return `${hours}h ${remainingMinutes}m`; // Return formatted string
  }

  const exportToExcel = () => {
    const dataForExcel = late.attendanceCountByUser.map((item) => ({
      Name: item.displayname,
      Department: item.dipartment,
      "Present Count": item.presentCount,
      "Total Late": item.attendanceDetails?.filter(
        (v: any) => v.status === "Late",
      ).length,
      "Attendance Details": item.attendanceDetails
        ?.map(
          (detail: any) =>
            `Date: ${detail.date}, Status: ${detail.status}, In Time: ${formatRelativeTime(
              detail.createdAt,
            )}, Out Time :${
              detail.outime == null ? "N/A" : formatRelativeTime(detail.outime)
            } , Late Duration:   ${formatMinutesToHoursMinutes(detail.latetime)}`,
        )
        .join("\n"),
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    XLSX.writeFile(wb, "attendance_data.xlsx");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="cityname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>City</SelectLabel>
                        <SelectItem value="RANCHI">RANCHI</SelectItem>
                        <SelectItem value="RANCHI SHOP">RANCHI SHOP</SelectItem>
                        <SelectItem value="PATNA">PATNA</SelectItem>
                        <SelectItem value="KOLKATA">KOLKATA</SelectItem>
                        <SelectItem value="GAUR CITY">GAUR CITY</SelectItem>
                        <SelectItem value="SPECTRUM">SPECTRUM</SelectItem>
                        <SelectItem value="JAGTAULI">JAGTAULI</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Month</FormLabel>
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
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="Yesterday">Yesterday</SelectItem>
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
          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>

      <Button onClick={exportToExcel} className="mt-4">
        Export to Excel
      </Button>

      <Table className="mt-4">
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="border-2 border-blue-400">Name</TableHead>
            <TableHead className="border-2 border-blue-400">
              Department
            </TableHead>
            <TableHead className="border-2 border-blue-400">
              Present Count
            </TableHead>
            <TableHead className="border-2 border-blue-400">
              {" "}
              Total Late
            </TableHead>

            <TableHead className="border-2 border-blue-400">Status</TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : late?.attendanceCountByUser.length > 0 ? (
          <TableBody>
            {late?.attendanceCountByUser.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {item.displayname}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {item.dipartment}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {item.presentCount}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {
                    item.attendanceDetails?.filter(
                      (v: any) => v.status === "Late",
                    ).length
                  }
                </TableCell>

                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="border bg-yellow-100 px-2 py-1 text-black">
                          Date
                        </th>
                        <th className="border bg-yellow-100 px-2 py-1 text-black">
                          Status
                        </th>
                        <th className="border bg-yellow-100 px-2 py-1 text-black">
                          In Time
                        </th>
                        <th className="border bg-yellow-100 px-2 py-1 text-black">
                          Out Time
                        </th>
                        <th className="border bg-yellow-100 px-2 py-1 text-black">
                          Late Duration
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.attendanceDetails?.map(
                        (detailer: any, index: any) => (
                          <tr key={index}>
                            <td className="border px-2 py-1">
                              {detailer.date}
                            </td>
                            <td className="border px-2 py-1">
                              {detailer.status}
                            </td>
                            <td className="border px-2 py-1">
                              {formatRelativeTime(detailer.createdAt)}
                            </td>
                            <td className="border px-2 py-1">
                              {detailer.outime == null
                                ? "N/A"
                                : formatRelativeTime(detailer.outime)}

                              {/* { detailer.outime} */}
                            </td>

                            <td className="border px-2 py-1">
                              {formatMinutesToHoursMinutes(detailer.latetime)}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <tbody>
            <TableRow>
              <TableCell colSpan={3}>No data available</TableCell>
            </TableRow>
          </tbody>
        )}
      </Table>
    </>
  );
}
