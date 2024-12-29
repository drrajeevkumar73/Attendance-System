import { Metadata } from 'next'
import React from 'react'
import Attendce from './Attendce'
export const metadata: Metadata = {
    title: "Attendance | Dashboard",
  }
export default function Page() {
  return (
     <div className="flex flex-col items-center gap-7">
       <Attendce/>
       </div>
  )
}
