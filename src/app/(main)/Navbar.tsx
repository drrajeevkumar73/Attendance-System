import CloseHambergarMenu from "@/components/CloseHambergarMenu";
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
     <UserButton className="ms-auto"/>
    </header>
  );
}
