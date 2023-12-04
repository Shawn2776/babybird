import { getServerSession } from "next-auth";
import Nav from "../components/Nav/tempNav";
import TalkForm from "../components/talks/TalkForm";
import { options } from "../api/auth/[...nextauth]/options";
import TalkFeed2 from "../components/talks/TalkFeed2";

const { data: session, status } = getServerSession(options);

const Home = async () => {
  return (
    <>
      <Nav session={session} />
      <div className="w-full max-w-2xl mx-auto">
        <TalkForm session={session} />
        {/* <TalkFeed2 /> */}
      </div>
    </>
  );
};

export default Home;
