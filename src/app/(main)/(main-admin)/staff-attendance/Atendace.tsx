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
  const [client, setclient] = useState<[]>();
  const selctor = async () => {
    const { data } = await axios.get("/api/allclient");
    setclient(data);
  };
  useEffect(() => {
    selctor();
  }, []);

  const [userdate,setuserdat]=useState({
    Totalwork:[],
    Atendace:"",
    dipartment:"",
    displayname:""
  })
  const onSubmit = async (value: SerchValue) => {
    try {
      setispending(true);
    const {data} = await axios.post("/api/toatalpresnrtdat", {
        username: value.username,
        monthname: value.monthname,
      });
      setuserdat({
        Totalwork:data.data.Totalwork,
        Atendace:data.data.Atendace,
        dipartment:data.data.dipartment,
        displayname:data.data.displayname
      })

    } catch (error) {
      toast({
        description: "Faild to send deta.",
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
                        <SelectLabel>Staff name</SelectLabel>
                        {client?.map((v: any, i) => (
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
            <span className="text-[1rem] font-semibold  text-red-500">{userdate.displayname}</span>
          </p>
        </CardContent>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Department:
            </span>
            <span className="text-[1rem] font-semibold  text-red-500">{userdate.dipartment}</span>
          </p>
        </CardFooter>
        <CardFooter>
          <p className="flex items-center gap-4">
            <span className="text-[2rem] font-bold text-muted-foreground">
              Total Present In This Month:
            </span>
            <span className="text-[1rem] font-semibold  text-red-500">{userdate.Atendace}</span>
          </p>
        </CardFooter>
      </Card>


           <Table>
              <TableHeader>
                <TableRow className="border border-primary bg-primary">
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Work</TableHead>
                  <TableHead className="text-right">Time</TableHead>
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
                      <TableCell className="font-medium">
                        {formatRelativeMonthDate(item.createdAt)}
                      </TableCell>
                      <TableCell className="whitespace-pre-line break-words">
                        {item.content} 
                      </TableCell>
                      <TableCell className="text-right">
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
