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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  autoserchSchema,
  AutoSerchValue,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import LodingButton from "../LodingButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";

export default function AminCheckdata() {
  const form = useForm<AutoSerchValue>({
    resolver: zodResolver(autoserchSchema),
    defaultValues: {
      username: "",
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

  const [timedata, settimedata] = useState({
    dipartment: "",
    fullname: "",
    city: "",
    tentwe: [],
    twetwo: [],
    twofour: [],
    foursix: [],
    sixeigh: [],
  });

  const onSubmit = async (value: AutoSerchValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/adminchekr", {
        username: value.username,
      });
      settimedata({
        dipartment: data.dnameorFname.dipartment,
        fullname: data.dnameorFname.displayname,
        city: data.dnameorFname.city,
        tentwe: data.data.tentwe,
        twetwo: data.data.twetwo,
        twofour: data.data.twofour,
        foursix: data.data.foursix,
        sixeigh: data.data.sixeigh,
      });
    } catch (error) {
      toast({
        description: "Faild to check user data",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
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

          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>

      <Card className="w-full py-8">
        <CardContent>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Full Name:{" "}
            </span>
            <span className="text-[1rem] font-semibold">
              {" "}
              {timedata.fullname}
            </span>
          </p>
        </CardContent>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Department:{" "}
            </span>
            <span className="text-[1rem] font-semibold">
              {" "}
              {timedata.dipartment}
            </span>
          </p>
        </CardFooter>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              City:{" "}
            </span>
            <span className="text-[1rem] font-semibold"> {timedata.city}</span>
          </p>
        </CardFooter>
      </Card>

      <Table className="mt-[100px]">
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              10AM - 12PM
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : timedata.tentwe.length > 0 ? (
          <TableBody>
            {timedata.tentwe.map((item: any, index) => (
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

      <Table>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              12PM - 2PM
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : timedata.twetwo.length > 0 ? (
          <TableBody>
            {timedata.twetwo.map((item: any, index) => (
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

      <Table className="mt-[100px]">
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              2PM - 4PM
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : timedata.twofour.length > 0 ? (
          <TableBody>
            {timedata.twofour.map((item: any, index) => (
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
      <Table>
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              4PM - 6PM
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : timedata.foursix.length > 0 ? (
          <TableBody>
            {timedata.foursix.map((item: any, index) => (
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

      <Table className="mt-[100px]">
        <TableHeader>
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">
              Date
            </TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="border-2 border-blue-400 text-right">
              6PM - 8PM
            </TableHead>
          </TableRow>
        </TableHeader>

        {ispending ? (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : timedata.sixeigh.length > 0 ? (
          <TableBody>
            {timedata.sixeigh.map((item: any, index) => (
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
    </>
  );
}
