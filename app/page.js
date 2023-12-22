import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import mobileLogo from "../public/logos/uTalkTo-logos_white.png";
import {
  AppleSignInButton,
  GoogleSignInButton,
  CredentialsSignInButton,
} from "@/components/auth/authButtons/AuthButtons";
import logo from "../public/logos/uTalkTo-logos_black.png";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { useStorage, setStorage } from "@/utils/misc/useStorage";
import DevelopmentModal2 from "@/components/dev/DevModal2";
import { CredentialsForm } from "@/components/auth/authButtons/credentialsForm/CredentialsForm";

export default async function Home() {
  const session = await getServerSession(options);

  const getItem = useStorage("modalShown");

  if (!getItem) {
    setStorage("modalShown", true);
  }

  if (session) return redirect("/Default");

  return (
    <>
      <main>
        <div className="flex flex-col w-full sm:flex-row">
          <div className="w-full">
            <Image
              className="sm:hidden"
              src={mobileLogo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />

            <Image
              className="hidden sm:flex"
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center p-10 mt-10 divide-y rounded-lg shadow-md bg-neutral-700 shadow-black divide-solid">
              <h1 className="mb-4 text-4xl font-bold text-white">Sign In</h1>
              <GoogleSignInButton />
              <AppleSignInButton />
              <span className="text-2xl font-semibold text-center text-white">
                <hr className="text-white" />
              </span>
              {/* <CredentialsSignInButton /> */}
              <CredentialsForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
