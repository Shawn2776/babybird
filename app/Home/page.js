"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Nav from "../components/Nav/tempNav";

const Home = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Home");
    },
  });

  return (
    <>
      <Nav session={session} />
      <div>
        <h1>Home Client Session</h1>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.name}</p>
      </div>
    </>
  );
};

export default Home;
