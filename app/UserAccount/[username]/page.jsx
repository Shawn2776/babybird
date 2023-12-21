"use client";

import ProfileCard from "@/components/talkComponents/ProfileCard";
import AccountCard from "@/components/talkComponents/accountTalks/AccountCard";
import Talk from "@/components/talkComponents/accountTalks/TalkCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const url = process.env.MAIN_URL;

export default function Page({ params }) {
  return (
    <>
      <AccountCard />
      {/* <Talk /> */}
    </>
  );
}

