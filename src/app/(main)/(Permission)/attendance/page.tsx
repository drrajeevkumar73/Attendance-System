import { Metadata } from "next";
import DailyWork from "./DailyWork";

export const metadata: Metadata = {
  title: "Attendance",
};

export default function Attendance() {
  return (
    <div className="rounded-2xl border bg-card p-10 shadow-xl">
      <DailyWork />
    </div>
  );
}
