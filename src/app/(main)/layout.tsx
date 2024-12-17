import StoreProvider from "./StoreProvider";
import SetionProvider from "./SetionProvider";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import Menubar from "./Menubar";
import Navbar from "./Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <StoreProvider>
      <SetionProvider value={session}>
        <div className="relative flex min-h-screen">
          <Menubar className="sticky top-0 hidden h-screen border-r w-80 overflow-auto bg-card shadow-2xl lg:block py-[2rem] px-2" />
          <Menubar className="fixed left-0 top-0 h-screen border-r w-80 overflow-auto bg-card pt-[6rem] z-[9] shadow-2xl px-2" />

          <div className="w-full">
            <Navbar className="shadow-xlW items-cente sticky border top-0 z-10 flex w-full bg-card px-5 py-3 " />

           <div className="p-5">
            {children}
           </div>
          </div>
        </div>
      </SetionProvider>
    </StoreProvider>
  );
}
