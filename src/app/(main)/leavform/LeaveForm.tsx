"use client";
import Image from "next/image";
import logo from "@/assets/web_logo_2.png";
import { leavformSchema, LeavFromValue } from "@/lib/vallidation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Signature from "@uiw/react-signature";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import LodingButton from "@/components/LodingButton";

import { SignatureComponent } from "@syncfusion/ej2-react-inputs";
import axios from "axios";
export default function LeaveForm() {
  const { toast } = useToast();

  const form = useForm<LeavFromValue>({
    resolver: zodResolver(leavformSchema),
    defaultValues: {
      name1: "",
      subject: "",
      from: "",
      to: "",
      deueto: "",
      comforming: "",
    },
  });
  const [ispending, setIsPending] = useState(false);

  const signObj = useRef<any | null>(null);

  const clersignature = () => {
    signObj.current?.clear();
  };
  const submithandler = async (value: LeavFromValue) => {
    try {
      if (!signObj.current.signatureValue) {
        toast({
          variant: "destructive",
          description: "Please upload your Signature.",
        });
      }
      setIsPending(true);

      await axios.post("/api/leav-from", {
        name1: value.name1,
        subject: value.subject,
        from: value.from,
        to: value.to,
        deueto: value.deueto,
        comforming: value.comforming,
        signaute: signObj.current.signatureValue,
      });
      form.reset()

      toast({
        variant: "default",
        description: "Your application sent to admin.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Interval server error.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto w-[80%] space-y-3 rounded-md border bg-lime-50 p-5 shadow-lg">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(submithandler)}>
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
            <h1>SL NO:-39 </h1>
            <h2 className="font-bold underline">LEAVE APPLICATION FORM </h2>
            <h5 className="flex items-center">
              DATE :-{" "}
              <p className="boeds">
                <span className="opacity-0">2023-02-20</span>
              </p>{" "}
            </h5>
          </div>

          <div className="space-y-8">
            <h6 className="flex items-center">
              <span className="font-bold">Subject: -</span>{" "}
              <span>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Subject" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>
            </h6>
            <div className="flex items-center gap-5">
              <span className="font-bold">I </span>
              <span className="boeds w-[40%] text-center">
                <FormField
                  control={form.control}
                  name="name1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>
              <p className="text-center font-bold">
                {" "}
                writing this letter to request you for sanctioning leave on date{" "}
              </p>
            </div>

            <div className="flex items-center gap-5">
              <p className="boeds">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="01-03-2025" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </p>
              <span className="font-bold">to </span>
              <p className="boeds">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="10-03-2025" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </p>
              <span className="font-bold">due to</span>
              <p className="boeds w-[50%] break-words text-justify">
                <FormField
                  control={form.control}
                  name="deueto"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </p>
              <span className="font-bold">I am confirming </span>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">that I will join back on to </span>
              <p className="boeds">
                <FormField
                  control={form.control}
                  name="comforming"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="11-03-2025" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </p>
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
              <h1 className="boeds space-y-5">
                <SignatureComponent
                  ref={signObj}
                  className="h-[100px] w-[200px] rounded-md border bg-gray-200 shadow-lg"
                ></SignatureComponent>
                <Button onClick={clersignature} type="button">
                  Clear
                </Button>
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
                  <span className="opacity-0">2023-02-20</span>
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
          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>
    </div>
  );
}
