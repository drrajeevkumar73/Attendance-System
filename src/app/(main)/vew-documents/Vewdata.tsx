"use client";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Vewdata() {
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };
      
  const [data, setData] = useState<any>(null);

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/document-da");
        // Transform data to capitalize first letters
        const transformedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (typeof value === "string") {
              return [key, capitalizeFirstLetter(value)];
            }
            return [key, value]; // Return other data types as is
          })
        );
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <p>No any    Document</p>;
  }

  return (
    <div className="w-full space-y-6 rounded-md border p-5 shadow-inner">
      <Image src={Logo} width={500} height={500} alt="Logo" className="mx-auto" />

      <h1 className="text-center text-2xl font-bold">
        Interview Application Form
      </h1>

      {/* Personal Details */}
      <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
        Personal Detail
      </h4>
      <div className="space-y-4">
        <p>
          <span className="font-bold text-muted-foreground">Name: </span>
          {data.task1}
        </p>
        <div className="flex items-center justify-between">
          <h6>
            <span className="font-bold text-muted-foreground">DOB: </span>
            {data.task2 ? formatDate(data.task2) : "N/A"}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">
              Place of Birth:{" "}
            </span>
            {data.task3}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">Gender: </span>
            {data.task4}
          </h6>
        </div>
        <div className="flex items-center justify-between">
          <h6>
            <span className="font-bold text-muted-foreground">Marital Status: </span>
            {data.task5}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">
              Father / Spouse&lsquo;s Name:{" "}
            </span>
            {data.task6}
          </h6>
        </div>
        <div className="flex items-center justify-between">
          <h6>
            <span className="font-bold text-muted-foreground">
              Personal Contact:{" "}
            </span>
            {data.task7}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">
              Guardian Contact:{" "}
            </span>
            {data.task8}
          </h6>
        </div>
        <div>
          <h6>
            <span className="font-bold text-muted-foreground">
              Current Address:{" "}
            </span>
            {data.task9}
          </h6>
        </div>
        <div>
          <h6>
            <span className="font-bold text-muted-foreground">
              Permanent Address:{" "}
            </span>
            {data.task10}
          </h6>
        </div>
      </div>

      {/* Educational Details */}
      <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
        Educational Detail
      </h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h6>
            <span className="font-bold text-muted-foreground">
              Highest Qualification:{" "}
            </span>
            {data.task11}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">Year of Passing: </span>
            {data.task12}
          </h6>
        </div>
        <div className="flex items-center justify-between">
          <h6>
            <span className="font-bold text-muted-foreground">
              Institution/University Name:{" "}
            </span>
            {data.task13}
          </h6>
          <h6>
            <span className="font-bold text-muted-foreground">Marks(%): </span>
            {data.task14}
          </h6>
        </div>
        <div>
          <h6>
            <span className="font-bold text-muted-foreground">
              Training / Certificates:{" "}
            </span>
            {data.task15}
          </h6>
        </div>
      </div>

      {/* Uploaded Documents */}
      <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
        Uploaded Documents
      </h4>
      <div className="flex flex-wrap justify-between space-x-4 space-y-4">
        {data.panCard && (
          <div>
            <p className="font-bold text-muted-foreground">Pan Card Image</p>
            <Image src={data.panCard} width={500} height={500} alt="Pan Card" />
          </div>
        )}
        {data.aadharCard && (
          <div>
            <p className="font-bold text-muted-foreground">Aadhar Card Image</p>
            <Image src={data.aadharCard} width={500} height={500} alt="Aadhar Card" />
          </div>
        )}
        {data.DebitCard && (
          <div>
            <p className="font-bold text-muted-foreground">Debit or Credit Card Image</p>
            <Image src={data.DebitCard} width={500} height={500} alt="Debit Card" />
          </div>
        )}
        {data.YourPhoto && (
          <div>
            <p className="font-bold text-muted-foreground">Your Photo</p>
            <Image src={data.YourPhoto} width={500} height={500} alt="Your Photo" className="h-[500px] "/>
          </div>
        )}
      </div>
    </div>
  );
}
