"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";

export const LogoutButton = () => {
  // return <button onClick={() => signOut()}>Logout</button>;
  return (
    <Link href="/api/auth/signout?callbackUrl=/">
      <button>Logout</button>
    </Link>
  );
};

export const LoginButton = () => {
  return (
    <Link href="/api/auth/signin?callbackUrl=/Home">
      <button>Login</button>
    </Link>
  );
  return <button onClick={() => signIn()}>Login</button>;
};
