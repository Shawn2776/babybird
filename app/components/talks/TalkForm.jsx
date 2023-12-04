"use client";

import { useEffect, useRef, useState } from "react";
import { GrImage } from "react-icons/gr";
import { TbPhotoVideo } from "react-icons/tb";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

function TalkForm() {
  const textAreaRef = useRef(null);
  const [inText, setInText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const { data: session, status } = useSession();
  const email = session?.user?.email;

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
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
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

    let imageFileName = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("isImage", true);

      try {
        const response = await fetch("https://www.utalkto.com/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        imageFileName = await response.json();
      } catch (error) {
        setUploading(false);
        console.log("Error in image try/catch: ", error);
        return NextResponse.json({ error });
      }
    }

    let videoFileName = "";
    if (video) {
      const formData = new FormData();
      formData.append("file", video);
      formData.append("isImage", false);

      try {
        const response = await fetch("https://www.utalkto.com/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        videoFileName = await response.json();
      } catch (error) {
        setUploading(false);
        console.log("Error in video try/catch: ", error);
        return NextResponse.json({ error });
      }
    }

    try {
      const res = await fetch("https://www.utalkto.com/api/talks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          text: inText,
          image: imageFileName,
          video: videoFileName,
        }),
      });

      if (res.ok) {
        const returnObj = await res.json();

        setUploading(false);
        setInText("");
        setImage(null);
        setVideo(null);
        router.push("/Home");
      }
    } catch (error) {
      alert("Unable to upload Talk. Please try again later.");
      console.log(error);
      setUploading(false);
      setInText("");
      setImage(null);
      setVideo(null);
      router.push("/Home");
    }
  };

  function triggerImageInput(e) {
    document.getElementById("imageToUpload").click();
  }

  function triggerVideoInput(e) {
    document.getElementById("videoToUpload").click();
  }

  return (
    <div className="w-full pt-2 pb-2 mb-2 text-white bg-gray-600 border border-gray-600 md:p-4 border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-6 md:rounded-lg">
      <form>
        <label htmlFor="talk" className="sr-only">
          What do you want to say?
        </label>
        <textarea
          id="talk"
          className="w-[96%] pl-4 ml-2 mx-auto p-1 rounded-2xl bg-neutral-800 active:outline-none focus:outline-none"
          placeholder="What do you want to say?"
          value={inText}
          onChange={handleTextChange}
          rows="1"
          ref={textAreaRef}
          type="text"
        ></textarea>
        <div className="flex items-center justify-between pt-4 pl-4 pr-4">
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
              <button type="button" onClick={triggerImageInput}>
                <GrImage className="text-xl text-zomp" />
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
              <button type="button" onClick={triggerVideoInput}>
                <TbPhotoVideo className="text-xl text-zomp" />
              </button>
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={
              "p-1 px-6 font-extrabold text-white bg-zomp  rounded-2xl"
            }
          >
            {uploading ? "talking..." : "Talk"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TalkForm;
