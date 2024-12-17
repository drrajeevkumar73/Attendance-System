import React from 'react'
import RetingHistory from './RetingHistory'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Rating History",
}
export default function page() {
  return (
    <div className="flex flex-col items-center gap-7">
    <RetingHistory/>
    </div>
  )
}
