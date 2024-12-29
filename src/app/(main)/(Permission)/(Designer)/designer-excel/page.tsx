import { Metadata } from 'next'
import React from 'react'
import Exceldata from './Exceldata'
export const metadata: Metadata = {
  title: "Excel",
}
export default function Page() {
  return (
    < >
                   <Exceldata />
                 </>
  )
}
