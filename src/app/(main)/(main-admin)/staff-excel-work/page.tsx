import { Metadata } from "next"
import SatffExelAdmin from "./SatffExelAdmin"

export const metadata: Metadata = {
    title: "Staff Excel",
  }

export default function Page() {
  return (
     <div className="flex flex-col items-center gap-7">
             <SatffExelAdmin />
           </div>
  )
}
