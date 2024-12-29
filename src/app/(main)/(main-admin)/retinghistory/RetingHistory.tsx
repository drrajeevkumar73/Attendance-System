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
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
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
import {
  autoserchSchema,
  AutoSerchValue,
  PrensetnameValue,
  presentSchema,
  serchSchema,
  SerchValue,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import LodingButton from "@/components/LodingButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function RetingHistory() {
  const form = useForm<AutoSerchValue>({
    resolver: zodResolver(autoserchSchema),
    defaultValues: {
      username: "",
    },
  });

  const form2 = useForm<PrensetnameValue>({
    resolver: zodResolver(presentSchema),
    defaultValues: {
      atendace: "",
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
  const [alluserdata, setalluseerdata] = useState({
    displayname: "",
    dipartment: "",
    StaffWork: [], // Array hona chahiye
  });

  const [idx, setidx] = useState("");
  const onSubmit = async (values: AutoSerchValue) => {
    try {
      setispending(true);
      const data = await axios.post("/api/allinputedata", {
        username: values.username,
      });
      setidx(values.username);
      setalluseerdata({
        displayname: data.data.displayname,
        dipartment: data.data.dipartment,
        StaffWork: data.data.StaffWork, // Default array
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };
  const [pending, sesetispending] = useState(false);
  const onsubmitatendace = async (value: PrensetnameValue) => {
    try {
      sesetispending(true);
     const {data}= await axios.post("/api/reamrkstaff", {
        idx: idx,
        attendance: value.atendace,
      });
      toast({
        description: data.message,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sed data. Please try again.",
        variant: "destructive",
      });
    } finally {
      sesetispending(false);
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

      <Form {...form2}>
        <form
          action=""
          onSubmit={form2.handleSubmit(onsubmitatendace)}
          className="space-y-4"
        >
          <FormField
            control={form2.control}
            name="atendace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remark To Staff</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Remark Staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LodingButton loding={pending} type="submit" className="w-full">
            Send Remark
          </LodingButton>
        </form>
      </Form>

      <Table>
        <TableHeader className="border border-primary">
          <TableRow className="border border-primary bg-primary">
            <TableHead className="w-[100px] border-2 border-blue-400">Date</TableHead>
            <TableHead className="border-2 border-blue-400">Work</TableHead>
            <TableHead className="text-right border-2 border-blue-400">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-primary">
          {ispending ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : alluserdata.displayname && alluserdata.StaffWork.length > 0 ? (
            alluserdata.StaffWork.map((work: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium border-2 border-blue-400">
                  {formatRelativeMonthDate(work.createdAt)}
                </TableCell>
                <TableCell className="space-y-4 font-medium border-2 border-blue-400">
                  {[...Array(20)].map((_, i) => (
                    <p key={i}>{work[`task${i + 1}`]}</p>
                  ))}
                </TableCell>
                <TableCell className="text-right font-medium w-[200px] border-2 border-blue-400">
                  {formatRelativeTime(work.createdAt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
