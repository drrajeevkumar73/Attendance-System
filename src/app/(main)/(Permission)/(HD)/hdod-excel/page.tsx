import { Metadata } from "next";
import React from "react";
import Hdexcel from "./Hdexcel";

export const metadata: Metadata = {
  title: "Excel",
};

export default function Page() {
  return (
    <div className="mx-auto overflow-auto rounded-2xl border bg-card p-10 shadow-xl lg:w-[800px] 2xl:w-[1100px]">
      <Hdexcel />
    </div>
  );
}
