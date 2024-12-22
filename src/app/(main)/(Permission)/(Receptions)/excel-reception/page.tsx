import { Metadata } from 'next';
import ExelRecetion from './ExelRecetion';
export const metadata: Metadata = {
  title: "Excel",
};
export default function Page() {
  return (
     <div className="rounded-2xl border bg-card p-10 2xl:w-[1100px] lg:w-[800px] shadow-xl overflow-auto mx-auto" >
              <ExelRecetion />
            </div>
      )
  
}
