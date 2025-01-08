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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calenderSchema, CalederValue } from "@/lib/vallidation";
import axios from "axios";
import { useState } from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "../ui/table";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";

interface classNameProps {
  className?: string;
}

export default function Calender({ className }: classNameProps) {
  const { toast } = useToast();
  const form = useForm<CalederValue>({
    resolver: zodResolver(calenderSchema),
  });

  const [data, setdata] = useState<[]>();
  const [totalpresent, setPresent] = useState<number>();
  const [loding, setloding] = useState(false);

  const onSubmit = async (monthname: CalederValue) => {
    try {
      setloding(true);
      const data = await axios.post("/api/dashbord", { monthname });

      setdata(data.data.data);
      setPresent(data.data.totalPresent);
    } catch (error) {
    } finally {
      setloding(false);
    }
  };

  // Clinic location coordinates (latitude, longitude)
  const clinicLocation = {
    lat: 23.352205, // Clinic latitude
    lng: 85.324268, // Clinic longitude
  };

  // Haversine formula to calculate distance between two points in km
  const haversineDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance; // Returns distance in kilometers
  };

  // Function to check if the user's location is within the clinic's area
  const isWithinRange = (userLat:any, userLng:any) => {
    const distance = haversineDistance(
      userLat,
      userLng,
      clinicLocation.lat,
      clinicLocation.lng,
    );
    return distance < 0.5; // Allowing a range of 0.5 km (500 meters)
  };

  const checkHandler = async () => {
    try {
      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Check if the user is at the clinic location
            if (isWithinRange(userLat, userLng)) {
              // If the user is near the clinic, proceed with the API request
              const { data } = await axios.post("/api/switch");

              toast({
                title: data.message,
                variant: "default",
              });
            } else {
              // If the user is not at the clinic location
              toast({
                description: "You are not at the clinic's location.",
                variant: "destructive",
              });
            }
          },
          (error) => {
            console.error("Error getting location: ", error);
            toast({
              description: "Unable to retrieve your location.",
              variant: "destructive",
            });
          },
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        toast({
          description: "Geolocation is not supported.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in checkHandler:", error);
      toast({
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    }
  };
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("unauthorized");
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
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
                  Check Your Work History By Selecting Month Name.{" "}
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
        </form>
      </Form>
      {user.permisionToggal ? (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onClick={checkHandler} />
          <Label htmlFor="airplane-mode"></Label>
        </div>
      ) : (
        ""
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            Full Name: &nbsp;&nbsp;
            <span className="text-primary">{user.displayname}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Department : &nbsp;&nbsp;
            <span className="text-primary">{user.dipartment}</span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle>
            Total present in this month : &nbsp;&nbsp;
            <span className="text-primary">{totalpresent}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Table>
        <TableHeader className="border border-primary">
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

        {loding ? (
          // Loading message
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="">
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : data?.length === 0 ? (
          // No Data Found message
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="">
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          // Data rendering
          data?.map((v: any, i) => (
            <TableBody className="border border-primary" key={i}>
              <TableRow>
                <TableCell className="border-2 border-blue-400 font-medium">
                  {formatRelativeMonthDate(v.createdAt)}
                </TableCell>
                <TableCell className="whitespace-pre-line break-words border-2 border-blue-400">
                  {v.content}
                </TableCell>
                <TableCell className="w-[200px] border-2 border-blue-400 text-right">
                  {formatRelativeTime(v.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
    </>
  );
}
