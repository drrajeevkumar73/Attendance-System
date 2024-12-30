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
import { serchSchema, SerchValue } from "@/lib/vallidation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import LodingButton from "@/components/LodingButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Atendace() {
  const form = useForm<SerchValue>({
    resolver: zodResolver(serchSchema),
    defaultValues: {
      username: "",
      monthname: "",
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

  const [userdate, setuserdat] = useState({
    Totalwork: [],
    Atendace: "",
    dipartment: "",
    displayname: "",
    city: "",
  });

  const [late, setlate] = useState([]);

  const onSubmit = async (value: SerchValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/toatalpresnrtdat", {
        username: value.username,
        monthname: value.monthname,
      });
      setuserdat({
        Totalwork: data.data.Totalwork,
        Atendace: data.data.Atendace,
        dipartment: data.data.dipartment,
        displayname: data.data.displayname,
        city: data.data.city,
      });
    
      setlate(data.data.filteredLatesatus);
    } catch (error) {
      toast({
        description: "Faild to send deta.",
      });
    } finally {
      setispending(false);
    }
  };

  const [tab, setTad] = useState(1);
  const plushHandler = () => {
    setTad(1);
  };
  const minusHandler = () => {
    setTad(0);
  };
  function formatMinutesToHoursMinutes(minutes:any) {
  if (!minutes) return "0h 0m"; // Handle null or undefined
  const hours = Math.floor(minutes / 60); // Calculate hours
  const remainingMinutes = minutes % 60; // Calculate remaining minutes
  return `${hours}h ${remainingMinutes}m`; // Return formatted string
}
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
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
                          RANCHI Staff name
                        </SelectLabel>
                        {client?.RANCHI.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          RANCHI SHOP Staff name
                        </SelectLabel>
                        {client?.RANCHI_SHOP.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          PATNA Staff name
                        </SelectLabel>
                        {client?.PATNA.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}

                        <SelectLabel className="text-green-500">
                          KOLKATA Staff name
                        </SelectLabel>
                        {client?.KOLKATA.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}

                        <SelectLabel className="text-green-500">
                          GAUR CITY Staff name
                        </SelectLabel>
                        {client?.GAUR_CITY.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          SPECTRUM Staff name
                        </SelectLabel>
                        {client?.SPECTRUM.map((v: any, i: any) => (
                          <SelectItem key={i} value={v.id}>
                            {v.displayname}
                          </SelectItem>
                        ))}
                        <SelectLabel className="text-green-500">
                          JAGTAULI Staff name
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

          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>

      <Card className="w-full py-8">
        <CardContent>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Full Name:
            </span>
            <span className="text-[1rem] font-semibold text-red-500">
              {userdate.displayname}
            </span>
          </p>
        </CardContent>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Department:
            </span>
            <span className="text-[1rem] font-semibold text-red-500">
              {userdate.dipartment}
            </span>
          </p>
        </CardFooter>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              City:
            </span>
            <span className="text-[1rem] font-semibold text-red-500">
              {userdate.city}
            </span>
          </p>
        </CardFooter>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Total Present In This Month:
            </span>
            <span className="text-[1rem] font-semibold text-red-500">
              {userdate.Atendace}
            </span>
          </p>
        </CardFooter>
      </Card>

      <div>
        <Button
          onClick={plushHandler}
          className={` ${tab === 1 ? "bg-blue-400 hover:bg-blue-400" : ""}`}
        >
          Task
        </Button>{" "}
        <Button
          onClick={minusHandler}
          className={` ${tab === 0 ? "bg-blue-400 hover:bg-blue-400" : ""}`}
        >
          Late
        </Button>
      </div>
      <div className={`w-full ${tab === 1 ? "block" : "hidden"}`}>
      <Table>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : userdate.Totalwork.length > 0 ? (
          <TableBody>
            {userdate.Totalwork.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="border-2 border-blue-400 font-medium">
                  {formatRelativeMonthDate(item.createdAt)}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {item.content}
                </TableCell>
                <TableCell className="w-[200px] border-2 border-blue-400 text-right">
                  {formatRelativeTime(item.createdAt)}
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
      </div>
      <div className={`w-full ${tab === 0 ? "block" : "hidden"}`}>
      <Table>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Status</TableHead>
            <TableHead className="border-2 border-blue-400">Late Time</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : late?.length > 0 ? (
          <TableBody>
            {late?.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="border-2 border-blue-400 font-medium">
                  {formatRelativeMonthDate(item.createdAt)}
                </TableCell>
               
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {item.status}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {/* {formatMinutesToHoursMinutes(item.lateMinutes)} */}
                  {
                    item.lateMinutes>60?
                    formatMinutesToHoursMinutes(item.lateMinutes)
                    :
                    item.lateMinutes+'m'
                  }
                </TableCell>
                <TableCell className="w-[200px] border-2 border-blue-400 text-right">
                  {formatRelativeTime(item.createdAt)}
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
      </div>

     
    </>
  );
}
