import { Metadata } from "next";
import Addwork from "./Addwork";

export const metadata: Metadata = {
  title: "Add Task",
}
export default function Addwdork() {
  return (
    <div className=" w-full rounded-lg border shadow-2xl p-5">
      <Addwork />
    </div>
  );
}
