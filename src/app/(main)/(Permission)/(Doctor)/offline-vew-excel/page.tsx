import { Metadata } from "next";
import Vewdata from "./Vewdata";


export const metadata: Metadata = {
  title: "View Excel",
};

export default function Page() {
  return (
     <div className="flex flex-col items-center gap-7  mx-auto">
          <Vewdata />
        </div>
  )
}
