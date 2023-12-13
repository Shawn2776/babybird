"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import mobileLogo from "../../public/logos/uTalkTo-logos_white.png";
import logo from "../../public/logos/uTalkTo-logos_black.png";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import DevModal from "../components/dev/DevModal";

const Login = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/Login"; // Change to your sign-in page
  };

  useEffect(() => {
    if (!sessionStorage.getItem("modalShown")) {
      setShowModal(true);
      sessionStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Optional: handle loading status
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/");
  }

  return (
    <>
      {showModal && <DevModal onClose={handleCloseModal} />}
      <main>
        <div className="flex flex-col w-full sm:flex-row">
          <div className="w-full">
            <Image
              className="sm:hidden"
              src={mobileLogo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />

            <Image
              className="hidden sm:flex"
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />
          </div>

          <div className="flex justify-center w-full sm:items-center">
            {session ? (
              <Link
                className="text-6xl"
                href={"/api/auth/signout/google?callbackUrl=/Home"}
              >
                <button onClick={handleSignOut}>Sign Out</button>
              </Link>
            ) : (
              <Link
                className="px-6 py-4 text-6xl text-white rounded-full shadow-xl bg-oxford"
                href={"/api/auth/signin/google?callbackUrl=/Login"}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
