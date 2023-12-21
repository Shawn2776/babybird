"use client";

import { useState } from "react";
import { GrImage } from "react-icons/gr";
import { TbPhotoVideo } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

export const TalkForm = (talkQuery) => {
  const [inText, setInText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

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
      text: inText,
      image: imageFileName,
      video: videoFileName,
    };

    try {
      const response = await fetch("/api/talks/", {
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
        talkQuery.talkQuery.refetch();
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
    <div className="flex w-full gap-2 pt-2 pb-2 mb-2 text-white bg-[rgb(24,25,26)] md:p-4 border-none">
      <form className="w-full">
        <Textarea
          variant="underlined"
          id="talk"
          label="What do you want to say?"
          labelPlacement="inside"
          value={inText}
          onChange={handleTextChange}
          className="dark text-white border-none outline-none focus:ring-0 focus:outline-none bg-[rgb(24,25,26)]"
        />

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
              <Tooltip content="Upload a Picture">
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
                        : "text-white"
                    }`}
                  />
                </button>
              </Tooltip>
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
              <Tooltip content="Upload a Video">
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
                        : "text-white"
                    }`}
                  />
                </button>
              </Tooltip>
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
};

export default TalkForm;
