"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import defaultProfilePic from "../../../public/defaultProfilePic.jpg";
import { useQuery } from "@tanstack/react-query";

const defaultImage = defaultProfilePic;

function ProfileImageHolder({ link }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user2"],
    queryFn: async () => {
      const response = await fetch("/api/user2/", {
        method: "GET",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return null;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data) {
    return <div>Hi</div>;
  }
}

export default ProfileImageHolder;
