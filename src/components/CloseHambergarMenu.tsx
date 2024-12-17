"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hambegarMenuHandler } from "@/Redux-toolkit/hambegarMenu";
import { Menu, X } from "lucide-react";
import React from "react";

export default function CloseHambergarMenu() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.hmenuSlice);

  return (
    <>
      {value ? (
        <X
          size={30}
          className="cursor-pointer text-foreground"
          onClick={() => dispatch(hambegarMenuHandler())}
        />
      ) : (
        <Menu
          size={30}
          className="cursor-pointer text-foreground"
          onClick={() => dispatch(hambegarMenuHandler())}
        />
      )}
    </>
  );
}
