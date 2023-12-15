"use client";

import { useEffect, useRef, useState } from "react";
import { GrImage } from "react-icons/gr";
import { TbPhotoVideo } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import defaultProfilePic from "../../../public/defaultProfilePic.jpg";

function TalkForm() {
  const { data: session, status } = useSession();

  const newPic = defaultProfilePic;

  const textAreaRef = useRef(null);
  const [inText, setInText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const user2Query = useQuery({
    queryKey: ["user2"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user2/", {
          method: "GET",
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          return data;
        } else {
          return "error fetching user";
        }
      } catch (error) {
        return error;
      }
    },
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [inText]);

  if (status === "loading") {
    return (
      <div role="status" className="animate-pulse">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 ml-1 mr-1 px-5 max-w-[640px] mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
        <div className="flex items-center justify-center mt-4">
          <svg
            className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.replace("/Login");
  }

  if (user2Query?.isLoading) {
    return (
      <div role="status" className="animate-pulse">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 ml-1 mr-1 px-5 max-w-[640px] mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
        <div className="flex items-center justify-center mt-4">
          <svg
            className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (status === "authenticated") {
    const email = session?.user?.email;

    const srcProfilePic =
      user2Query?.data?.profilePic === null
        ? newPic
        : user2Query.data.profilePic;

    const handleTextChange = (e) => {
      setInText(e.target.value);
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
      setVideo(null);
    };

    const handleVideoChange = (e) => {
      setVideo(e.target.files[0]);
      setImage(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      setUploading(true);

      if (!inText && !image && !video) {
        alert("Please enter some text or upload an image or video.");
        setUploading(false);
        return;
      }

      let imageFileName = "";
      if (image) {
        try {
          // get secure url from our server
          const response = await fetch(
            `/api/s3?fileName=${image.name}&fileType=${image.type}`
          );

          if (response.ok) {
            const { uploadURL } = await response.json();

            // post image directly to s3 bucket
            await fetch(uploadURL, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: image,
            });

            const imageUrl = uploadURL.split("?")[0];
            const nameSplit = imageUrl.split("/");
            imageFileName = nameSplit[nameSplit.length - 1];
          } else {
            console.log("Error: in talk form ", error);
            setUploading(false);
            setInText("");
            setImage(null);
            setVideo(null);
            router.push("/");
          }
        } catch (error) {
          alert("Unable to upload Talk. Please try again later.");
          console.log("error in talkform", error);
          setUploading(false);
          setInText("");
          setImage(null);
          setVideo(null);
          router.push("/");
        }
      }

      let videoFileName = "";
      if (video) {
        try {
          // get secure url from our server
          const response = await fetch(
            `/api/s3?fileName=${video.name}&fileType=${video.type}`
          );

          if (response.ok) {
            const { uploadURL } = await response.json();

            // post image directly to s3 bucket
            await fetch(uploadURL, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: video,
            });

            const videoUrl = uploadURL.split("?")[0];
            const nameSplit = videoUrl.split("/");
            videoFileName = nameSplit[nameSplit.length - 1];
          } else {
            console.log("Error: in talk form", error);
            setUploading(false);
            setInText("");
            setImage(null);
            setVideo(null);
            router.push("/");
          }
        } catch (error) {
          alert("Unable to upload Talk. Please try again later.");
          console.log("error in talk form", error);
          setUploading(false);
          setInText("");
          setImage(null);
          setVideo(null);
          router.push("/");
        }
      }

      const talk = {
        email,
        text: inText,
        image: imageFileName,
        video: videoFileName,
      };

      try {
        const response = await fetch("/api/talks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(talk),
        });

        if (response.ok) {
          setUploading(false);
          setInText("");
          setImage(null);
          setVideo(null);
          router.refresh();
          router.push("/");
        } else {
          console.log("Error: in talk form", error);
          setUploading(false);
          setInText("");
          setImage(null);
          setVideo(null);
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        alert("Unable to upload Talk. Please try again later.");
        console.log(error);
        setUploading(false);
        setInText("");
        setImage(null);
        setVideo(null);
        router.refresh();
        router.push("/");
      }
    };

    function triggerImageInput(e) {
      document.getElementById("imageToUpload").click();
    }

    function triggerVideoInput(e) {
      document.getElementById("videoToUpload").click();
    }

    return (
      <div className="flex w-full gap-2 pt-2 pb-2 mb-2 text-white bg-gray-600 border border-gray-600 md:p-4 border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-6 md:rounded-lg">
        <form className="w-full">
          <div className="flex w-full gap-2">
            <div className="flex items-center justify-center">
              <Link
                href={`/talker/${user2Query?.data?.username}?username=${user2Query?.data?.username}`}
                className="ml-2"
              >
                <Image
                  src={srcProfilePic}
                  height={40}
                  width={40}
                  alt=""
                  className="bg-black rounded-full shadow-lg hover:border"
                />
              </Link>
            </div>
            <label htmlFor="talk" className="sr-only">
              What do you want to say?
            </label>
            <textarea
              id="talk"
              className="w-[96%] pl-4 ml-2 mx-auto p-1 rounded-2xl bg-neutral-800 active:outline-none focus:outline-none mr-4"
              placeholder="What do you want to say?"
              value={inText}
              onChange={handleTextChange}
              rows="1"
              ref={textAreaRef}
              type="text"
            ></textarea>
          </div>
          <div className="flex items-center justify-between pt-4 pl-12 pr-4">
            <div className="flex gap-4">
              <label htmlFor="imageToUpload">
                <input
                  onChange={handleImageChange}
                  type="file"
                  name="imageToUpload"
                  id="imageToUpload"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                />
                <button
                  type="button"
                  onClick={triggerImageInput}
                  className={`${
                    image !== null ? "bg-oxford p-1 px-2 rounded-md" : "p-1"
                  }`}
                >
                  <GrImage
                    className={`text-xl hover:text-bittersweet ${
                      image !== null
                        ? "text-bittersweet hover:text-white"
                        : "text-neutral-900"
                    }`}
                  />
                </button>
              </label>
              <label htmlFor="videoToUpload">
                <input
                  onChange={handleVideoChange}
                  type="file"
                  name="videoToUpload"
                  id="videoToUpload"
                  className="hidden"
                  accept="video/mp4, video/avi, video/mov"
                />
                <button
                  type="button"
                  onClick={triggerVideoInput}
                  className={`${
                    video !== null ? "bg-oxford p-1 px-2 rounded-md" : "p-1"
                  } flex flex-col`}
                >
                  <TbPhotoVideo
                    className={`text-xl hover:text-bittersweet ${
                      video !== null
                        ? "text-bittersweet hover:text-white"
                        : "text-neutral-900"
                    }`}
                  />
                </button>
              </label>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={
                "p-1 px-6 font-extrabold text-white bg-zomp  rounded-2xl hover:bg-bittersweet"
              }
            >
              {uploading ? "talking..." : "Talk"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TalkForm;
