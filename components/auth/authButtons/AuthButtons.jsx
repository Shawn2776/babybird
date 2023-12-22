"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import appleLogo from "@/public/apple.png";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-6 mt-4 text-xl font-semibold text-black transition-colors duration-300 bg-white rounded-lg shadow-md shadow-black h-14 focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Sign in with Google</span>
    </button>
  );
}

export function AppleSignInButton() {
  const handleClick = () => {
    signIn("apple");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-6 mt-4 text-xl font-semibold text-black transition-colors duration-300 bg-white rounded-lg shadow-md shadow-black h-14 focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={appleLogo} alt="Apple Logo" width={20} height={20} />
      <span className="ml-4">Sign in with Apple</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-6 mt-4 text-xl font-semibold text-black transition-colors duration-300 bg-white border-2 border-black rounded-lg h-14 focus:shadow-outline hover:bg-slate-200"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className="ml-4">Sign in with Email</span>
    </button>
  );
}
