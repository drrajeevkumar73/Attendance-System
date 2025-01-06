"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as XLSX from "xlsx";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  exeadminSchema,
  ExeladminValue,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useId, useState } from "react";
import axios from "axios";
import LodingButton from "@/components/LodingButton";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SatffExelAdmin() {
  const form = useForm<ExeladminValue>({
    resolver: zodResolver(exeadminSchema),
    defaultValues: {
      userid: "",
      monthname: "",
      dipartment: "",
    },
  });

  const { toast } = useToast();
  const [ispending, setispending] = useState(false);
  const [client, setclient] = useState({
    RANCHI: [],
    RANCHI_SHOP: [],
    PATNA: [],
    KOLKATA: [],
    GAUR_CITY: [],
    SPECTRUM: [],
    JAGTAULI: [],
  });

  const selctor = async () => {
    const { data } = await axios.get("/api/allclient");

    setclient({
      RANCHI: data.RANCHI,
      RANCHI_SHOP: data.RANCHI_SHOP,
      PATNA: data.PATNA,
      KOLKATA: data.KOLKATA,
      GAUR_CITY: data.GAUR_CITY,
      SPECTRUM: data.SPECTRUM,
      JAGTAULI: data.JAGTAULI,
    });
  };
  useEffect(() => {
    selctor();
  }, []);

  const [tabelex, settablseex] = useState({
    name: "",
    deipartment: "",
    dipartment: "",
    data: [],
    dataOf: [],
    dataOn: [],
  });

  const onSubmit = async (value: ExeladminValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/Staffexceladmin", {
        userid: value.userid,
        monthname: value.monthname,
        dipartment: value.dipartment,
      });

      settablseex({
        name: data.name,
        deipartment: data.deipartment,
        dipartment: data.dipartment,
        data: data.data,
        dataOf: data.dataOff,
        dataOn: data.dataOn,
      });

      if (data.success === false) {
        toast({
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };

  const exportToExcel = () => {
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
        XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
        XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
    }
    else if (tabelex.dipartment === "accounstant") {
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
      XLSX.writeFile(workbook, `${tabelex.name}.xlsx`);
    }
  };

  const [of, setof] = useState(1);

  const ofileHanlder = () => {
    setof(1);
  };

  const onileHanlder = () => {
    setof(0);
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
            name="userid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serch by name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select by name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-green-500">
                          RANCHI
                        </SelectLabel>
                        {client?.RANCHI.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          RANCHI SHOP
                        </SelectLabel>
                        {client?.RANCHI_SHOP.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          PATNA
                        </SelectLabel>
                        {client?.PATNA.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}

                        <SelectLabel className="text-green-500">
                          KOLKATA
                        </SelectLabel>
                        {client?.KOLKATA.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}

                        <SelectLabel className="text-green-500">
                          GAUR CITY
                        </SelectLabel>
                        {client?.GAUR_CITY.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          SPECTRUM
                        </SelectLabel>
                        {client?.SPECTRUM.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          JAGTAULI
                        </SelectLabel>
                        {client?.JAGTAULI.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
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
                <FormLabel>Check client work history</FormLabel>
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
                    <SelectGroup>
                      <SelectItem value="Today">Today</SelectItem>

                      <SelectItem value="Yesterday">Yesterday</SelectItem>

                      <SelectItem value="last_7_day">last 7 day</SelectItem>
                      <SelectLabel>Select By Month</SelectLabel>
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
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dipartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dipartment</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dipartment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dipartment</SelectLabel>
                        <SelectItem value="CENTER OPS MANAGER">
                          CENTER MANAGER
                        </SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="CASHIER">CASHIER</SelectItem>
                        <SelectItem value="RECEPTIONS">RECEPTIONS</SelectItem>
                        <SelectItem value="MEDICINE COUNTER">
                          MEDICINE COUNTER
                        </SelectItem>
                        <SelectItem value="HD / OD"> HD / OD</SelectItem>
                        <SelectItem value="TELECALLER DEPT">
                          TELECALLER
                        </SelectItem>
                        <SelectItem value="MIXER">MIXER</SelectItem>
                        <SelectItem value="ECART">ECART</SelectItem>
                        <SelectItem value="DESIGNER"> DESIGNER</SelectItem>
                        <SelectItem value="DIGITAL MARKETING">
                          DIGITAL MARKETING
                        </SelectItem>
                        <SelectItem value="DOCTOR"> DOCTOR</SelectItem>
                        <SelectItem value="MAID / OFFICE BOY">
                          MAID / OFFICE BOY
                        </SelectItem>
                        <SelectItem value="GUARD"> GUARD</SelectItem>
                        <SelectItem value="DRIVER"> DRIVER</SelectItem>
                        <SelectItem value="ACCOUNTANT">ACCOUNTANT</SelectItem>
                        <SelectItem value="INVENTORY"> INVENTORY</SelectItem>
                        <SelectItem value="TRUST MARKETING">
                          TRUST MARKETING
                        </SelectItem>
                        <SelectItem value="SHOP RANCHI">SHOP RANCHI</SelectItem>
                        <SelectItem value="MIS">MIS</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

      <button
        type="button"
        onClick={exportToExcel}
        className="rounded bg-blue-500 p-2 text-white"
      >
        {" "}
        Export to Excel
      </button>

      {tabelex.dipartment === "telecaller" ? (
        <>
          <Table>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">Work</TableHead>
                <TableHead className="border-2 border-blue-400">
                  Incoming
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Outgoing
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Total
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Whatsapp / Text
                </TableHead>
                <TableHead className="border-2 border-blue-400">Appt</TableHead>
                <TableHead className="border-2 border-blue-400">Fees</TableHead>
                <TableHead className="border-2 border-blue-400">
                  New Patient
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                      {Number(v.task2) + Number(v.task3)}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task4}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task5}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task6}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task7}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeTime(v.createdAt)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            )}
          </Table>
        </>
      ) : tabelex.dipartment === "reception" ? (
        <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
          <Table className="w-[2000px]">
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">Date</TableHead>

                <TableHead className="border-2 border-blue-400">
                  PATIENT
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  VISITED
                </TableHead>
                <TableHead className="border-2 border-blue-400">NEW</TableHead>

                <TableHead className="border-2 border-blue-400">OLD</TableHead>
                <TableHead className="border-2 border-blue-400">
                  By JR Dr.
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  ENQUIRY
                </TableHead>
                <TableHead className="border-2 border-blue-400">CALL</TableHead>
                <TableHead className="border-2 border-blue-400">
                  WHATSAPP
                </TableHead>
                <TableHead className="border-2 border-blue-400">APP</TableHead>
                <TableHead className="border-2 border-blue-400">
                  MESSAGE
                </TableHead>
                <TableHead className="border-2 border-blue-400">CASH</TableHead>
                <TableHead className="border-2 border-blue-400">
                  ONLINE
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  GRAND TOTAL
                </TableHead>

                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                    <TableCell className="border-2 border-blue-400">
                      {v.task11}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task12}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {Number(v.task11) + Number(v.task12)}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeTime(v.createdAt)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            )}
          </Table>
        </div>
      ) : tabelex.dipartment === "medicen" ? (
        <div className="mx-auto overflow-auto lg:w-[800px] 2xl:w-[1100px]">
          <Table>
            <TableHeader>
              <TableRow className="border border-primary bg-primary">
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">
                  TOTAL BILL
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  MARG SALE
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  LOOSE SALE
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  TOTAL SALE
                </TableHead>

                <TableHead className="border-2 border-blue-400">
                  SALE QTY
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                      {Number(v.task2) + Number(v.task3)}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task4}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
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
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">
                  TOTAL BILL
                </TableHead>
                <TableHead className="border-2 border-blue-400">MARG</TableHead>
                <TableHead className="border-2 border-blue-400">
                  LOOSE
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  TOTAL SALE
                </TableHead>

                <TableHead className="border-2 border-blue-400">CASH</TableHead>
                <TableHead className="border-2 border-blue-400">CARD</TableHead>
                <TableHead className="border-2 border-blue-400">SCAN</TableHead>
                <TableHead className="border-2 border-blue-400">
                  RETURN
                </TableHead>
                <TableHead className="border-2 border-blue-400">CRDT</TableHead>
                <TableHead className="border-2 border-blue-400">
                  DISC AMT
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                      {Number(v.task2) + Number(v.task3)}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task4}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task5}
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
                    <TableHead className="border-2 border-blue-400">
                      Date
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      Doctor
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      NEW PATIENT
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      OLD PATIENT
                    </TableHead>

                    <TableHead className="border-2 border-blue-400">
                      FEES
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      COUNTER MEDICINE{" "}
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      LAB
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      WHATSAPP
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      FOLLOW UP CALL
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      ARTICLE
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      CONTENT
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      QUESTIONNAIRE
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      CASE HISTORY
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      CAMP{" "}
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {ispending ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="">
                        Loading...
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
                  tabelex?.dataOf?.map((v: any, i) => (
                    <TableBody className="border border-primary" key={i}>
                      <TableRow>
                        <TableCell className="border-2 border-blue-400">
                          {formatRelativeMonthDate(v.createdAt)}
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
                    <TableHead className="border-2 border-blue-400">
                      Date
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      Doctor
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      Interakt
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INTL - LEADS
                    </TableHead>

                    <TableHead className="border-2 border-blue-400">
                      INTL - NATIONAL
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INTL - INTERNATIONAL
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      NATIONAL - FEES
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INTERNATIONAL - FEES
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      NATIONAL - MED
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INTERNATIONAL - MED
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      MAIL
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      VIDEO
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      FB - REPLY
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      FB - Conversion{" "}
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INT - REPLY
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      INT - Conversion
                    </TableHead>
                    <TableHead className="border-2 border-blue-400">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {ispending ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} className="">
                        Loading...
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
                  tabelex?.dataOn?.map((v: any, i) => (
                    <TableBody className="border border-primary" key={i}>
                      <TableRow>
                        <TableCell className="border-2 border-blue-400">
                          {formatRelativeMonthDate(v.createdAt)}
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

                        <TableCell className="border-2 border-blue-400">
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
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">O.G</TableHead>
                <TableHead className="border-2 border-blue-400">IN</TableHead>
                <TableHead className="border-2 border-blue-400">
                  HD. ORDER
                </TableHead>

                <TableHead className="border-2 border-blue-400">
                  HD DISP
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  HD AMT
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  {" "}
                  PRES - Send
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  OD. ORDER
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  OD DISP
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  OD PENDING
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  MANUAL SENT
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  LOOSE Medi
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  OD AMT
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  FRIGHT{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  TOTAL{" "}
                </TableHead>

                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                      {Number(v.task12) + Number(v.task13)}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
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
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">
                  Amazon{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Amount
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Listing
                </TableHead>

                <TableHead className="border-2 border-blue-400">
                  Flipkart
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Amount
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Listing
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                    <TableCell className="border-2 border-blue-400">
                      {v.task6}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
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
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">
                  Video Count
                </TableHead>
                <TableHead className="border-2 border-blue-400">MADE</TableHead>
                <TableHead className="border-2 border-blue-400">
                  EXPORT
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  DOWNLOAD
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  EDITING
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  YouTube
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Reel / short
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Banner
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Send to DR, Rajeev&lsquo;s sir (date)
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  INSTAGRAM POST BY DR. RAJEEV SIR
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  FACEBOOK POST BY RAJEEV SIR
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Post by Vikash Sir
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                    <TableCell className="border-2 border-blue-400">
                      {v.task11}
                    </TableCell>
                    <TableCell className="border-2 border-blue-400">
                      {v.task12}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
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
                <TableHead className="border-2 border-blue-400">Date</TableHead>
                <TableHead className="border-2 border-blue-400">
                  Medicine Name
                </TableHead>
                <TableHead className="border-2 border-blue-400">QTY</TableHead>
                <TableHead className="border-2 border-blue-400">
                  Order by{" "}
                </TableHead>

                <TableHead className="border-2 border-blue-400">
                  Marg Entry{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Breakge{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">
                  Marg Entry by{" "}
                </TableHead>
                <TableHead className="border-2 border-blue-400">Time</TableHead>
              </TableRow>
            </TableHeader>

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
                <TableBody className="border border-primary" key={i}>
                  <TableRow>
                    <TableCell className="border-2 border-blue-400">
                      {formatRelativeMonthDate(v.createdAt)}
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
                    <TableCell className="border-2 border-blue-400">
                      {v.task6}
                    </TableCell>

                    <TableCell className="border-2 border-blue-400">
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

            {ispending ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} className="">
                    Loading...
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
              tabelex?.data?.map((v: any, i) => (
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
      ) : (
        ""
      )}
    </>
  );
}
