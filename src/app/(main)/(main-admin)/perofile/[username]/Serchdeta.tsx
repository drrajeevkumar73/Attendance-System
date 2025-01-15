"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
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
  const [data, setData] = useState<any[]>([]); // Backend se data store karne ke liye
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [tabelex, settablseex]: any = useState({
    dipartment: "",
    data: [],
    dataOf: [],
    dataOn: [],
  });
  const [late, setatendec]: any = useState([]);
  const [s, sets] = useState(true);
  const [ispending, setispending] = useState(false);

  const fetchData = useCallback(
    async (task: string, selectedDate: Date | undefined) => {
      if (!task || !selectedDate) return;
      sets(true);
      setLoading(true); // Loading start
      try {
        if (task === "work") {
          const response = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: selectedDate,
          });
          setData(response.data);
        } else if (task === "excel") {
          const response = await axios.post("/api/alldetausingUsernam", {
            username: username,
            whichdata: task,
            calender: selectedDate,
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
            calender: selectedDate,
          });
          setatendec(response.data);
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
      const selectedDate = moment
        .tz(`${selectedYear}-${selectedMonth + 1}-01`, "YYYY-MM-DD", "Asia/Kolkata")
        .startOf("day");  // Ensure it's the start of the day in Asia/Kolkata timezone

      // Convert the moment date to ISO string (YYYY-MM-DD)
      const isoDate = selectedDate.format("YYYY-MM-DD"); // This ensures the correct date format

      // Log the ISO date to debug
      console.log("ISO Date:", isoDate);

      // Use the ISO date string in your API call

      if (selectedTask === "work") {
        const response = await axios.post("/api/alldetausingUsernam", {
          username: username,
          whichdata: selectedTask,
          month: isoDate, // Send as a string (e.g., '2025-01-01' for January 2025)
        });
        console.log(isoDate);
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
  return (
    <div className="space-y-6">
      {/* Task Selection */}
      <div className="flex justify-between">
        <div className="flex cursor-pointer flex-col space-y-3">
          {["work", "excel", "attendance"].map((task) => (
            <p
              key={task}
              onClick={() => contentClickHandler(task)}
              className={`cursor-pointer ${
                selectedTask === task ? "font-bold text-blue-600" : ""
              }`}
            >
              {task}
            </p>
          ))}
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
              {data.map((day, dayIdx) => (
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
      ) : (
        ""
      )}
    </div>
  );
}
