import { getServerSession } from "next-auth";
import Nav from "../components/Nav/tempNav";
import TalkForm from "../components/talks/TalkForm";
import { options } from "../api/auth/[...nextauth]/options";
import TalkFeed from "../components/talks/TalkFeed";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const { data: session, status } = getServerSession(options);

const Homes = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["talks"],
    queryFn: async () => {
      const response = await fetch("/api/talks", {
        method: "GET",
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    },
  });
  return (
    <>
      <Nav session={session} />
      <div className="w-full max-w-2xl mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TalkForm session={session} />
          <TalkFeed />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default Homes;
