"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "@/assets/web_logo_2.png";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { use, useState } from "react";
import { usePathname } from "next/navigation";

interface MenuBarProps {
  className?: string;
}

export default function Menubar({ className }: MenuBarProps) {
  const { value } = useAppSelector((state) => state.hmenuSlice);
  const [dropdown, setdropdown] = useState(false);
  const [dropdowna, setdropdowna] = useState(false);
  const dropHandler = () => {
    setdropdown(!dropdown);
  };

  const dropHandlerad = () => {
    setdropdowna(!dropdowna);
  };
  const pathname = usePathname();

  const { user } = useAppSelector((state) => state.loginlice);

  if (!user) throw new Error("unathorized");
  return (
    <div className={`${value ? "block" : "hidden"} ${className}`}>
      <Image src={logo} alt="" />
      <div className="space-y-5 p-6">
        <Button
          className={`flex items-center justify-start gap-3 font-bold ${pathname == "/" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
          title="Dashboard"
          asChild
        >
          <Link href={"/"}>Dashboard</Link>
        </Button>
        <Button
          className="flex cursor-pointer items-center justify-start gap-3 font-bold"
          title="Attendance"
          asChild
          onClick={dropHandlerad}
        >
          <p>Attendance </p>
        </Button>
        <div
          className={`space-y-5 rounded-md border p-3 shadow-lg ${dropdowna ? "block" : "hidden"} `}
        >
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/attendance" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Wrok For Me"
            asChild
          >
            <Link href={"/attendance"}>Add Today&lsquo;s Task</Link>
          </Button>

          {user.dipartment === "TELECALLER DEPT" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/vewexceldeta" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/vewexceldeta"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "RECEPTIONS" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/excel-reception" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/excel-reception"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/vewdata-reception" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/vewdata-reception"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "MEDICINE COUNTER" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/medice-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/medice-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/vew-medicene" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/vew-medicene"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "SHOP RANCHI" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/ranchi-shop-exel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/ranchi-shop-exel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/ranchi-shop-vew-data" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/ranchi-shop-vew-data"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "DOCTOR" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/offline-doctor-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="EOffline Doctor Excel Part"
                asChild
              >
                <Link href={"/offline-doctor-excel"}>Offline Doctor Excel</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/offline-vew-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Offline Doctor View Data"
                asChild
              >
                <Link href={"/offline-vew-excel"}>Offline Doctor View</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/online-doctor-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Online Doctor Excel Part"
                asChild
              >
                <Link href={"/online-doctor-excel"}>Online Doctor Excel</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/online-vew-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Online Doctor View Data"
                asChild
              >
                <Link href={"/online-vew-excel"}>Online Doctor View</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/platforms-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Online Doctor Excel Part"
                asChild
              >
                <Link href={"/platforms-excel"}>Platforms</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/plateform-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Online Doctor View Data"
                asChild
              >
                <Link href={"/plateform-vew"}>View Platforms</Link>
              </Button>
            </>
          ) : user.dipartment === "HD / OD" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/hdod-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part "
                asChild
              >
                <Link href={"/hdod-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/hdod-excel-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/hdod-excel-vew"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "ECART" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/ecart-execlel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part "
                asChild
              >
                <Link href={"/ecart-execlel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/vew-exel-data" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/vew-exel-data"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "DESIGNER" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/designer-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part "
                asChild
              >
                <Link href={"/designer-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/designer-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/designer-vew"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "MIXER" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/mixer-excel-data" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part "
                asChild
              >
                <Link href={"/mixer-excel-data"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/mixer-vew-data" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/mixer-vew-data"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "ACCOUNTANT" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/account-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part "
                asChild
              >
                <Link href={"/account-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/account-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/account-vew"}>View Excel Data</Link>
              </Button>
            </>
          ) : user.dipartment === "DIGITAL" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/digital-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/digital-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/digital-vewexceldeta" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/digital-vewexceldeta"}>View Excel Data</Link>
              </Button>
            </>
          ) :user.dipartment === "INVENTORY" ? (
            <>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/inventry-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="Excel Part"
                asChild
              >
                <Link href={"/inventry-excel"}>Excel Part</Link>
              </Button>
              <Button
                className={`flex items-center justify-start gap-3 ${pathname == "/inventry-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
                title="View Excel Data"
                asChild
              >
                <Link href={"/inventry-vew"}>View Excel Data</Link>
              </Button>
            </>
          ) : (
            ""
          )}

          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/setask" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="See Task"
            asChild
          >
            <Link href={"/setask"}>See Task</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/interview" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Interview"
            asChild
          >
            <Link href={"/interview"}>Interview</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/vew-documents" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Vew Document"
            asChild
          >
            <Link href={"/vew-documents"}>Vew Document</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/leavform" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Leave Application"
            asChild
          >
            <Link href={"/leavform"}>Leave Application</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/messages" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="messages"
            asChild
          >
            <Link href={"/messages"}>Chat</Link>
          </Button>
        </div>

        <Button
          className="flex cursor-pointer items-center justify-start gap-3 font-bold"
          title="Admin"
          asChild
          onClick={dropHandler}
        >
          <p>Admin</p>
        </Button>
        <div
          className={`space-y-5 rounded-md border p-3 shadow-lg ${dropdown ? "block" : "hidden"}`}
        >
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/addwork" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Add Task"
            asChild
          >
            <Link href={"/addwork"}>Add Task</Link>
          </Button>

          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/permission" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Give permission"
            asChild
          >
            <Link href={"/permission"}>Give permission</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/retinghistory" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Rating History"
            asChild
          >
            <Link href={"/retinghistory"}>Rating History</Link>
          </Button>

          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/manager-excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Manager"
            asChild
          >
            <Link href={"/manager-excel"}>Manager Excel</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/manager-vew" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Manager View Data"
            asChild
          >
            <Link href={"/manager-vew"}>Manager View Data</Link>
          </Button>
         
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/attendance-dashboard" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Attendance"
            asChild
          >
            <Link href={"/attendance-dashboard"}>Attendance</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
