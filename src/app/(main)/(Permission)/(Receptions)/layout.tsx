
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  if (!session.user.permisionToggal) redirect("/");
  if (session.user.dipartment !== "RECEPTIONS") redirect("/");
  return (
   <>{children}</>
  );
}
