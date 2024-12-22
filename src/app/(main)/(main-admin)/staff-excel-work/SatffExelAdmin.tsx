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
import { exeadminSchema, ExeladminValue, serchSchema, SerchValue } from "@/lib/vallidation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import LodingButton from "@/components/LodingButton";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";

export default function SatffExelAdmin() {
  const form = useForm<ExeladminValue>({
    resolver: zodResolver(exeadminSchema),
    defaultValues: {
      userid: "",
      monthname: "",
      dipartment:""
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


  const[tabelex,settablseex]=useState({
    dipartment:"",
    data:[]
  })

  const onSubmit = async(value:ExeladminValue) => {
    try {
      setispending(true)
   const {data}  = await axios.post("/api/Staffexceladmin",{
        userid:value.userid,
        monthname:value.monthname,
        dipartment:value.dipartment
      })

      settablseex({
        dipartment:data.dipartment,
        data:data.data
      })
    } catch (error) {
      toast({
        description:"Something went wrong",
        variant:"destructive"
      })
    }finally{
      setispending(false)
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
                      <SelectLabel>Select Today Work</SelectLabel>
                      <SelectItem value="Today">Toady</SelectItem>
                      <SelectLabel>Select Yesterday Work</SelectLabel>
                      <SelectItem value="Yesterday">Yesterday</SelectItem>
                      <SelectLabel>Select last 7 day Work</SelectLabel>
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
                        1) CENTER MANAGER
                      </SelectItem>
                      <SelectItem value="HR">2) HR</SelectItem>
                      <SelectItem value="CASHIER">3) CASHIER</SelectItem>
                      <SelectItem value="RECEPTIONS">4) RECEPTIONS</SelectItem>
                      <SelectItem value="MEDICINE COUNTER">
                        5) MEDICINE COUNTER
                      </SelectItem>
                      <SelectItem value="HD / OD">6) HD / OD</SelectItem>
                      <SelectItem value="TELECALLER DEPT">
                        7) TELECALLER DEPT
                      </SelectItem>
                      <SelectItem value="MIXER">8) MIXER</SelectItem>
                      <SelectItem value="ECART">9) ECART</SelectItem>
                      <SelectItem value="DESIGNER">10) DESIGNER</SelectItem>
                      <SelectItem value="DIGITAL MARKETING">
                        11) DIGITAL MARKETING
                      </SelectItem>
                      <SelectItem value="DOCTOR">12) DOCTOR</SelectItem>
                      <SelectItem value="MAID / OFFICE BOY">
                        13) MAID / OFFICE BOY
                      </SelectItem>
                      <SelectItem value="GUARD">14) GUARD</SelectItem>
                      <SelectItem value="DRIVER">15) DRIVER</SelectItem>
                      <SelectItem value="ACCOUNTANT">
                        16) ACCOUNTANT
                      </SelectItem>
                      <SelectItem value="INVENTORY">
                        17) INVENTORY
                      </SelectItem>
                      <SelectItem value="TRUST MARKETING">
                        18) TRUST MARKETING
                      </SelectItem>
                      <SelectItem value="SHOP RANCHI">
                        19) SHOP RANCHI
                      </SelectItem>
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




      {(tabelex.dipartment === "telecaller")?
       <Table>
       <TableHeader>
         <TableRow className="border border-primary bg-primary">
           <TableHead className="border-2 border-blue-400">Date</TableHead>
           <TableHead className="border-2 border-blue-400">Work</TableHead>
           <TableHead className="border-2 border-blue-400">Incoming</TableHead>
           <TableHead className="border-2 border-blue-400">Outgoing</TableHead>
           <TableHead className="border-2 border-blue-400">Total</TableHead>
           <TableHead className="border-2 border-blue-400">
             Whatsapp / Text
           </TableHead>
           <TableHead className="border-2 border-blue-400">Appt</TableHead>
           <TableHead className="border-2 border-blue-400">Fees</TableHead>
           <TableHead className="border-2 border-blue-400">Time</TableHead>
         </TableRow>
       </TableHeader>


       {ispending?
       
        <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="">
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
      :
      tabelex?.data?.length === 0 ?
      <TableBody>
      <TableRow>
        <TableCell colSpan={3} className="">
          No Data Found
        </TableCell>
      </TableRow>
    </TableBody>
    :
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
                      {formatRelativeTime(v.createdAt)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
       
       }
       </Table>
      :
      
      ""
      }
    </>
  );
}
