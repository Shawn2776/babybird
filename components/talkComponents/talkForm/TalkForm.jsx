"use client";

import { useState } from "react";
import { GrImage } from "react-icons/gr";
import { TbPhotoVideo } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Button, Image, Spinner, Textarea } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import handleImageUpload from "@/utils/misc/compressImage";

export const TalkForm = (talkQuery) => {
  const [inText, setInText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const router = useRouter();

  const handleTextChange = (e) => {
    setInText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setVideo(null);
    setVideoPreview(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
    setImage(null);
    setPreview(null);

    const reader = new FileReader();
    reader.onload = () => {
      setVideoPreview(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setInText("");
    setImage(null);
    setVideo(null);
    setPreview(null);
    setVideoPreview(null);
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

          // compress image
          const compImage = await handleImageUpload(image, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
          });

          // post image directly to s3 bucket
          await fetch(uploadURL, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: compImage || image,
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
    <div className="flex flex-col w-full mt-0 text-white bg-[#222] md:p-4 border-none">
      <form className="w-full mt-0 md:border md:border-black md:bg-black md:shadow-md md:shadow-black md:py-2 md:px-1 md:rounded-lg">
        <Textarea
          variant="underlined"
          id="talk"
          aria-label="What do you want to say?"
          placeholder="What do you want to say?"
          value={inText}
          onChange={handleTextChange}
          className="dark text-white border-none outline-none focus:ring-0 focus:outline-none bg-[#222] md:bg-black md:rounded-lg "
        />

        <div className="flex items-center justify-between pt-4 pb-2 pl-4 pr-4">
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
          {!inText && !image && !video ? (
            <Button disabled>Talk</Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="submit"
                onClick={handleSubmit}
                className={
                  "p-1 px-6 font-extrabold text-white bg-zomp  rounded-2xl hover:bg-bittersweet"
                }
              >
                {uploading ? <Spinner /> : "Talk"}
              </Button>
              <Button variant="light" onClick={handleClear}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      </form>
      {videoPreview || preview ? (
        <div className="flex justify-center w-40 px-2 py-1 mx-auto mt-2 bg-black rounded-md shadow-md shadow-black">
          {preview && (
            <Image
              src={preview}
              width={120}
              className="flex justify-center w-full mx-auto rounded-lg"
              alt="uploaded image"
            />
          )}
          {videoPreview && (
            <video
              className="px-2 py-1 rounded-lg"
              width="320"
              height="240"
              controls
            >
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TalkForm;
