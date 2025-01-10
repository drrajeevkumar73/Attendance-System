"use client";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Vewdata() {
  const [data, setData] = useState<any>(null);

  // Format ISO date to "DD-MMM-YYYY"
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Fetch data from the API
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
            return [key, value];
          })
        );
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Generate PDF from the displayed content
  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("document.pdf");
    }
  };

  if (!data) {
    return <p className="text-center">No Document Found</p>;
  }

  return (
    <>
      <div id="pdf-content" className="w-full space-y-6 rounded-md border p-5 shadow-inner">
        <Image src={Logo} width={200} height={200} alt="Logo" className="mx-auto" />

        <h1 className="text-center text-2xl font-bold">Staff Onboarding Form</h1>

        {/* Personal Details Section */}
        <SectionTitle title="Personal Details" />
        <div className="space-y-4">
          <Detail label="Name" value={data.task1} />
          <DetailGroup>
            <Detail label="DOB" value={data.task2 ? formatDate(data.task2) : "N/A"} />
            <Detail label="Place of Birth" value={data.task3} />
            <Detail label="Gender" value={data.task4} />
          </DetailGroup>
          <DetailGroup>
            <Detail label="Marital Status" value={data.task5} />
            <Detail label="Father / Spouse's Name" value={data.task6} />
          </DetailGroup>
          <DetailGroup>
            <Detail label="Personal Contact" value={data.task7} />
            <Detail label="Guardian Contact" value={data.task8} />
          </DetailGroup>
          <Detail label="Current Address" value={data.task9} />
          <Detail label="Permanent Address" value={data.task10} />
        </div>

        {/* Educational Details Section */}
        <SectionTitle title="Educational Details" />
        <div className="space-y-4">
          <DetailGroup>
            <Detail label="Highest Qualification" value={data.task11} />
            <Detail label="Year of Passing" value={data.task12 ? formatDate(data.task12) : "N/A"} />
          </DetailGroup>
          <DetailGroup>
            <Detail label="Institution/University Name" value={data.task13} />
            <Detail label="Marks (%)" value={data.task14} />
          </DetailGroup>
          <Detail label="Training / Certificates" value={data.task15} />
        </div>

         {/* requered Details Section */}
         <SectionTitle title="requered Details" />
         <div className="space-y-4">
          <DetailGroup>
            <Detail label="Highest Qualification" value={data.task16} />
            <Detail label="Year of Passing" value={data.task17} />
          </DetailGroup>
          <DetailGroup>
            <Detail label="Institution/University Name" value={data.task18} />
            <Detail label="Marks (%)" value={data.task19} />
          </DetailGroup>
          <Detail label="Training / Certificates" value={data.task20} />
        </div>
        {/* Uploaded Documents Section */}
        <SectionTitle title="Uploaded Documents" />
        <div className="flex flex-wrap justify-between space-x-4 space-y-4">
          {data.panCard && <Document title="Pan Card" src={data.panCard} />}
          {data.aadharCard && <Document title="Aadhar Card" src={data.aadharCard} />}
          {data.DebitCard && <Document title="Debit or Credit Card" src={data.DebitCard} />}
          {data.YourPhoto && <Document title="Your Photo" src={data.YourPhoto} />}
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mx-auto mt-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Print to PDF
      </button>
    </>
  );
}

// Component to display a title for sections
function SectionTitle({ title }: { title: string }) {
  return (
    <h4 className="w-full border bg-gradient-to-b from-gray-200 to-gray-400 p-2 font-bold text-black">
      {title}
    </h4>
  );
}

// Component to display a single detail item
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-bold text-muted-foreground">{label}: </span>
      {value}
    </p>
  );
}

// Component to group details in a row
function DetailGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

// Component to display a document with an image
function Document({ title, src }: { title: string; src: string }) {
  return (
    <div>
      <p className="font-bold text-muted-foreground">{title}</p>
      <Image src={src} width={500} height={500} alt={title} />
    </div>
  );
}
