"use client";

import React from "react";
import FriendFeed from "./FriendFeed";

function Friends({ children }) {
  return (
    <div className="w-full">
      <FriendFeed />
    </div>
  );
}

export default Friends;
