"use client";

import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      //Redirect to homepage (/timeline)
      router.push("/Home");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <form
      className="flex flex-col w-full mt-8 text-xl font-semibold text-black"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="dark"
        variant="underlined"
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="dark"
        variant="underlined"
      />

      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-300 rounded-lg shadow-md bg-bittersweet focus:shadow-outline hover:bg-oxford shadow-black"
      >
        Log in
      </button>
    </form>
  );
}
