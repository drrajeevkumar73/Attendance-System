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
import { useState } from "react";
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
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/excel" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Excel Part"
            asChild
          >
            <Link href={"/excel"}>Excel Part</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/vewexceldeta" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Veiw Excel Data"
            asChild
          >
            <Link href={"/vewexceldeta"}>Veiw Excel Data</Link>
          </Button>
          <Button
            className={`flex items-center justify-start gap-3 ${pathname == "/setask" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="See Task"
            asChild
          >
            <Link href={"/setask"}>See Task</Link>
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
            className={`flex items-center justify-start gap-3 ${pathname == "/admin" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Today Work History"
            asChild
          >
            <Link href={"/admin"}>Today Work History</Link>
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
            className={`flex items-center justify-start gap-3 ${pathname == "/staff-attendance" ? "bg-yellow-400 text-black hover:bg-yellow-200" : ""}`}
            title="Staff Attendance"
            asChild
          >
            <Link href={"/staff-attendance"}>Staff Attendance</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
