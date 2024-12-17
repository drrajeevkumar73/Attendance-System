import { Metadata } from "next";
import Image from "next/image";
import LoginImage from "@/assets/login-image.jpg";
import Link from "next/link";
import LoginForm from "./LoginForm";


export const metadata: Metadata = {
  title: "Log In",
};

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login to attendance</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can do
              attendance
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link
              href={"/signup"}
              className="block text-center hover:underline"
            >
             Create a new account.
            </Link>
          </div>
        </div>
        <Image
          src={LoginImage}
          alt="login are not fond"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
