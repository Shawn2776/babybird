"use client";

import Talk from "./Talk";
import { useQuery } from "@tanstack/react-query";

function TalkFeed() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["talks"],
    queryFn: async () => {
      const response = await fetch("/api/talks/", {
        method: "GET",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
  });

  if (error) {
    return <div>Error Fetching Talks</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (data) {
    return (
      <div>
        {data.map((talk) => (
          <Talk
            key={talk.id}
            talk={talk}
            owner={talk.owner}
            likes={talk.likes}
            dislikes={talk.dislikes}
          />
        ))}
      </div>
    );
  }

  // useEffect(() => {
  //   async function fetchTalks() {
  //     const response = await fetch("/api/talks", {
  //       method: "GET",
  //       cache: "no-store",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setTalks(data);
  //     }
  //   }

  //   fetchTalks();
  // }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
    // <div>
    //   {map((talk) => (
    //     <Talk key={talk.id} talk={talk} owner={talk.owner} />
    //   ))}
    // </div>
  );
}

export default TalkFeed;
