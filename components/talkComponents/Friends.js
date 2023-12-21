"use client";

import React from "react";
import FriendFeed from "./FriendFeed";

function Friends({ children }) {
  return (
    <div className="w-full pr-2 mx-1">
      <FriendFeed />
    </div>
  );
}

export default Friends;
