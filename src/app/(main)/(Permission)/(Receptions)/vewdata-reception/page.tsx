import { Metadata } from "next";
import Vewdata from "./Vewdata";

export const metadata: Metadata = {
  title: "View Excel",
};

export default function Page() {
  return (
     <div className="flex flex-col items-center gap-7 2xl:w-[1100px] lg:w-[800px] overflow-auto mx-auto">
          <Vewdata />
        </div>
  )
}
