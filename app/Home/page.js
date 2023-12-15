import { getServerSession } from "next-auth";
import NavMenu from "../components/nav/NavMenu";
import TalkForm from "../components/talks/TalkForm";
import { options } from "../api/auth/[...nextauth]/options";
import TalkFeed from "../components/talks/TalkFeed";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Homes = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Home");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["talks"],
    queryFn: getAllTalks(),
  });

  const userQueryClient = new QueryClient();
  await userQueryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser(),
  });

  return (
    <>
      <NavMenu />
      <div className="w-full max-w-2xl mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TalkForm />
          <TalkFeed />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default Homes;
