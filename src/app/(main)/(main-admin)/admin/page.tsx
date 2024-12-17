import AminCheckdata from "@/components/AminCheckdata/AminCheckdata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Admin() {
  return (
    <div className="flex flex-col items-center gap-7">
      <AminCheckdata />
    </div>
  );
}
