import React from "react";
import Seetask from "./Seetask";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "See Task",
};

export default function Setask() {
  return (
    <div className="flex flex-col items-center gap-7">
      <Seetask />
    </div>
  );
}


