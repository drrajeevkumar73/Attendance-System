import { Metadata } from 'next'
import React from 'react'
import RevenuTracker from './RevenuTracker'
export const metadata: Metadata = {
  title: "Revenue Tracker",
}
export default function Page() {
  return (
    < >
                   <RevenuTracker />
                 </>
  )
}
