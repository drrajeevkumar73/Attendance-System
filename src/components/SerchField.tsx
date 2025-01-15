"use client";
import axios from "axios";

import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface classNameProps {
  className?: string;
}
export default function SerchField({ className }: classNameProps) {
  const router = useRouter();
  const [drop, setDrop] = useState(false);
  const [dataa, setData] = useState([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: any) => {
    const q = e.value.trim();
    if (!q) return;
    const { data } = await axios.get(
      `/api/autoserch?key=${encodeURIComponent(q)}`
    );
    setData(data.data);
    setDrop(true); // Show the dropdown
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDrop(false); // Hide the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className={className}>
      <div
        className="relative mx-auto w-full"
        onChange={(event: any) => handleSubmit(event.target)}
      >
        <Input name="q" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />

        {drop && dataa?.length > 0 ? (
          <div
            ref={dropdownRef}
            className="absolute left-[50%] bg-white top-[67px] w-[500px] h-[400px] overflow-auto translate-x-[-50%] rounded-md border p-5 shadow-2xl"
          >
            {dataa.map((item: any, index: number) => (
              <div
              key={index}
              className="rounded-md font-bold hover:bg-gray-200 p-[8px] cursor-pointer"
            >
              <Link
                href={`/perofile/${item.id}`}
                onClick={() => setDrop(false)} // Move setDrop here inside the Link component
              >
                <p className="relative">
                  <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
                  {item.displayname}{" "}
                  <span className="text-muted-foreground">
                    ({item.dipartment})
                  </span>
                </p>
              </Link>
            </div>
            
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
}
