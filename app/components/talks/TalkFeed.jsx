import { options } from "@/app/api/auth/[...nextauth]/options";
import Talk from "./Talk";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getTalks = async () => {
  try {
    const response = await fetch("/api/talks", {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log("ERROR>>", error);
    return NextResponse.json({ message: error });
  }
};

export default async function TalkFeed() {
  const { data: session, status } = getServerSession(options);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const talks = await getTalks();

  return (
    <>
      {talks.map((talk) => (
        <div key={talk.id} className="">
          <Talk
            owner={talk.owner}
            likes={talk.likes}
            dislikes={talk.dislikes}
            retalks={talk.retalkedBy}
            backtalks={talk.backTalks}
            likeCount={talk._count.likes}
            dislikeCount={talk._count.dislikes}
            retalkCount={talk._count.retalkedBy}
            backtalkCount={talk._count.backTalks}
          />
        </div>
      ))}
    </>
  );
}
