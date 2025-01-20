"use client";
import Image from "next/image";
import Logo from "@/assets/web_logo_2.png";
import { useEffect, useRef, useState } from "react";
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
import { Check } from "lucide-react";
import { useReactToPrint } from "react-to-print";

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
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Generate PDF from the displayed content
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Intervew",
  });

  if (!data) {
    return <p className="text-center">No Document Found</p>;
  }

  return (
    <>
      <div
        id="pdf-content"
        className="relative w-full space-y-6 rounded-md border p-5 text-[23px] shadow-inner"
        ref={contentRef}
      >
        <div className="flex w-full items-center justify-between">
          <table className="text-lef w-fit border border-gray-400">
            <thead>
              <tr className="border-b border-gray-400 bg-gray-200">
                <th className="border border-gray-400 p-2">EMP Code</th>
                <th className="border border-gray-400 p-2">DOJ</th>
                <th className="border border-gray-400 p-2">Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">{data.ex1}</td>
                <td className="border border-gray-400 p-2">{data.ex2}</td>
                <td className="border border-gray-400 p-2">{data.ex3}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col items-center justify-center">
            <Image src={Logo} width={200} height={200} alt="Logo" />
            <h1 className="text-center text-2xl font-extrabold">
              Staff Onboarding Form
            </h1>
          </div>

          {data.YourPhoto && (
            <div className="right-0 top-0 h-[120px] w-[120px] overflow-hidden rounded-full">
              <Image
                src={data.YourPhoto}
                width={150}
                height={150}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Personal Details Section */}
        <SectionTitle title="Personal Details" />
        <Table className="w-full" style={{ pageBreakAfter: "always" }}>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">Name</TableHead>
              <TableHead className="name border font-extrabold">
                D.O.B
              </TableHead>
              <TableHead className="name border font-extrabold">Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task1}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task2}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task3}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Place of Birth
              </TableHead>
              <TableHead className="name border font-extrabold">
                Gender
              </TableHead>
              <TableHead className="name border font-extrabold">
                Marital Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task4}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task5}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task6}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Personal contact no 1
              </TableHead>
              <TableHead className="name border font-extrabold">
                Personal contact no 2
              </TableHead>
              <TableHead className="name border font-extrabold">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task7}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task8}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task9}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Guardian&apos;s / Spouse name
              </TableHead>
              <TableHead className="name border font-extrabold">
                Guardian&apos;s contect no
              </TableHead>
              <TableHead className="name border font-extrabold">
                Local emergency contact no
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task10}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task11}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task12}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold" colSpan={3}>
                Language known
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell
                className="xyx whitespace-pre-line break-words border text-black"
                colSpan={3}
              >
                {data.task13}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold" colSpan={3}>
                Computer knowledge
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell
                className="xyx whitespace-pre-line break-words border text-black"
                colSpan={3}
              >
                {data.task14}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold" colSpan={2}>
                Current address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell
                className="xyx whitespace-pre-line break-words border text-black"
                colSpan={3}
              >
                {data.task15}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold" colSpan={3}>
                Permanent address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell
                className="xyx whitespace-pre-line break-words border text-black"
                colSpan={3}
              >
                {data.task16}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Educational Details Section */}
        <SectionTitle title="Educational Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Qualification
              </TableHead>
              <TableHead className="name border font-extrabold">
                Board / Institute
              </TableHead>
              <TableHead className="name border font-extrabold">
                School / College
              </TableHead>
              <TableHead className="name border font-extrabold">
                Marks(%)
              </TableHead>
              <TableHead className="name border font-extrabold">Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task17}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task21}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task25}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task29}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task33}
              </TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task18}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task22}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task26}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task30}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task34}
              </TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task19}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task23}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task27}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task31}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task35}
              </TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task20}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task24}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task28}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task32}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task36}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Extra Certificates Details Section */}
        <SectionTitle title="Extra Certification Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                {" "}
                Course
              </TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                Institute
              </TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                Certificates
              </TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                Year
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task37}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task39}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task41}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task43}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task38}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task40}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task42}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task44}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/*    Work Experience Section */}
        <SectionTitle title="Work Experience" />
        <Table className="w-full" style={{ pageBreakAfter: "always" }}>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                {" "}
                Company / Organization
              </TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                Designation
              </TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                From
              </TableHead>
              <TableHead className="name border font-extrabold"> To</TableHead>
              <TableHead className="name border font-extrabold">
                {" "}
                Ctc / Monthly
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task45}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task49}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task53}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task57}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task61}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task46}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task50}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task54}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task58}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task62}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task47}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task51}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task55}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task59}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task63}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task48}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task52}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task56}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task60}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task64}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* Bank Document */}
        <SectionTitle title="Bank Details" />
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Employee Name
              </TableHead>
              <TableHead className="name border font-extrabold">
                Bank Name
              </TableHead>
              <TableHead className="name border font-extrabold">
                Account Number
              </TableHead>
              <TableHead className="name border font-extrabold">
                IFSC Code
              </TableHead>
              <TableHead className="name border font-extrabold">
                Bank Branch
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task65}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task66}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task67}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task68}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.task69}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Pan Card
              </TableHead>
              <TableHead className="name border font-extrabold">
                Aadhar Card
              </TableHead>
              <TableHead className="name border font-extrabold">
                Parent&lsquo;s Aadhar Card
              </TableHead>
              <TableHead className="name border font-extrabold">
                Passbook Photo
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.panCard && <Document title="" src={data.panCard} />}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.aadharCard && <Document title="" src={data.aadharCard} />}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.parentAdhar && (
                  <Document title="" src={data.parentAdhar} />
                )}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.bancksheeding && (
                  <Document title="" src={data.bancksheeding} />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table className="w-full" style={{ pageBreakAfter: "always" }}>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Local Proof
              </TableHead>
              <TableHead className="name border font-extrabold">
                Marksheet
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.localproff && <Document title="" src={data.localproff} />}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.marksheet && <Document title="" src={data.marksheet} />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* General Clinic SOP */}
        <SectionTitle title="General Clinic SOP" />
        <Table className="w-full" style={{ pageBreakAfter: "always" }}>
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                S.No.
              </TableHead>
              <TableHead className="name border font-extrabold">
                Details
              </TableHead>

              <TableHead className="name border font-extrabold">
                Response
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                1
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                1 week Off per week
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items1 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                2
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                2 week can be take along
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items2 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                3
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                NO week for New Joining within first 8 days
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items3 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                4
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                If Without Information Absenteeism found then 2 days Attendence
                Deduction
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items4 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                5
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                If Emergency Leave taken (Absent) , without document proof will
                be facing Attendence Deduction
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items5 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>

            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                6
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                If anyone is not coming he/she should informby 8am inthemorning
                ...No Managerwill callto crosscheck anditwillbmarkasAbsent
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items6 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                7
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                15 min buffer time for late coming as per your schedule time , 3
                LATE = 1 half day
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items7 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                8
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                45min of Break
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items8 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                9
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Personal Phone to be submitted
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items9 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                10
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Proper clean Dress up
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items10 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                11
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Proper Response to be given by allthe Phones Handling team on
                realtime
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items11 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                12
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Daily 3 hours APP reporting
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items12 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                13
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Daily Closing Reporting
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items13 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                14
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Department or Personal WORK SOP to be followed
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items14 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
            <TableRow className="border text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                15
              </TableCell>

              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                No misbehaviour with other Staff or Patient
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.items15 === true ? <Check /> : "na"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <SectionTitle title="TRAINING Regulation " />
        <Table className="w-full">
          <TableBody>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                1
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                No leaves are allowed during the training period of 1st 6 Days
              </TableCell>
            </TableRow>

            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                2
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Training timing will be 10am-8pm from Sunday to Thursday with a
                Certification on FRIDAY and SATURDAY OF
              </TableCell>
            </TableRow>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                2
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Training timing will be 10am-8pm from Sunday to Thursday with a
                Certification on FRIDAY and SATURDAY OF
              </TableCell>
            </TableRow>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                3
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Consecutive absenteeism during your training period may result
                in your removal from the training without pay
              </TableCell>
            </TableRow>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                4
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                During the training period, there will be assessment rounds
                conducted by the trainer or the Manager. Failing on assessment
                before the OJT (On-the-Job)
              </TableCell>
            </TableRow>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                5
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                Upon unsuccessful Assessment - 6 days Training period will be
                paid only of Rs- 1500/-
              </TableCell>
            </TableRow>
            <TableRow className="h-[80px] text-lg">
              <TableCell
                className="xyx whitespace-pre-line break-words border text-black"
                colSpan={2}
              >
                * Upon successful completion of Training and Assessment you will
                be assigned to your designated team as per the process
                requirements and that will be the starting day of your discussed
                salary. OJT will be for 90 days , Salary may vary on your OJT
                performance *
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <SectionTitle title="Official" />

        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Exit Date
              </TableHead>
              <TableHead className="name border font-extrabold">
                Exit Reason
              </TableHead>
              <TableHead className="name border font-extrabold">
                Location
              </TableHead>
              <TableHead className="name border font-extrabold">POST</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-slate-200 text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.reco1}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.reco2}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.reco3}
              </TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black">
                {data.reco4}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-xl font-extrabold text-muted-foreground">
              <TableHead className="name border font-extrabold">
                Employees Signature
              </TableHead>
              <TableHead className="name border font-extrabold">
                Official Signature
              </TableHead>
              <TableHead className="name border font-extrabold">
                Approved By
              </TableHead>
              <TableHead className="name border font-extrabold">
                Dr. Rajeev Kumar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-[80px] text-lg">
              <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
              <TableCell className="xyx whitespace-pre-line break-words border text-black"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <button
        onClick={() => reactToPrintFn()}
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
      <Image src={src} width={300} height={300} alt={title} className="" />
    </div>
  );
}
