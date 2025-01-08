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




// Define clinic locations
const clinicLocations = [
  {
    city: "Kolkata",
    lat: 22.5669053,
    lng: 88.3688203,
  },
  {
    city: "Ranchi",
    lat: 23.352205,
    lng: 85.324268,
  },
  {
    city: "Patna",
    lat: 25.620046477441246,
    lng: 85.05265837517814,
  },
  {
    city: "Noida (Spectrum City)",
    lat: 28.572742875697358,
    lng: 77.37681757528678,
  },
  {
    city: "Greater Noida (Gaur City)",
    lat: 28.618369675672465,
    lng: 77.42171397528851,
  },
];

// Haversine formula to calculate distance
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Interface for IP-based location
interface IpLocation {
  lat: number;
  lon: number;
  city: string;
}

// Get IP-based location using an external API
const getIpLocation = async (): Promise<IpLocation> => {
  try {
    const response = await axios.get("https://ip-api.com/json/"); // Replace with a better API in production
    const { lat, lon, city } = response.data;
    return { lat, lon, city };
  } catch (error) {
    console.error("Error fetching IP-based location:", error);
    throw new Error("Unable to validate IP-based location.");
  }
};

// Validate location against geocoding API
const validateGeocodedLocation = async (lat: number, lng: number): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
    );
    const address = response.data.results[0]?.formatted_address || "";
    const isValidCity = clinicLocations.some((clinic) =>
      address.toLowerCase().includes(clinic.city.toLowerCase())
    );
    return isValidCity;
  } catch (error) {
    console.error("Error validating geocoded location:", error);
    return false; // Default to invalid if geocoding fails
  }
};

// Check if location is fake
const isFakeLocation = async (userLat: number, userLng: number): Promise<boolean> => {
  const ipLocation = await getIpLocation();
  const ipDistance = haversineDistance(userLat, userLng, ipLocation.lat, ipLocation.lon);

  // If IP-based distance is too large (>50 km), location might be fake
  if (ipDistance > 50) {
    console.log("IP location and GPS location are too far apart.");
    return true;
  }

  // Validate address using geocoding
  const isValidAddress = await validateGeocodedLocation(userLat, userLng);
  if (!isValidAddress) {
    console.log("Geocoded location validation failed.");
    return true;
  }

  return false; // Location is valid
};

// Main function to check location and make API call
const checkHandler = async () => {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          console.log(`User Location: Latitude=${userLat}, Longitude=${userLng}`);

          // Check if user is near any clinic
          const isNearClinic = clinicLocations.some((clinic) => {
            const distance = haversineDistance(userLat, userLng, clinic.lat, clinic.lng);
            return distance <= 0.55; // Slight buffer for accuracy (500 meters)
          });

          console.log("Is near clinic:", isNearClinic);

          // Check if location is valid (fake check)
          const isLocationValid = await isFakeLocation(userLat, userLng);
          if (isNearClinic && !isLocationValid) {
            console.log("User is within 500 meters of a clinic and location is valid.");

            // Send API request (replace with your actual API call logic)
            const { data } = await axios.post("/api/switch");

            // Show success message
            toast({
              title: data.message || "Request successful!",
              variant: "default",
            });
          } else {
            console.log("User is NOT within 500 meters or location is fake.");
            toast({
              description: "Your location is either fake or not near any clinic.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            description: "Unable to retrieve your location.",
            variant: "destructive",
          });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      toast({
        description: "Your browser does not support location services.",
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
