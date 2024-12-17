"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
  } from "./ui/dropdown-menu";
  import Link from "next/link";
  import { Check, Diameter, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { useAppSelector } from "@/lib/hooks";

  import { useTheme } from "next-themes";
import UserAvatar from "./UserAvatar";
import { logout } from "@/app/(auth)/actions";

  

interface clasnameProps {
  className?: string;
}
export default function UserButton({ className }: clasnameProps) {
    const { theme, setTheme } = useTheme();
    const {user}=useAppSelector((state)=>state.loginlice)
    if(!user){
      throw new Error("Unauthorise")
    }
  return (
    <div className={className}>
       <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
           <UserAvatar avatarUrl={user.avatarUrl} size={48}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as {user.displayname}</DropdownMenuLabel>
        <DropdownMenuSeparator />
       
          
          <DropdownMenuItem>
            <Diameter className="mr-2 size-4" />
            Department as {user.dipartment}
          </DropdownMenuItem>
     
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Them
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
         onClick={() => {
          logout();
        }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
