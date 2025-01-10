"use client";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function ViewData() {
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
          }),
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
      const contentWidth = element.scrollWidth;
      const contentHeight = element.scrollHeight;
  
      // Generate canvas with higher scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // To handle cross-origin issues
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate scale factor to make the width fit
      const scaleFactor = pdfWidth / contentWidth;
      const scaledHeight = contentHeight * scaleFactor;
  
      if (scaledHeight <= pdfHeight) {
        // If content fits on one page
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
      } else {
        // Content needs to be split across multiple pages
        let position = 0;
  
        while (position < contentHeight) {
          const canvasChunk = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            y: position,
            height: pdfHeight / scaleFactor,
          });
  
          const chunkData = canvasChunk.toDataURL("image/png");
  
          pdf.addImage(chunkData, "PNG", 0, 0, pdfWidth, pdfHeight);
          position += pdfHeight / scaleFactor;
  
          if (position < contentHeight) pdf.addPage();
        }
      }
  
      pdf.save("document.pdf");
    }
  };
  
  

  if (!data) {
    return <p className="text-center">No Document Found</p>;
  }

  return (
    <>
      <div
        id="pdf-content"
        className="w-full space-y-6 rounded-md border p-5 text-[23px] shadow-inner"
      >
        <Image
          src={Logo}
          width={300}
          height={300}
          alt="Logo"
          className="mx-auto"
        />

        <h1 className="text-center text-[50px] font-bold">
          Staff Onboarding Form
        </h1>

        {/* Personal Details Section */}
        <SectionTitle title="Personal Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">Name</TableHead>
              <TableHead className="border font-extrabold">DOB</TableHead>
              <TableHead className="border font-extrabold">
                Place of Birth
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black">{data.task1}</TableCell>
              <TableCell className="border text-black">
                {data.task2 ? formatDate(data.task2) : "N/A"}
              </TableCell>
              <TableCell className="border text-black">{data.task3}</TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">Gender</TableHead>
              <TableHead className="border font-extrabold">
                Marital Status
              </TableHead>
              <TableHead className="border font-extrabold">
                Father&apos;s / Spouse name
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black">{data.task4}</TableCell>
              <TableCell className="border text-black">{data.task5}</TableCell>
              <TableCell className="border text-black">{data.task6}</TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">
                Personal contact no.
              </TableHead>
              <TableHead className="border font-extrabold">
                Personal contact no 2.
              </TableHead>
              <TableHead className="border font-extrabold">
                Guardian&apos;s contect no.
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black">{data.task7}</TableCell>
              <TableCell className="border text-black">{data.task21}</TableCell>
              <TableCell className="border text-black">{data.task8}</TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">
                Guardian&apos;s contect no 2.
              </TableHead>
              <TableHead className="border font-extrabold">
                Current address
              </TableHead>
              <TableHead className="border font-extrabold">
                Permanent address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black">{data.task22}</TableCell>
              <TableCell className="border text-black">{data.task9}</TableCell>
              <TableCell className="border text-black">{data.task10}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Educational Details Section */}
        <SectionTitle title="Educational Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">
                Highest Qualification
              </TableHead>
              <TableHead className="border font-extrabold">
                Year of Passing
              </TableHead>
              <TableHead className="border font-extrabold" colSpan={2}>
                Institution / University Name
              </TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black">{data.task11}</TableCell>
              <TableCell className="border text-black">
                {data.task12 ? formatDate(data.task12) : "N/A"}
              </TableCell>
              <TableCell className="border text-black" colSpan={2}>{data.task13}</TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold" colSpan={4}>Marks (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border text-black" colSpan={4}>{data.task14}</TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold"> List School(s) and college(s)</TableHead>
              <TableHead className="border font-extrabold">  Major Course of Study</TableHead>
              <TableHead className="border font-extrabold">  Grade / Level Completed</TableHead>
              <TableHead className="border font-extrabold">  Degree Obtained</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border text-lg">
              <TableCell className="border text-black ">{data.task23}</TableCell>
              <TableCell className="border text-black ">{data.task26}</TableCell>
              <TableCell className="border text-black ">{data.task29}</TableCell>
              <TableCell className="border text-black ">{data.task32}</TableCell>
            </TableRow>
          
              <TableRow className="border text-lg">
              <TableCell className="border text-black">{data.task24}</TableCell>
              <TableCell className="border text-black">{data.task27}</TableCell>
              <TableCell className="border text-black ">{data.task30}</TableCell>
              <TableCell className="border text-black ">{data.task34}</TableCell>
            </TableRow>
           
              <TableRow className="border text-lg">
              <TableCell className="border text-black">{data.task25}</TableCell>
              <TableCell className="border text-black">{data.task28}</TableCell>
              <TableCell className="border text-black ">{data.task31}</TableCell>
              <TableCell className="border text-black ">{data.task35}</TableCell>
            </TableRow>
            
           
           
          </TableBody>
          
        </Table>

 {/* Work Expreence Details Section */}
 <SectionTitle title=" Work Experience" />
 <Table className="w-full">
        

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold"> Company / Organization</TableHead>
              <TableHead className="border font-extrabold">  Designation</TableHead>
              <TableHead className="border font-extrabold">  From</TableHead>
              <TableHead className="border font-extrabold">  To</TableHead>
              <TableHead className="border font-extrabold">  Ctc / Monthly</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border text-lg">
              <TableCell className="border text-black ">{data.task36}</TableCell>
              <TableCell className="border text-black ">{data.task39}</TableCell>
              <TableCell className="border text-black ">{data.task42}</TableCell>
              <TableCell className="border text-black ">{data.task45}</TableCell>
              <TableCell className="border text-black ">{data.task48}</TableCell>
            </TableRow>
          
              <TableRow className="border text-lg">
              <TableCell className="border text-black">{data.task37}</TableCell>
              <TableCell className="border text-black">{data.task40}</TableCell>
              <TableCell className="border text-black ">{data.task43}</TableCell>
              <TableCell className="border text-black ">{data.task46}</TableCell>
              <TableCell className="border text-black ">{data.task49}</TableCell>
            </TableRow>
           
              <TableRow className="border text-lg">
              <TableCell className="border text-black">{data.task38}</TableCell>
              <TableCell className="border text-black">{data.task41}</TableCell>
              <TableCell className="border text-black ">{data.task44}</TableCell>
              <TableCell className="border text-black ">{data.task47}</TableCell>
              <TableCell className="border text-black ">{data.task50}</TableCell>
            </TableRow>
            
           
           
          </TableBody>
          
        </Table>

        {/* Required Details Section */}
        <SectionTitle title="Required Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">
                Employee Name
              </TableHead>
              <TableHead className="border font-extrabold">Bank Name</TableHead>
              <TableHead className="border font-extrabold">
                Account Number
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border">{data.task16}</TableCell>
              <TableCell className="border">{data.task17}</TableCell>
              <TableCell className="border">{data.task18}</TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="border font-extrabold">IFSC Code</TableHead>
              <TableHead className="border font-extrabold" colSpan={2}>
                Bank Branch
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="border">{data.task19}</TableCell>
              <TableCell className="border" colSpan={2}>{data.task20}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Uploaded Documents Section */}
        <SectionTitle title="Uploaded Documents" />
        <div className="flex flex-wrap justify-between space-x-4 space-y-4">
          {data.panCard && <Document title="Pan Card" src={data.panCard} />}
          {data.aadharCard && (
            <Document title="Aadhar Card" src={data.aadharCard} />
          )}
          {data.DebitCard && (
            <Document title="Your Marksheet" src={data.DebitCard} />
          )}
          {data.YourPhoto && (
            <Document title="Your Photo" src={data.YourPhoto} />
          )}
           {data.YourPhoto && (
            <Document title="Parent's Aadhar Card" src={data.parentAdhar} />
          )}
          {data.YourPhoto && (
            <Document title="Parent's Pan Card" src={data.ParentPancard} />
          )}
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

// Component to display a document with an image
function Document({ title, src }: { title: string; src: string }) {
  return (
    <div>
      <p className="font-bold text-muted-foreground">{title}</p>
      <Image src={src} width={500} height={500} alt={title} />
    </div>
  );
}
