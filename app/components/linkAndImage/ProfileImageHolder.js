import Image from "next/image";
import Link from "next/link";
import React from "react";

import defaultProfilePic from "../../../public/defaultProfilePic.jpg";

const defaultImage = "/defaultProfilePic.jpg";

function ProfileImageHolder({ link, image }) {
  return (
    <>
      <Link href={link}>
        {image ? (
          <Image
            src={image}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Image
            src={`${defaultImage}`}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </Link>
    </>
  );
}

export default ProfileImageHolder;
