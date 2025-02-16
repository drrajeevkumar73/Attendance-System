"use client";
import Image from "next/image";
import logo from "@/assets/web_logo_2.png";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { formatRelativeleave } from "@/lib/utils";
import { SignatureComponent } from "@syncfusion/ej2-react-inputs";
import { Button } from "@/components/ui/button";

export default function Approve() {
  const { userid } = useParams();
  const [data, setdata] = useState<any>([]);
  console.log(data);
  useEffect(() => {
    const helo = async () => {
      const { data } = await axios.get(`/api/admin-ap/${userid}`);
      setdata(data[0]);
    };
    helo();
  }, [userid]);

  //approve

  const signObj = useRef<any | null>(null);

  const clersignature = () => {
    signObj.current?.clear();
  };
  return (
    <>
      <div className="mx-auto w-[80%] space-y-3 rounded-md border bg-lime-50 p-5 shadow-lg">
        <div className="flex w-full items-center font-bold italic text-blue-500">
          <h1 className="w-[30%]">#First Pathy Homeopathy </h1>
          <h1 className="w-full text-center">II OM SAI II </h1>
        </div>
        <div className="flex items-center justify-between">
          <Image src={logo} alt="" width={200} />
          <h5 className="w-full text-center text-4xl font-bold text-red-500">
            {" "}
            <span className="font-serif">ABHI HOMOEO HALL</span>
            <p className="text-center text-[19px] text-black">
              DELHI I RANCHI I PATNA{" "}
            </p>
          </h5>
        </div>
        <p className="text-center font-bold text-muted-foreground">
          ADD: ELIXIR TOWER, SETHIA COMPOUND, OPP, RANCHI CLUB, RANCHI-834001
          (JHARKHAND){" "}
        </p>
        <div className="flex h-[5px] w-full items-center">
          <div className="h-full w-1/3 bg-red-500"></div>
          <div className="h-full w-2/3 bg-blue-500"></div>
        </div>

        <div className="flex items-center justify-between font-bold">
          <h1>SL NO:-{data.srno} </h1>
          <h2 className="font-bold underline">LEAVE APPLICATION FORM </h2>
          <h5 className="flex items-center">
            APPROVED DATE :-{" "}
            <p className="boeds">
              <span className="">{formatRelativeleave(data?.updatedAt)}</span>
            </p>{" "}
          </h5>
        </div>

        <div className="space-y-8">
          <h6>
            <span className="font-bold">Subject: -</span>{" "}
            <span>{data.subject}</span>
          </h6>
          <div className="flex items-center gap-5">
            <span className="font-bold">I </span>
            <span className="boeds w-[40%] text-center">{data.name1}</span>
            <p className="text-center font-bold">
              {" "}
              writing this letter to request you for sanctioning leave on date{" "}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <p className="boeds">{data.from}</p>
            <span className="font-bold">to </span>
            <p className="boeds">{data.to}</p>
            <span className="font-bold">due to</span>
            <p className="boeds w-[50%] break-words text-justify">
              {data.deueto}
            </p>
            <span className="font-bold">I am confirming </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-bold">that I will join back on to </span>
            <p className="boeds"> {data.comforming}</p>
          </div>
        </div>

        <div className="flex h-[5px] w-full items-center">
          <div className="h-full w-1/3 bg-red-500"></div>
          <div className="h-full w-2/3 bg-blue-500"></div>
        </div>

        <div className="flex w-full items-center font-bold italic">
          <h1 className="w-[30%] underline">Thanking you </h1>
          <h1 className="w-full text-center underline">Approved by </h1>
        </div>

        <div className="space-y-16">
          <div className="flex items-center justify-between font-bold">
            <h1 className="boeds">
              <Image src={data.name2} alt="zd " width={100} height={100} />
            </h1>

            <h5 className="flex items-center">
              Dept. sing{" "}
              <p className="boeds">
                <span className="opacity-0">2023-02-20</span>
              </p>{" "}
            </h5>
            <h5 className="flex items-center">
              Dr. Rajeev sir{" "}
              <p className="boeds">
                <span className="opacity-0">2023-02-20</span>
              </p>{" "}
            </h5>
          </div>

          <div className="flex items-center gap-28 font-bold">
            <h5 className="flex items-center">
              Date{" "}
              <p className="boeds">
                <span className="">{formatRelativeleave(data?.createdAt)}</span>
              </p>{" "}
            </h5>
            <h5 className="flex items-center">
              HR sing.{" "}
              <p className="boeds">
                <span className="opacity-0">2023-02-20</span>
              </p>{" "}
            </h5>
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-black/80">
      
          <h1 className="boeds space-y-5 text-white">
            <SignatureComponent
              ref={signObj}
              className="h-[100px] w-[200px] rounded-md border bg-gray-200 shadow-lg"
            ></SignatureComponent>
            <Button onClick={clersignature} type="button" className="w-full">
              Clear
            </Button>
            <p className="text-white text-center"> Dept Sign</p>
          </h1>

          <h1 className="boeds space-y-5 text-white">
            <SignatureComponent
              ref={signObj}
              className="h-[100px] w-[200px] rounded-md border bg-gray-200 shadow-lg"
            ></SignatureComponent>
            <Button onClick={clersignature} type="button" className="w-full">
              Clear
            </Button>
            <p className="text-white text-center"> Dept Sign</p>
          </h1>
          <h1 className="boeds space-y-5 text-white">
            <SignatureComponent
              ref={signObj}
              className="h-[100px] w-[200px] rounded-md border bg-gray-200 shadow-lg"
            ></SignatureComponent>
            <Button onClick={clersignature} type="button" className="w-full">
              Clear
            </Button>
            <p className="text-white text-center"> Dept Sign</p>
          </h1>
          <h1 className="boeds space-y-5 text-white">
            <SignatureComponent
              ref={signObj}
              className="h-[100px] w-[200px] rounded-md border bg-gray-200 shadow-lg"
            ></SignatureComponent>
            <Button onClick={clersignature} type="button" className="w-full">
              Clear
            </Button>
            <p className="text-white text-center"> Dept Sign</p>
          </h1>
         
        </div>
     
    </>
  );
}
