import React from 'react'
import Vewdata from './Vewdata'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "View Excel",
};
export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center gap-16'>
    <Vewdata/>
    </div>
  )
}
