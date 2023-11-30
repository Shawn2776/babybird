import mobileLogo from "../public/logos/uTalkTo-logos_white.png";
import logo from "../public/logos/uTalkTo-logos_black.png";
import Image from "next/image";
import Link from "next/link";

const Login = async () => {
  const user = null;
  return (
    <>
      <main className="flex flex-col w-full h-screen md:flex-row md:justify-evenly">
        <div className="flex items-center justify-center w-full h-screen sm:hidden">
          <Image
            src={mobileLogo}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            alt="photo"
          />
        </div>
        <div className="items-center justify-center hidden w-full h-screen sm:flex">
          <Image
            src={logo}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            alt="photo"
          />
        </div>
        <div className="flex items-start justify-center w-full h-screen sm:items-center">
          {user ? (
            <Link
              className="text-6xl"
              href={"/api/auth/signout/google?callbackUrl=/Home"}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              className="text-6xl"
              href={"/api/auth/signin/google?callbackUrl=/Home"}
            >
              Sign In
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
