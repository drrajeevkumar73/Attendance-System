import { Metadata } from "next";
import Ratework from "./Ratework";
export const metadata: Metadata = {
  title: "Give permission",
}
export default function Page() {
  return (
    <div className="flex flex-col items-center gap-7">
      <Ratework />
    </div>
  );
}
