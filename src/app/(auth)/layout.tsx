import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import StoreProvider from "../(main)/StoreProvider";


export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <StoreProvider>{children}</StoreProvider>;
}