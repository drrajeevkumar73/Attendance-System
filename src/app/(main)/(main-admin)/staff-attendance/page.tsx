
import { Metadata } from 'next'
import Atendace from './Atendace'
export const metadata: Metadata = {
  title: "Staff Attendance",
}
export default function Page() {
  return (
      <div className="flex flex-col items-center gap-7">
          <Atendace />
        </div>
  )
}
