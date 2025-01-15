import CloseHambergarMenu from "@/components/CloseHambergarMenu";
import SerchField from "@/components/SerchField";
import UserButton from "@/components/UserButton";
import React from "react";

interface classNameProps {
  className?: string;
}
export default function Navbar({ className }: classNameProps) {
 
  
  return (
    <header className={className}>
     <span className="lg:hidden block">
     <CloseHambergarMenu/>
     
     </span>
     <SerchField className="mx-auto"/>
     <UserButton className="ms-auto"/>
    </header>
  );
}
