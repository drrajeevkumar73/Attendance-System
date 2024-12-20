import React from 'react'
import ExcelData from './ExcelData'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Excel",
};
export default function Page() {
  return (
     <div className="rounded-2xl border bg-card p-10 shadow-xl">
          <ExcelData />
        </div>
  )
}
