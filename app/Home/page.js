"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Nav from "../components/Nav/tempNav";
import TalkForm from "../components/talks/TalkForm";

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
      <div className="w-full max-w-2xl mx-auto">
        <TalkForm />
      </div>
    </>
  );
};

export default Home;
